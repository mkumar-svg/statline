import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMatchDetails, getCommentary } from '../services/api';

const TABS = ['Commentary', 'Info'];

function MatchCenter() {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [commentary, setCommentary] = useState([]);
  const [activeTab, setActiveTab] = useState('Commentary');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [matchId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [matchRes, commentaryRes] = await Promise.all([
        getMatchDetails(matchId),
        getCommentary(matchId),
      ]);
      setMatch(matchRes.data);
      setCommentary(commentaryRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load match details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-[var(--color-text-dim)]">Loading...</div>;
  if (error) return <div className="p-8 text-[var(--color-live)]">{error}</div>;
  if (!match) return null;

  const p = match.payload;

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <button
            onClick={() => navigate('/')}
            className="text-[var(--color-text-faint)] text-sm mb-2 hover:text-white"
          >
            ← Back to Live Scores
          </button>
          <h1 className="font-[var(--font-display)] text-4xl tracking-wide text-white">
            MATCH CENTER
          </h1>
          <p className="text-[var(--color-text-dim)] text-sm mt-1">{p.name}</p>
        </div>
      </div>

      {/* Score header */}
      <div className="bg-gradient-to-br from-[var(--color-panel)] to-[var(--color-panel-2)] border border-[var(--color-line)] rounded-xl p-5 mb-6">
        <p className="text-[var(--color-text-dim)] text-sm mb-3">{p.status}</p>
        {p.score && (
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-[var(--font-mono)]">
            {p.score.map((inning, idx) => (
              <div key={idx}>
                <p className="text-[var(--color-text-faint)] text-xs">{inning.inning}</p>
                <p className="text-[var(--color-gold)] font-bold text-xl">
                  {inning.r}/{inning.w}{' '}
                  <span className="text-sm text-[var(--color-text-faint)]">({inning.o} ov)</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--color-line)] mb-5">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-semibold -mb-px border-b-2 transition-colors ${
              activeTab === tab
                ? 'text-[var(--color-gold)] border-[var(--color-gold)]'
                : 'text-[var(--color-text-faint)] border-transparent hover:text-[var(--color-text-dim)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'Commentary' && (
        <div className="bg-[var(--color-panel)] border border-[var(--color-line)] rounded-xl p-5">
          {commentary.length === 0 && (
            <p className="text-[var(--color-text-faint)] text-sm">No commentary available yet.</p>
          )}
          {commentary.map((event, idx) => (
            <div
              key={idx}
              className="py-3 border-b border-[var(--color-line)] last:border-none text-sm text-[var(--color-text-dim)]"
            >
              <span className="text-[var(--color-gold)] font-mono text-xs mr-3">
                #{event.sequenceNo}
              </span>
              {event.payload?.status || 'Match update'}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Info' && (
        <div className="bg-[var(--color-panel)] border border-[var(--color-line)] rounded-xl p-5 space-y-3 text-sm">
          <InfoRow label="Venue" value={p.venue} />
          <InfoRow label="Match Type" value={p.matchType?.toUpperCase()} />
          <InfoRow label="Date" value={p.date} />
          <InfoRow label="Teams" value={p.teams?.join(' vs ')} />
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-[var(--color-line)] pb-2 last:border-none">
      <span className="text-[var(--color-text-faint)]">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

export default MatchCenter;