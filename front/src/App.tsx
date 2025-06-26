import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import News from './pages/News';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
