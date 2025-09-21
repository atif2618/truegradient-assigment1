import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ChatPage from './pages/ChatPage';
import { useSelector } from 'react-redux';

export default function App() {
  const token = useSelector(s => s.auth.token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={token ? <ChatPage /> : <Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}
