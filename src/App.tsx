import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom'
import { DashboardLayout } from './components/DashboardLayout'
import { SwipeDeck } from './components/SwipeDeck'
import { Insights } from './components/Insights'
import { ClustersView } from './components/ClustersView'
import { Settings } from './components/Settings'
import { type FeedbackCard } from './mockData'

// Wrapper for Settings to extract param
const SettingsWrapper = () => {
  const { section } = useParams();
  // Default to 'knowledge' if no section provided (though Router should catch that with separate route or redirect)
  return <Settings activeSection={(section || 'knowledge') as any} />;
};

function App() {
  const [backlog, setBacklog] = useState<FeedbackCard[]>([])
  const [archive, setArchive] = useState<FeedbackCard[]>([])
  const [xp, setXp] = useState(1450)
  const [streak] = useState(5)
  const navigate = useNavigate();

  // Current User Role: Product Designer (Max)
  const userRole = 'Product Designer';

  const handleSwipeAction = (direction: 'left' | 'right', card: FeedbackCard) => {
    if (direction === 'right') setBacklog(prev => [card, ...prev]);
    else setArchive(prev => [card, ...prev]);
    setXp(prev => prev + 25)
  }

  return (
    <DashboardLayout xp={xp} streak={streak}>
      <Routes>
        <Route path="/" element={<Navigate to="/triage" replace />} />

        <Route path="/triage" element={
          <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
            <div className="mb-6 lg:mb-10 text-center">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Session for {userRole}
              </div>
              <h1 className="text-[32px] font-black text-white tracking-tighter">Deep Triage</h1>
            </div>
            <SwipeDeck
              backlogCount={backlog.length}
              archiveCount={archive.length}
              onSwipeAction={handleSwipeAction}
              onFinishReview={() => navigate('/collection')}
            />
          </div>
        } />

        <Route path="/insights" element={
          <div className="w-full h-full max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-500">
            <h1 className="text-[32px] font-bold text-white tracking-tight mb-8">Insights</h1>
            <Insights />
          </div>
        } />

        <Route path="/collection" element={
          <div className="w-full h-full max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-500">
            <h1 className="text-[32px] font-bold text-white tracking-tight mb-8">Triage Results</h1>
            <ClustersView
              initialBacklog={backlog}
              initialArchive={archive}
              onUpdateBacklog={setBacklog}
              onUpdateArchive={setArchive}
              isReviewFlow={true}
            />
          </div>
        } />

        {/* Settings Routes */}
        <Route path="/settings" element={<Navigate to="/settings/knowledge" replace />} />
        <Route path="/settings/:section" element={
          <div className="w-full h-full max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-500">
            <SettingsWrapper />
          </div>
        } />
      </Routes>
    </DashboardLayout>
  )
}

export default App
