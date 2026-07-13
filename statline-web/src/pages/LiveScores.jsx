import { useEffect, useState } from 'react';
import { getLiveMatches } from '../services/api';

function LiveScores() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await getLiveMatches();
      setMatches(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load matches. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Loading matches...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Scores</h1>
          <p className="text-gray-400 text-sm">Real-time updates via Kafka + Redis</p>
        </div>
        <button
          onClick={fetchMatches}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-400"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {matches.map((match) => {
          const payload = match.payload;
          const isLive = payload.matchStarted && !payload.matchEnded;

          return (
            <div
              key={match.matchId}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 relative"
            >
              {isLive && (
                <span className="absolute top-4 right-4 text-red-500 text-xs font-bold flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  LIVE
                </span>
              )}

              <p className="text-gray-500 text-xs uppercase mb-2">{payload.matchType}</p>
              <h2 className="text-white font-semibold text-lg mb-1">{payload.name}</h2>
              <p className="text-gray-400 text-sm mb-3">{payload.status}</p>

              {payload.score && (
                <div className="flex gap-6 text-sm">
                  {payload.score.map((inning, idx) => (
                    <div key={idx} className="text-gray-300 font-mono">
                      {inning.inning}: <span className="text-yellow-400 font-bold">{inning.r}/{inning.w}</span> ({inning.o} ov)
                    </div>
                  ))}
                </div>
              )}

              <p className="text-gray-600 text-xs mt-3">{payload.venue}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LiveScores;