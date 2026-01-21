import { useState } from 'react'
import { DashboardLayout } from './components/DashboardLayout'
import { SwipeDeck } from './components/SwipeDeck'
import { Insights } from './components/Insights'
import { ClustersView } from './components/ClustersView'
import { Settings } from './components/Settings'
import { type FeedbackCard } from './mockData'

function App() {
  const [activeTab, setActiveTab] = useState('triage')
  const [settingsSection, setSettingsSection] = useState<string | null>(null)

  const [backlog, setBacklog] = useState<FeedbackCard[]>([])
  const [archive, setArchive] = useState<FeedbackCard[]>([])
  const [xp, setXp] = useState(1450)
  const [streak, _setStreak] = useState(5)

  // Current User Role: Product Designer (Max)
  const userRole = 'Product Designer';

  const handleSwipeAction = (direction: 'left' | 'right', card: FeedbackCard) => {
    if (direction === 'right') setBacklog(prev => [card, ...prev]);
    else setArchive(prev => [card, ...prev]);
    setXp(prev => prev + 25)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'settings') {
      setSettingsSection('knowledge');
    } else if (tab === 'profile') {
      // Profile is handled in settings now for consistency or as a section
      setActiveTab('settings');
      setSettingsSection('profile');
    } else {
      setSettingsSection(null);
    }
  }

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      settingsSection={settingsSection}
      onSettingsSectionChange={setSettingsSection}
      xp={xp}
      streak={streak}
    >
      <div className="w-full h-full">
        {activeTab === 'triage' && (
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
              onFinishReview={() => setActiveTab('collection')}
            />
          </div>
        )}

        <div className="w-full h-full max-w-6xl mx-auto px-6 py-12">
          {activeTab === 'insights' && (
            <div className="animate-in fade-in duration-500">
              <h1 className="text-[32px] font-bold text-white tracking-tight mb-8">Insights</h1>
              <Insights />
            </div>
          )}

          {activeTab === 'collection' && (
            <div className="animate-in fade-in duration-500">
              <h1 className="text-[32px] font-bold text-white tracking-tight mb-8">Triage Results</h1>
              <ClustersView
                initialBacklog={backlog}
                initialArchive={archive}
                onUpdateBacklog={setBacklog}
                onUpdateArchive={setArchive}
                isReviewFlow={true}
              />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-in fade-in duration-500">
              <Settings activeSection={settingsSection as any} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default App
