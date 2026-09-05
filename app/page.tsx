'use client'

import { useMemo, useState } from 'react'
import {
  Bell, BriefcaseBusiness, CalendarDays, Check, ChevronDown, ChevronRight, CircleHelp,
  ClipboardList, Compass, FileText, Headphones, House, Lightbulb, MapPin, Menu, MoreHorizontal,
  Rocket, Search, Settings, ShieldCheck, Sparkles, Trophy, UserRound, UsersRound, X
} from 'lucide-react'

type IconType = typeof House

const navItems: { label: string; icon: IconType }[] = [
  { label: 'Dashboard', icon: House }, { label: 'My Profile', icon: UserRound },
  { label: 'Explore Opportunities', icon: Rocket }, { label: 'My Requests', icon: ClipboardList },
  { label: 'My Applications', icon: FileText }, { label: 'My Projects', icon: BriefcaseBusiness },
  { label: 'My Mentor', icon: UsersRound }, { label: 'Events & Activities', icon: CalendarDays },
  { label: 'Notifications', icon: Bell }, { label: 'Settings', icon: Settings },
]

const categories = [
  ['Innovation', Lightbulb, 'blue'], ['Startup', Rocket, 'green'], ['Major Project', Sparkles, 'purple'],
  ['Internship', BriefcaseBusiness, 'orange'], ['Research', Search, 'blue'], ['Mentorship', UsersRound, 'pink'],
  ['IPR', ShieldCheck, 'green'], ['Drone', Sparkles, 'purple'], ['AI / IoT', Sparkles, 'yellow'], ['Competitions', Trophy, 'pink'],
] as const

const opportunities = [
  { title: 'AI for Social Impact Hackathon', org: 'SUKHF', type: 'Competition', place: 'Online', date: 'Oct 15, 2026', icon: Trophy, tone: 'yellow' },
  { title: 'Research Internship – IoT', org: 'TechSphere Labs', type: 'Internship', place: 'Hyderabad', date: 'Oct 20, 2026', icon: BriefcaseBusiness, tone: 'blue' },
  { title: 'Mentorship Program for Students', org: 'SUKHF', type: 'Mentorship', place: 'Online', date: 'Nov 01, 2026', icon: UsersRound, tone: 'pink' },
]

