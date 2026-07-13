import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LiveScores from './pages/LiveScores';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[var(--color-bg)]">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LiveScores />} />
            {/* Future routes: /predict, /compare, /fantasy */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;