import React, { useState, useEffect, useRef } from 'react';
import { db } from '../Config/Firebase';
import { collection, query, where, orderBy, limit, addDoc, onSnapshot, Timestamp, doc, getDoc, serverTimestamp } from 'firebase/firestore';

const ChatBox = ({ user, selectedChat, db, updateMessageData }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [personnelData, setPersonnelData] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user || !selectedChat || !db) {
      console.log('ChatBox: Missing user, selectedChat, or db:', { user, selectedChat, db });
      return;
    }

    const fetchPersonnelData = async () => {
      try {
        const personnelDoc = await getDoc(doc(db, 'personnel', selectedChat));
        if (personnelDoc.exists()) {
          const data = { id: personnelDoc.id, ...personnelDoc.data() };
          setPersonnelData(data);
          console.log('Personnel data fetched:', { id: data.id, uid: data.uid, displayName: data.displayName });
        } else {
          console.log('No personnel data found for ID:', selectedChat);
        }
      } catch (error) {
        console.error('Error fetching personnel data:', error.code, error.message);
        alert(`Error fetching personnel: ${error.message}`);
      }
    };

    fetchPersonnelData();
  }, [user, selectedChat, db]);

  useEffect(() => {
    if (!user || !selectedChat || !db || !personnelData) {
      console.log('ChatBox: Missing dependencies for messages:', { user, selectedChat, db, personnelData });
      return;
    }

    const chatId = [user.uid, personnelData.uid].sort().join('_');
    console.log('Fetching messages for chatId:', chatId);
    const messagesQuery = query(
      collection(db, 'messages'),
      where('chatId', '==', chatId),
      orderBy('createdAt', 'asc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Messages fetched:', data);
      setMessages(data);
      const messageCount = data.length;
      const latestMessage = data[data.length - 1];
      updateMessageData(personnelData.uid, messageCount, latestMessage);
    }, (error) => {
      console.error('Error in messages onSnapshot:', error.code, error.message, { chatId });
      console.log('Messages state not cleared due to error:', messages);
    });

    return () => unsubscribe();
  }, [user, selectedChat, db, personnelData, updateMessageData]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !selectedChat || !personnelData || isSending) {
      console.log('Cannot send message: missing data or already sending', { newMessage, user, selectedChat, personnelData, isSending });
      return;
    }

    setIsSending(true);
    const chatId = [user.uid, personnelData.uid].sort().join('_');
    const messageData = {
      text: newMessage.trim(),
      createdAt: serverTimestamp(),
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || '',
      chatId,
    };
    console.log('Sending message:', messageData);

    // Optimistic update
    const optimisticId = 'optimistic-' + Date.now();
    const optimisticMessage = {
      ...messageData,
      id: optimisticId,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage('');

    try {
      await addDoc(collection(db, 'messages'), messageData);
      console.log('Message sent successfully:', messageData);
    } catch (error) {
      console.error('Error sending message in handleOnSubmit:', error.code, error.message, { messageData });
      alert(`Error sending message: ${error.message}`);
      // Remove optimistic message on failure
      setMessages((prev) => prev.filter((msg) => msg.id !== optimisticId));
    } finally {
      setIsSending(false);
    }
  };

  if (!user || !selectedChat || !personnelData) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a personnel to start chatting
      </div>
    );
  }

  return (
    <section className="h-full flex flex-col">
      <header className="p-2 sm:p-3 md:p-4 bg-white shadow">
        <div className="flex items-center gap-3">
          <img
            src={personnelData?.photoURL || 'https://via.placeholder.com/32'}
            className="h-8 w-8 rounded-full object-cover border"
            alt={`${personnelData?.displayName || 'Personnel'} avatar`}
          />
          <div>
            <h2 className="text-sm text-left font-semibold">{personnelData?.displayName || 'Personnel'}</h2>
            <p className="text-xs text-left text-gray-500 font-medium">
              {personnelData?.specialization || '@iCare'}
            </p>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <section className="space-y-4 max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet.</p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.uid === user.uid ? 'justify-end' : 'justify-start'}`}
              >
                <div>
                  <img
                    src={message.photoURL || 'https://via.placeholder.com/32'}
                    className="h-6 w-6 rounded-full object-cover border mr-2 mt-1"
                    alt={`${message.displayName || 'User'} avatar`}
                  />
                </div>
                <div
                  className={`max-w-[70%] sm:max-w-[60%] p-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${
                    message.uid === user.uid
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-[10px] mt-1 opacity-75">
                    {message.createdAt instanceof Timestamp ? message.createdAt.toDate().toLocaleTimeString() : (message.createdAt instanceof Date ? message.createdAt.toLocaleTimeString() : '')}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </section>
      </main>
      <footer className="sticky bottom-0 w-full border-t p-2 z-10 bg-white">
        <form onSubmit={handleOnSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            className="flex-1 p-2 focus:outline-none rounded-full border border-gray-300 bg-white font-bold text-xs"
            placeholder="Type your message..."
            aria-label="Chat message input"
            disabled={isSending}
          />
          <button
            className="bg-blue-500 text-white font-bold text-xs rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
            aria-label="Send message"
            type="submit"
            disabled={!newMessage.trim() || isSending}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </footer>
    </section>
  );
};

export default ChatBox;