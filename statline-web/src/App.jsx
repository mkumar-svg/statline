import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LiveScores from './pages/LiveScores';
import MatchCenter from './pages/MatchCenter';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[var(--color-bg)]">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LiveScores />} />
            <Route path="/match/:matchId" element={<MatchCenter />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;