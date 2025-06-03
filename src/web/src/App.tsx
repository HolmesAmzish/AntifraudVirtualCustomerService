import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Chat from './pages/Chat.tsx';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </HashRouter>
  );
}
