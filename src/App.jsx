import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import ChatPg from './Pages/ChatPg'
import ClientLogin from './Pages/ClientLogin'
import PersonnelLogin from './Pages/PersonnelLogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPg />} />
          <Route path="/login/client" element={<ClientLogin/>} />
          <Route path="/login/personnel" element={<PersonnelLogin />} />
        </Routes>
     
    </>
  )
}

export default App
