import { useNavigate } from 'react-router-dom';

function MatchCard({ match }) {
  const navigate = useNavigate();
  const p = match.payload;
  const isLive = p.matchStarted && !p.matchEnded;

  return (
    <div
      onClick={() => navigate(`/match/${match.matchId}`)}
      className="bg-gradient-to-br from-[var(--color-panel)] to-[var(--color-panel-2)] border border-[var(--color-line)] rounded-xl p-5 mb-4 relative hover:border-[var(--color-gold-dim)] transition-colors cursor-pointer"
    >
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        {isLive ? (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-live)] animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-wide text-[var(--color-live)]">LIVE</span>
          </>
        ) : (
          <span className="text-[10px] font-bold tracking-wide text-[var(--color-text-faint)]">FT</span>
        )}
      </div>

      <p className="text-[11px] uppercase tracking-wider text-[var(--color-text-faint)] mb-2">
        {p.matchType}
      </p>
      <h3 className="text-white font-semibold text-base mb-1 pr-16">{p.name}</h3>
      <p className="text-[var(--color-text-dim)] text-sm mb-3">{p.status}</p>

      {p.score && (
        <div className="flex flex-wrap gap-x-6 gap-y-1 font-[var(--font-mono)] text-sm mb-3">
          {p.score.map((inning, idx) => (
            <div key={idx} className="text-gray-300">
              {inning.inning}:{' '}
              <span className="text-[var(--color-gold)] font-bold">
                {inning.r}/{inning.w}
              </span>{' '}
              <span className="text-[var(--color-text-faint)]">({inning.o} ov)</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4 text-[11px] text-[var(--color-text-faint)] pt-3 border-t border-[var(--color-line)]">
        <span>🏟 {p.venue}</span>
      </div>
    </div>
  );
}

export default MatchCard;