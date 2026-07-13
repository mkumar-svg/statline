import { NavLink } from 'react-router-dom';

const navItems = [
  { section: 'Overview', links: [{ to: '/', label: 'Live Scores', icon: '◉' }] },
  {
    section: 'Intelligence',
    links: [
      { to: '/predict', label: 'AI Prediction', icon: '⚡' },
      { to: '/compare', label: 'Player Compare', icon: '⇄' },
      { to: '/fantasy', label: 'Fantasy Picks', icon: '★' },
    ],
  },
];

function Sidebar() {
  return (
    <div className="w-60 bg-[var(--color-panel-2)] border-r border-[var(--color-line)] p-4 flex-shrink-0">
      <div className="flex items-center gap-2 px-2 pb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-live)] animate-pulse"></span>
        <span className="font-[var(--font-display)] text-2xl tracking-wide text-white">STATLINE</span>
      </div>

      {navItems.map((group) => (
        <div key={group.section} className="mb-4">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-faint)] px-3 mb-2">
            {group.section}
          </p>
          {group.links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 border-l-2 transition-colors ${
                  isActive
                    ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold)]'
                    : 'text-[var(--color-text-dim)] border-transparent hover:bg-[var(--color-gold)]/5 hover:text-white'
                }`
              }
            >
              <span className="w-4 text-center text-sm">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;