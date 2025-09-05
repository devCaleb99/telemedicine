import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../Config/Firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const Chatlist = ({ user, setSelectedChat, messageCounts = {}, latestMessages = {} }) => {
  const [personnel, setPersonnel] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !db) {
      console.log('User or db not available:', { user, db });
      return;
    }

    console.log('Fetching personnel for user:', { uid: user.uid, displayName: user.displayName });

    const personnelQuery = query(
      collection(db, 'personnel'),
      where('uid', '!=', user.uid)
    );
    const unsubscribePersonnel = onSnapshot(personnelQuery, (querySnapshot) => {
      const data = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((person) => person.role?.toLowerCase() === 'personnel');
      console.log('Personnel fetched:', data);
      setPersonnel(data);
    }, (error) => {
      console.error('Error fetching personnel:', error.code, error.message);
      alert(`Error fetching personnel: ${error.message}`);
    });

    return () => unsubscribePersonnel();
  }, [user]);

  const handlePersonnelClick = (personnelId) => {
    console.log('Personnel clicked:', { personnelId });
    if (window.innerWidth < 768) {
      navigate(`/chat/${personnelId}`);
    } else {
      setSelectedChat(personnelId);
    }
  };

  // Calculate total message count safely
  const totalMessages = messageCounts && typeof messageCounts === 'object'
    ? Object.values(messageCounts).reduce((a, b) => a + b, 0) || 0
    : 0;

  return (
    <section className="h-full flex flex-col">
      <div className="p-2 sm:p-3 md:p-4">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-center">
          <button className="font-bold sm:text-[10px] text-xs border rounded-full p-1.5 sm:p-2 hover:bg-gray-100">
            Talk with a Personnel
          </button>
          <button className="font-bold sm:text-[10px] text-xs border rounded-full p-1.5 sm:p-2 hover:bg-gray-100">
            Ask AI anything
          </button>
        </div>
      </div>
      <div className="p-2 sm:p-3 md:p-4">
        <h3 className="font-bold text-xs">
          Messages ({totalMessages})
        </h3>
      </div>
      <main className="flex-1 overflow-y-auto">
        {personnel.length === 0 ? (
          <div className="p-4 text-gray-500 text-center">No personnel available.</div>
        ) : (
          personnel.map((person) => (
            <button
              key={person.id}
              className="flex justify-between w-full px-2 sm:px-3 md:px-4 py-2 border-t border-b hover:bg-gray-100"
              onClick={() => handlePersonnelClick(person.id)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={person.photoURL || 'https://via.placeholder.com/40'}
                  className="h-[40px] w-[40px] rounded-full object-cover border"
                  alt={`${person.displayName || 'Personnel'} avatar`}
                />
                <span>
                  <h2 className="text-sm text-left font-semibold">{person.displayName || 'Unknown'}</h2>
                  <p className="text-xs text-left text-gray-500 font-medium">
                    {latestMessages[person.uid]?.text || 'No messages yet'}
                  </p>
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                {latestMessages[person.uid]?.createdAt
                  ? new Date(latestMessages[person.uid].createdAt.seconds * 1000).toLocaleDateString()
                  : ''}
              </p>
            </button>
          ))
        )}
      </main>
    </section>
  );
};

export default Chatlist;