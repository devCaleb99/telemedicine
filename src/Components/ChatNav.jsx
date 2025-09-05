import React from 'react';

const ChatNav = ({ user, onSignOut }) => {
  return (
    <section>
      <div className="flex justify-between md:flex-col md:space-y-30 p-2 sm:p-3 md:p-4">
        <div>
          <h1 className="font-bold text-md">iChat</h1>
        </div>
        <div className="md:flex-col flex gap-2 md:space-y-5">
          <div className="flex items-center group relative">
            <i className="fa-solid fa-address-card"></i>
            <div className="hidden group-hover:block absolute left-5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-sm bg-gray-400 transition duration-200">
              <p className="text-[10px] font-bold text-white">Profile</p>
            </div>
          </div>
          <div className="flex items-center group relative">
            <button onClick={onSignOut} className="flex items-center">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <div className="hidden group-hover:block absolute left-5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-sm bg-gray-400 transition duration-200">
                <p className="text-[10px] font-bold text-white">Log out</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatNav;