import React from "react";
import { Link } from "react-router-dom";

const games = [
  { id: "game1", name: "Game 1", icon: "🎮" },
  { id: "game2", name: "Game 2", icon: "🕹️" },
  { id: "game3", name: "Game 3", icon: "👾" },
];

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Game Hub</h1>
      <div className="game-grid">
      <Link to={`/game/GuessingGame`}>
              <h3>Subreddit Post Guessing Game</h3>
            </Link>
            <Link to={`/leaderboard/GuessingGame`}>View Leaderboard</Link>
      <Link to={`/game/Hangman`}>
              <h3>Subreddit Hangman</h3>
            </Link>
            <Link to={`/leaderboard/Hangman`}>View Leaderboard</Link>
        <Link to={`/game/HigherOrLower`}>
              <h3>Subreddit Higher or Lower</h3>
            </Link>
            <Link to={`/leaderboard/HigherOrLower`}>View Leaderboard</Link>
      </div>
    </div>
  );
}

export default HomePage;
