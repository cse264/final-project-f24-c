//OUR ENTIRE FOUNDATION OF THIS GAME, https://www.reddit.com/${subreddit}/random/.json, WAS DEPRECATED AS OF 12/6/2024 
//https://www.reddit.com/r/help/comments/1fojw02/cleaning_up_some_lowusage_features/?share_id=isDW8VQP3B4UNxRXN0T_4&utm_content=1&utm_medium=android_app&utm_name=androidcss&utm_source=share&utm_term=1

import React, { useState } from 'react';
import { Box, Button, Typography, ThemeProvider, createTheme, TextField } from '@mui/material';

function GuessingGame() {
  const [score, setScore] = useState(0);
  const [subreddits, setSubreddits] = useState([]);
  const [randomPost, setRandomPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [clickedIndex, setClickedIndex] = useState(null);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [quizEnded, setQuizEnded] = useState(false);

  const fetchSubreddits = async (query) => {
    setLoading(true);
    try {
      setSubreddits([]); 
      const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${query}`);
      const data = await response.json();
      if (data?.data?.children) {
        const shuffledChildren = [...data.data.children].sort(() => Math.random() - 0.5);
        const randomSubreddits = shuffledChildren.slice(0, 4).map((child) => child.data.display_name_prefixed);
        setSubreddits(randomSubreddits);
        return randomSubreddits;
      } else {
        console.log("No subreddits found.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching subreddits:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomPosts = async (subreddits) => {
    setLoading(true);
    try {
      const randomIndex = Math.floor(Math.random() * subreddits.length);
      const subreddit = subreddits[randomIndex];

      const response = await fetch(`https://www.reddit.com/${subreddit}/random/.json`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      });
      const data = await response.json();

      if (data && data.length > 0 && data[0].data.children.length > 0) {
        setRandomPost(data[0].data.children[0].data);
      } else {
        setRandomPost({ title: 'No posts found in this subreddit.' });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setRandomPost({ title: 'Error fetching the random post.' });
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (subIndex, subreddit) => {
    setClickedIndex(subIndex);
    const isCorrect = randomPost?.subreddit_name_prefixed === subreddit;

    if (isCorrect) {
      setCorrectIndex(subIndex);
      setScore(score + 1); 
      // Load the next question
      setTimeout(() => {
        fetchRandomPosts(subreddits); 
        setClickedIndex(null);
        setCorrectIndex(null);
      }, 1000);
    } else {
      setCorrectIndex(subreddits.findIndex((sub) => sub === randomPost?.subreddit_name_prefixed));
      setQuizEnded(true); // End quiz on wrong answer
    }
  };

  const handleRestart = () => {
    setScore(0);
    setQuizEnded(false);
    setQuery('');
    setSubreddits([]);
    setRandomPost(null);
    setClickedIndex(null);
    setCorrectIndex(null);
  };

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: { main: '#1976d2' },
          secondary: { main: '#dc004e' },
        },
      })}
    >
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4" gutterBottom>
          Reddit Guessing Game
        </Typography>

        {quizEnded ? (
          <Box>
            <Typography variant="h6" gutterBottom>
              Game Over! Your final score is: {score}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleRestart}>
              Restart Game
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                label="Enter any word"
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  if (query.trim()) {
                    const fetchedSubreddits = await fetchSubreddits(query);
                    if (fetchedSubreddits.length > 0) await fetchRandomPosts(fetchedSubreddits);
                  }
                }}
              >
                Start Game
              </Button>
            </Box>

            {loading && <Typography variant="body1">Loading...</Typography>}

            {!loading && randomPost && (
              <Box sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {randomPost.title}
                </Typography>

                {randomPost.url && (randomPost.url.match(/\.(jpeg|jpg|gif|png)$/) || randomPost.url.includes('i.redd.it')) && (
                  <Box
                    component="img"
                    src={randomPost.url}
                    alt="Post Image"
                    sx={{ maxWidth: '100%', height: 'auto', mt: 2 }}
                  />
                )}

                {subreddits.map((subreddit, subIndex) => (
                  <Button
                    key={subIndex}
                    variant="contained"
                    sx={{
                      mt: 1,
                      backgroundColor:
                        clickedIndex === subIndex
                          ? correctIndex === subIndex
                            ? 'green'
                            : 'red'
                          : 'default',
                    }}
                    onClick={() => handleButtonClick(subIndex, subreddit)}
                    disabled={clickedIndex !== null}
                  >
                    {subreddit}
                  </Button>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default GuessingGame;
