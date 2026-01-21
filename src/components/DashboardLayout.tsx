import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart3,
    Inbox,
    Search,
    Settings as SettingsIcon,
    Zap,
    Bell,
    ChevronLeft,
    Database,
    Trophy,
    Flame,
    Star,
    Workflow,
    Palette,
    ShieldCheck,
    CreditCard,
    Users,
    Info,
    EyeOff,
    MoreHorizontal,
    Menu,
    UserCircle,
    LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
    <div
        onClick={onClick}
        className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors group",
            active
                ? "bg-zinc-100 text-zinc-950"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
        )}
    >
        <Icon size={18} className={cn(active ? "text-zinc-950" : "text-zinc-500 group-hover:text-zinc-300")} />
        <span className="text-sm font-semibold">{label}</span>
    </div>
);

export const DashboardLayout: React.FC<{
    children: React.ReactNode,
    activeTab: string,
    onTabChange: (tab: string) => void,
    settingsSection: string | null,
    onSettingsSectionChange: (section: string | null) => void,
    xp?: number,
    streak?: number
}> = ({ children, activeTab, onTabChange, settingsSection, onSettingsSectionChange, xp = 1450, streak = 5 }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showGamification, setShowGamification] = useState(true);
    const [isHoveringGami, setIsHoveringGami] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const level = Math.floor(xp / 1000) + 1;
    const progressToNextLevel = (xp % 1000) / 10;

    useEffect(() => {
        if (xp > 0 && xp % 1000 === 0) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ffffff', '#71717a', '#27272a']
            });
        }
    }, [level]);

    const handleBackToMain = () => {
        onSettingsSectionChange(null);
        onTabChange('triage');
    };

    const isSettingsMode = activeTab === 'settings' && settingsSection !== null;

    return (
        <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex w-64 border-r border-zinc-800 flex-col p-4 gap-8 shrink-0 relative bg-zinc-950/50">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
                            <Zap size={18} className="text-zinc-950 fill-zinc-950" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">TaxGo</span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {!isSettingsMode ? (
                        <motion.nav
                            key="main-nav"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex flex-col gap-1"
                        >
                            <SidebarItem icon={Inbox} label="Triage Deck" active={activeTab === 'triage'} onClick={() => onTabChange('triage')} />
                            <SidebarItem icon={Database} label="Collection" active={activeTab === 'collection'} onClick={() => onTabChange('collection')} />
                            <SidebarItem icon={BarChart3} label="Insights" active={activeTab === 'insights'} onClick={() => onTabChange('insights')} />
                            <div className="h-px bg-zinc-800/50 my-4 mx-2" />
                            <SidebarItem icon={SettingsIcon} label="Settings" active={activeTab === 'settings'} onClick={() => onTabChange('settings')} />
                        </motion.nav>
                    ) : (
                        <motion.nav
                            key="settings-nav"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex flex-col gap-1"
                        >
                            <button
                                onClick={handleBackToMain}
                                className="flex items-center gap-2 px-3 py-2 text-zinc-500 hover:text-white transition-colors mb-4 group"
                            >
                                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-xs font-bold tracking-normal">Back</span>
                            </button>
                            <div className="text-[10px] font-semibold text-zinc-500 tracking-normal px-3 mb-2">Workspace</div>
                            <SidebarItem icon={Database} label="Knowledge Base" active={settingsSection === 'knowledge'} onClick={() => onSettingsSectionChange('knowledge')} />
                            <SidebarItem icon={Workflow} label="Integrations & API" active={settingsSection === 'integrations'} onClick={() => onSettingsSectionChange('integrations')} />
                            <SidebarItem icon={Palette} label="White Label" active={settingsSection === 'whitelabel'} onClick={() => onSettingsSectionChange('whitelabel')} />
                            <SidebarItem icon={Users} label="Team & Permissions" active={settingsSection === 'team'} onClick={() => onSettingsSectionChange('team')} />
                            <SidebarItem icon={ShieldCheck} label="Security" active={settingsSection === 'security'} onClick={() => onSettingsSectionChange('security')} />
                            <SidebarItem icon={CreditCard} label="Billing" active={settingsSection === 'billing'} onClick={() => onSettingsSectionChange('billing')} />
                        </motion.nav>
                    )}
                </AnimatePresence>

                {/* Unified Gamification Widget */}
                <div className="mt-auto space-y-4">
                    <AnimatePresence>
                        {showGamification && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onMouseEnter={() => setIsHoveringGami(true)}
                                onMouseLeave={() => setIsHoveringGami(false)}
                                className="relative group p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all cursor-default overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-950 font-black text-[10px]">L{level}</div>
                                        <span className="text-[10px] font-bold text-zinc-400 tracking-normal">Mastery</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Flame size={12} className="text-orange-500 fill-orange-500" />
                                            <span className="text-[10px] font-bold text-white">{streak}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                            <span className="text-[10px] font-bold text-white">{xp}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden mb-1">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressToNextLevel}%` }}
                                        className="h-full bg-zinc-100"
                                    />
                                </div>

                                {/* Hover Overlay */}
                                <AnimatePresence>
                                    {isHoveringGami && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-zinc-900/95 backdrop-blur-sm flex flex-col p-3 z-10"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-1.5 text-zinc-300">
                                                    <Info size={12} />
                                                    <span className="text-[9px] font-bold tracking-tight">Gamified Triage</span>
                                                </div>
                                                <button
                                                    onClick={() => setShowGamification(false)}
                                                    className="p-1 rounded hover:bg-zinc-800 text-zinc-500 hover:text-red-400 transition-colors"
                                                >
                                                    <EyeOff size={12} />
                                                </button>
                                            </div>
                                            <p className="text-[9px] text-zinc-500 leading-tight">
                                                Earn XP for every decision. Streaks reward consistency in clearing your feedback deck.
                                            </p>
                                            <div className="mt-auto pt-2 flex items-center justify-between border-t border-zinc-800">
                                                <span className="text-[8px] font-bold text-zinc-600">Season 01</span>
                                                <span className="text-[8px] font-bold text-blue-400">View Rewards</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* User Profile - MAX (Product Designer) - CLICKABLE with Popup */}
                    <div className="relative">
                        <div
                            className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/50 flex items-center gap-3 hover:bg-zinc-900/60 transition-all cursor-pointer group"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 border border-white/10 flex items-center justify-center font-bold text-white shadow-lg overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Max" alt="Max" className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-white truncate">Max</span>
                                    <div className="px-1 py-0.5 rounded-[4px] bg-blue-500/10 border border-blue-500/20 text-[8px] font-black text-blue-400 leading-none">Admin</div>
                                </div>
                                <p className="text-[10px] text-zinc-500 truncate leading-none mt-1">Product Designer</p>
                            </div>
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="ml-auto p-1 rounded hover:bg-zinc-800 transition-colors"
                            >
                                <MoreHorizontal size={14} className="text-zinc-600" />
                            </button>
                        </div>

                        {/* Profile Popup Menu */}
                        <AnimatePresence>
                            {showProfileMenu && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowProfileMenu(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl z-50"
                                    >
                                        <button
                                            onClick={() => {
                                                setShowProfileMenu(false);
                                                onTabChange('settings');
                                                onSettingsSectionChange('profile');
                                            }}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all text-left"
                                        >
                                            <UserCircle size={16} />
                                            <span className="text-sm font-semibold">Profile Settings</span>
                                        </button>
                                        <div className="h-px bg-zinc-800 my-1" />
                                        <button
                                            onClick={() => {
                                                setShowProfileMenu(false);
                                                alert('Logged out');
                                            }}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all text-left"
                                        >
                                            <LogOut size={16} />
                                            <span className="text-sm font-semibold">Log Out</span>
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <header className="h-14 lg:h-16 border-b border-zinc-800 flex items-center justify-between px-4 lg:px-6 shrink-0 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-3 lg:hidden">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-zinc-400 hover:text-white">
                            <Menu size={20} />
                        </button>
                    </div>

                    <div className="hidden lg:flex items-center flex-1 max-w-xl relative">
                        <Search size={16} className="absolute left-3 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search TaxGo signals..."
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all placeholder:text-zinc-600"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Bell size={18} className="text-zinc-500 hover:text-white transition-colors cursor-pointer" />
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        </div>
                    </div>
                </header>

                <div className={cn(
                    "flex-1 overflow-auto relative flex flex-col no-scrollbar",
                    activeTab === 'triage' ? "items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 to-transparent" : "items-start justify-start"
                )}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab + (settingsSection || '')}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={cn(
                                "w-full h-full flex overflow-auto no-scrollbar",
                                activeTab === 'triage' ? "items-center justify-center" : "items-start justify-center"
                            )}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};
