import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HigherOrLower = () => {
  const [subreddit1, setSubreddit1] = useState('');
  const [subreddit2, setSubreddit2] = useState('');
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [guess, setGuess] = useState(null);
  const [highScore, setHighScore] = useState(false);
  const [user, setUser] = useState(null); 
  const [correctGuess, setCorrectGuess] = useState(null); 
  const [showCounts, setShowCounts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { //only fetch subreddits when gameover is set to false
    if (!gameOver) {
      fetchSubreddits();
    }
  }, [gameOver]);

  //This function will fetch the two subreddits to be compared, as well as their sub count using Reddit API
  const fetchSubreddits = async () => {
    try {
      // Fetch first subreddit
      const response1 = await fetch('http://localhost:5000/HigherOrLower');
      const data1 = await response1.json();
  
      // Fetch second subreddit
      const response2 = await fetch('http://localhost:5000/HigherOrLower');
      const data2 = await response2.json();
      
      // Set subreddits
      setSubreddit1(data1.subreddit);
      setSubreddit2(data2.subreddit);
  
      // Fetch subreddit count for subreddit1
      const responseCount1 = await fetch(`https://www.reddit.com/subreddits/search.json?q=${encodeURIComponent(data1.subreddit)}`);
      const countData1 = await responseCount1.json();
  
      // Fetch  subreddit count for subreddit2
      const responseCount2 = await fetch(`https://www.reddit.com/subreddits/search.json?q=${encodeURIComponent(data2.subreddit)}`);
      const countData2 = await responseCount2.json();
    
      // Set the count1 if the data is valid
      if (countData1.data && countData1.data.children && countData1.data.children[0]) {
        setCount1(countData1.data.children[0].data.subscribers);
        console.log("Count1 is: ", countData1.data.children[0].data.subscribers);
      } else {
        setCount1(0);
        console.error("Error fetching count for subreddit:", data1.subreddit);
      }
  
      // Set the count2 if the data is valid
      if (countData2.data && countData2.data.children && countData2.data.children[0]) {
        setCount2(countData2.data.children[0].data.subscribers);
        console.log("Count2 is: ", countData2.data.children[0].data.subscribers);
      } else {
        setCount2(0);
        console.error("Error fetching count for subreddit:", data2.subreddit);
      }
  
    } catch (error) {
      console.error("Error fetching subreddit data", error);
    }
  };
  
  //handle guess will increase the score if the answer is correct. 
  const handleGuess = (chosenSubreddit) => {
    let correct = false;
    if (chosenSubreddit === 'subreddit1' && count1 > count2) {
      correct = true;
      setScore(score + 1);
    } else if (chosenSubreddit === 'subreddit2' && count2 > count1) {
      correct = true;
      setScore(score + 1);
    } else {
      setGameOver(true);
      if (score > 0) { //send POST to leaderboard table in database
        setHighScore(true);
      }
    }
    setGuess(chosenSubreddit);
    setCorrectGuess(correct); // Set if the guess was correct
    setShowCounts(true); // Show the counts after a guess
  };

  //This function will send a post to the leaderboard if the user is signed in 
  const saveScoreToLeaderboard = async () => { 
    try {
      const response = await fetch('http://localhost:3001/leaderboard', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user.username, 
          score
        })
      });
      alert('Score saved!');
    } catch (error) {
      console.error("Error saving score", error);
    }
  };

  const signIn = () => {
    // Navigate to sign-in page, TODO: send score to the page as well 
    navigate('/signin');
  };

  const nextQuestion = () => {
    setShowCounts(false);
    setGuess(null);
    setCorrectGuess(null);
    setSubreddit1('');
    setSubreddit2('');
    setCount1(0);
    setCount2(0);
    setGameOver(false);
    fetchSubreddits();
  };

  return (
    <div>
      <h1>Higher or Lower</h1>

      {gameOver ? (
        <div>
          {showCounts && (
            <div>
              <p>{subreddit1} - {count1} subscribers</p>
              <p>{subreddit2} - {count2} subscribers</p>
              {correctGuess !== null && (
                <div>
                  {correctGuess ? <p>Correct!</p> : <p>Incorrect!</p>}
                </div>
              )}
            </div>
          )}

          <h2>Game Over!</h2>

          <p>Your score: {score}</p>

          {highScore && (
            <div>
              <p>You have a high score! Please sign in to save it.</p>
              <button onClick={signIn}>Sign In</button>
            </div>
          )}

          <button onClick={() => {setScore(0); nextQuestion();}}>Retry?</button>
        </div>
      ) : (
        <div>
          <p>Which has a higher userbase?</p>

          <button onClick={() => handleGuess('subreddit1')}>
            {subreddit1}
          </button>

          <p>vs</p>
          
          <button onClick={() => handleGuess('subreddit2')}>
            {subreddit2}
          </button>
          
          {showCounts && (
            <div>
              <p>{subreddit1} - {count1} subscribers</p>
              <p>{subreddit2} - {count2} subscribers</p>
              {correctGuess !== null && (
                <div>
                  {correctGuess ? <p>Correct!</p> : <p>Incorrect!</p>}
                  <button onClick={nextQuestion}>Next Question</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HigherOrLower;
