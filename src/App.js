import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import SignIn from "./SignIn";
import GuessingGame from "./GuessingGame";
import Hangman from "./Hangman";
import HigherOrLower from "./HigherOrLower";
import Leaderboard from "./Leaderboard";
import SignUp from "./SignUp";

function App() {
  return (
      <Router>
        <div>
          <header>
            <Link to="/signin">Sign In</Link>
            <Link to="/HomePage">   Home Page</Link>
          </header>
          <Routes>
          <Route path="/" element={<Navigate to="/HomePage" />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/game/GuessingGame" element={<GuessingGame />} />
          <Route path="/leaderboard/GuessingGame" element={<Leaderboard />} />
          <Route path="/game/Hangman" element={<Hangman />} />
          <Route path="/leaderboard/Hangman" element={<Leaderboard />} />
          <Route path="/game/HigherOrLower" element={<HigherOrLower />} />
          <Route path="/leaderboard/HigherOrLower" element={<Leaderboard />} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;
