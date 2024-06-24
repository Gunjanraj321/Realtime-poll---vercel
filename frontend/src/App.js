import React from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PollResults from './components/Poll/PollResults';
import CreatePoll from './components/Poll/CreatePoll';
import PublicRoute from './components/routes/PublicRoutes';
import PrivateRoute from './components/routes/PrivateRoutes'
import HomePage from './components/HomePage';
import FetchPolls from './components/Poll/FetchPolls';

function App() {
  
  return (
    <div>
      <Header /> 
      <Routes>
        <Route path="/" element={<PrivateRoute element={HomePage} />} />
        <Route path="/login" element={<PublicRoute element={Login} />} />
        <Route path="/signup" element={<PublicRoute element={Signup} />} />
        <Route path="/create" element={<PrivateRoute element={CreatePoll} />} />
        <Route path='/fetch' element={<PrivateRoute element={FetchPolls} />} />
        <Route path="/poll/:pollId/results" element={<PrivateRoute element={PollResults} />} />
      </Routes>
    </div>
  );
}

export default App;
