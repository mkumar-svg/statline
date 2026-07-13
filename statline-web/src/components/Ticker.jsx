function Ticker({ matches }) {
  const tickerItems = matches.slice(0, 6).map((m) => {
    const p = m.payload;
    return `${p.name.split(',')[0]} — ${p.status}`;
  });

  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-gradient-to-r from-[#0C1712] to-[#16281F] border-b border-[var(--color-line)] overflow-hidden whitespace-nowrap py-2">
      <div className="inline-block animate-[scroll_35s_linear_infinite] font-[var(--font-mono)] text-xs text-[var(--color-text-dim)]">
        {doubled.map((item, idx) => (
          <span key={idx} className="mr-10">
            <span className="text-[var(--color-live)]">●</span> {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default Ticker;