export default function Page() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [applied, setApplied] = useState<string[]>([])
  const filtered = useMemo(() => opportunities.filter((item) => {
    const matchesQuery = `${item.title} ${item.org} ${item.type}`.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === 'All' || item.type === category
    return matchesQuery && matchesCategory
  }), [query, category])

  return (
    <div className="dashboard-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-mark"><span /><span /><span /></div><div><strong>SUKHF</strong><small>Innovation & Opportunity<br />Management Platform</small></div><button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div>
        <nav className="nav-list" aria-label="Primary navigation">
          {navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label); setMenuOpen(false) }}><Icon /><span>{label}</span>{label === 'Notifications' && <b className="notif-count">3</b>}</button>)}
        </nav>
        <div className="sidebar-quote"><p>Learn<br />Build<br />Collaborate<br />Create Impact</p><span>—</span><div className="quote-leaves">✦</div></div>
        <footer>© 2026 SUKHF<br />All rights reserved.</footer>
      </aside>

      <main className="main-area">
        <header className="topbar"><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button><div className="search-wrap"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search opportunities, events, mentors..." aria-label="Search dashboard" /></div><div className="top-actions"><button className="icon-button" aria-label="Notifications"><Bell /><i /></button><div className="profile-menu"><div className="avatar">N</div><div className="profile-copy"><strong>Nuzhath</strong><span>Student</span></div><button aria-label="Open profile menu" onClick={() => setMenuOpen((value) => !value)}><ChevronDown /></button>{menuOpen && <div className="profile-dropdown"><button>View profile</button><button>Sign out</button></div>}</div></div></header>

        <div className="content">
          <section className="welcome-row"><div><p className="eyebrow">STUDENT PORTAL</p><h1>Welcome back, Nuzhath!</h1><p className="subtitle">Explore opportunities, collaborate with mentors and build your journey with SUKHF.</p></div><div className="quote-card"><span>“</span><em>Opportunities don’t happen,<br />you create them.</em><small>— SUKHF</small></div></section>

          <section className="stats-grid">
            {[['3', 'My Requests', ClipboardList, 'blue'], ['5', 'My Applications', Rocket, 'green'], ['2', 'My Projects', Sparkles, 'purple'], ['1', 'My Mentor', UsersRound, 'orange']].map(([number, label, Icon, tone]) => <button className={`stat-card ${tone}`} key={label as string} onClick={() => setActiveNav(label as string)}><span className="stat-icon"><Icon /></span><span><strong>{number}</strong><small>{label}</small></span><ChevronRight /></button>)}
            <div className="completion-card"><div className="progress-ring"><span>80%</span></div><div><strong>Profile Completion</strong><p>Complete your profile to get<br />better recommendations.</p><button onClick={() => setActiveNav('My Profile')}>Complete Profile</button></div></div>
          </section>

          <section className="panel categories-panel"><div className="section-heading"><h2>Explore Opportunity Categories</h2><button onClick={() => setCategory('All')}>View All</button></div><div className="category-grid">{categories.map(([label, Icon, tone]) => <button className={`category-card ${tone} ${category === label ? 'selected' : ''}`} key={label} onClick={() => setCategory(category === label ? 'All' : label)}><Icon /><span>{label}</span></button>)}</div></section>

          <div className="two-column"><section className="panel opportunities-panel"><div className="section-heading"><h2>Recommended Opportunities</h2><button onClick={() => setQuery('')}>View All</button></div><div className="opportunity-list">{filtered.length ? filtered.map((item) => <div className="opportunity" key={item.title}><span className={`opportunity-icon ${item.tone}`}><item.icon /></span><div className="opportunity-info"><strong>{item.title}</strong><span>{item.org}</span><div><b>{item.type}</b><small><MapPin />{item.place}</small><small><CalendarDays />{item.date}</small></div></div><button className="apply-button" onClick={() => setApplied((current) => current.includes(item.title) ? current : [...current, item.title])}>{applied.includes(item.title) ? 'Applied' : 'Apply'}</button></div>) : <p className="empty-state">No opportunities match your search.</p>}</div></section>

          <section className="panel journey-panel"><div className="section-heading"><h2>My SUKHF Journey</h2><button>View Details</button></div><div className="journey-track">{['Profile Completed', 'Applied', 'Selected', 'In Progress', 'Evaluation', 'Completed'].map((step, index) => <div className={`journey-step ${index < 2 ? 'done' : index === 2 ? 'current' : ''}`} key={step}><span>{index < 2 ? <Check /> : index === 2 ? '' : null}</span><small>{step}</small></div>)}</div><div className="journey-banner"><div className="journey-illustration"><div className="plant">♢</div><div className="person">●</div><div className="laptop">▰</div></div><div><strong>You are on your way!</strong><p>Keep exploring, applying and learning.<br />Your journey with SUKHF has just begun.</p></div></div></section></div>

          <div className="bottom-grid"><section className="panel"><div className="section-heading"><h2>Upcoming Events</h2><button>View All</button></div><div className="event-list"><div className="event"><time><b>SEP</b><strong>28</strong></time><div><strong>Innovation & Startup Talk</strong><span>SUKHF</span><small><CalendarDays />10:00 AM – 12:00 PM <MapPin />Online</small></div><ChevronRight /></div><div className="event"><time><b>OCT</b><strong>05</strong></time><div><strong>Drone Technology Workshop</strong><span>SUKHF</span><small><CalendarDays />10:00 AM – 02:00 PM <MapPin />Hyderabad</small></div><ChevronRight /></div></div></section><section className="panel announcements"><div className="section-heading"><h2>Latest Announcements</h2><button>View All</button></div>{['Applications Open for IGNITE 2026', 'New Research Opportunities Added', 'Mentorship Program Applications Live'].map((item, index) => <div className="announcement" key={item}><span className={`announcement-icon ${index === 1 ? 'yellow' : ''}`}>{index === 0 ? <FileText /> : index === 1 ? <Trophy /> : <UsersRound />}</span><strong>{item}</strong><small>Sep {20 - index * 2}, 2026</small></div>)}</section><section className="panel help-panel"><h2>Need Help?</h2><div className="help-content"><span><Headphones /></span><div><p>Have questions or need guidance?<br />Reach out to our support team.</p><button>Contact Support</button></div></div></section></div>
        </div>
      </main>
    </div>
  )
}
