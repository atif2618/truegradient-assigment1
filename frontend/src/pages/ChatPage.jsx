

import React from 'react';
import TopBar from '../components/TopBar';
import LeftPanel from '../components/LeftPanel';
import ChatWindow from '../components/ChatWindow';


export default function ChatPage() {

  return (
    <div className="page">
      <TopBar />
      <div className="main">
        <LeftPanel />
        <ChatWindow />
      </div>
    </div>
  );
}
