import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatNav from '../Components/ChatNav';
import Chatlist from '../Components/Chatlist';
import ChatBox from '../Components/ChatBox';
import { auth, db } from '../Config/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const ChatPg = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [user, setUser] = useState(null);
  const [messageData, setMessageData] = useState({ counts: {}, latest: {} });
  const navigate = useNavigate();
  const { chatId } = useParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('User authenticated in ChatPg:', { uid: currentUser.uid, displayName: currentUser.displayName });
        setUser(currentUser);
      } else {
        console.log('No user authenticated, redirecting to login');
        navigate('/login/client', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (chatId) {
      console.log('Setting selectedChat from URL:', chatId);
      setSelectedChat(chatId);
    }
  }, [chatId]);

  const updateMessageData = (personnelUid, count, latestMessage) => {
    console.log('Updating message data:', { personnelUid, count, latestMessage });
    setMessageData((prev) => ({
      counts: { ...prev.counts, [personnelUid]: count },
      latest: { ...prev.latest, [personnelUid]: latestMessage },
    }));
  };

  const handleSignOut = async () => {
    try {
      console.log('Attempting sign-out for user:', { uid: user?.uid, displayName: user?.displayName });
      await signOut(auth);
      console.log('User signed out, redirecting to login');
      navigate('/login/client', { replace: true });
    } catch (error) {
      console.error('Sign-out error:', error.code, error.message);
      alert(`Error signing out: ${error.message}`);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <section className="nunito p-0">
      <div className="md:grid md:grid-cols-[10%_30%_60%] h-[100vh] w-full flex flex-col">
        <div className="border-r md:h-full h-auto bg-purple-950 text-white">
          <ChatNav user={user} onSignOut={handleSignOut} />
        </div>
        <div className="border-r flex-1 text-white-purple-950">
          <Chatlist
            user={user}
            setSelectedChat={setSelectedChat}
            messageCounts={messageData.counts || {}}
            latestMessages={messageData.latest || {}}
          />
        </div>
        <div className="hidden md:block flex-1">
          <ChatBox user={user} selectedChat={selectedChat} db={db} updateMessageData={updateMessageData} />
        </div>
      </div>
    </section>
  );
};

export default ChatPg;