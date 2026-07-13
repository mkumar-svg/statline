import { useEffect, useState } from 'react';
import { getLiveMatches } from '../services/api';
import Ticker from '../components/Ticker';
import MatchCard from '../components/MatchCard';

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {matches.length > 0 && <Ticker matches={matches} />}

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-[var(--font-display)] text-4xl tracking-wide text-white">
              LIVE SCORES
            </h1>
            <p className="text-[var(--color-text-dim)] text-sm mt-1">
              Real-time updates via WebSocket · auto-refreshing
            </p>
          </div>
          <button
            onClick={fetchMatches}
            className="bg-[var(--color-gold)] text-[#12210E] px-4 py-2 rounded-lg font-bold text-xs hover:opacity-90"
          >
            Refresh
          </button>
        </div>

        {loading && <p className="text-[var(--color-text-dim)]">Loading matches...</p>}
        {error && <p className="text-[var(--color-live)]">{error}</p>}

        {!loading && !error && (
          <div>
            {matches.map((match) => (
              <MatchCard key={match.matchId} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveScores;