import React, { useState } from 'react';
import {
    Globe,
    Plus,
    ExternalLink,
    Cpu,
    Webhook,
    ShieldCheck,
    Image as ImageIcon,
    History,

    Check,
    ChevronRight,
    Send,
    User as UserIcon,
    Camera,
    Mail,
    Lock,
    Globe2,
    FileText,
    Upload,
    File,
    Trash2,
    Slack
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';
import { fetchSlackMessages } from '../lib/slack';

interface SettingsProps {
    activeSection: 'knowledge' | 'integrations' | 'whitelabel' | 'security' | 'billing' | 'team' | 'profile';
}

export const Settings: React.FC<SettingsProps> = ({ activeSection }) => {
    const [model, setModel] = useState<'gemini' | 'claude' | 'gpt4'>('gemini');
    const [isSyncing, setIsSyncing] = useState(false);
    const [brandName, setBrandName] = useState('TaxGo');
    const [primaryColor, setPrimaryColor] = useState('#ffffff');

    return (
        <div className="w-full flex flex-col gap-12 animate-in fade-in duration-500">
            <header>
                <h1 className="text-[32px] font-bold text-white tracking-tight">
                    {activeSection === 'knowledge' && 'Knowledge Base'}
                    {activeSection === 'integrations' && 'Integrations & API'}
                    {activeSection === 'whitelabel' && 'White Label Identity'}
                    {activeSection === 'security' && 'Security & Compliance'}
                    {activeSection === 'billing' && 'Billing & Usage'}
                    {activeSection === 'team' && 'Team & Permissions'}
                    {activeSection === 'profile' && 'My Settings'}
                </h1>
            </header>

            <div className="space-y-12">
                {activeSection === 'profile' && (
                    <div className="max-w-4xl space-y-12 animate-in slide-in-from-right-4 duration-500">
                        <section className="flex flex-col md:flex-row gap-12 items-start">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-[40px] bg-gradient-to-tr from-blue-500 to-indigo-600 border-4 border-zinc-900 shadow-2xl overflow-hidden flex items-center justify-center">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Max" alt="Max" className="w-full h-full object-cover" />
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-3 rounded-2xl bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 transition-all shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                                    <Camera size={18} />
                                </button>
                            </div>

                            <div className="flex-1 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 text-left">
                                        <label className="text-[10px] font-bold text-zinc-500  tracking-tight px-1">Display Name</label>
                                        <div className="relative">
                                            <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                                            <input type="text" defaultValue="Max" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-left">
                                        <label className="text-[10px] font-bold text-zinc-500  tracking-tight px-1">Email Address</label>
                                        <div className="relative">
                                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                                            <input type="email" defaultValue="max@taxgo.ai" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all opacity-50 cursor-not-allowed" disabled />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-6 border-t border-zinc-900">
                                    <div className="flex items-center justify-between p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                                                <Lock size={20} />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-sm font-bold text-white  tracking-tight">Security & Passwords</h4>
                                                <p className="text-xs text-zinc-500">Last changed 4 months ago</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                                    </div>

                                    <div className="flex items-center justify-between p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                                                <Globe2 size={20} />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-sm font-bold text-white  tracking-tight">Timezone & Localization</h4>
                                                <p className="text-xs text-zinc-500">(GMT+01:00) Central European Time</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {activeSection === 'knowledge' && (
                    <div className="space-y-12">
                        <section className="text-left">
                            <div className="flex items-center justify-between mb-6 px-2">
                                <div className="flex items-center gap-2">
                                    <Globe size={18} className="text-zinc-400" />
                                    <h3 className="text-lg font-bold text-white tracking-tight leading-none">Tax Domain Feeds</h3>
                                </div>
                                <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                                    <Plus size={12} /> Add source
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { title: "IRS Tax Code Updates (2024)", url: "irs.gov/newsroom", tags: ["Federal", "Official"] },
                                    { title: "TurboTax Pricing & Feature Matrix", url: "turbotax.com/pricing", tags: ["Competitor"] },
                                    { title: "Avalara Compliance Changelog", url: "avalara.com/blog", tags: ["TaxTech"] }
                                ].map((link, i) => (
                                    <div key={i} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all group">
                                        <h4 className="text-sm font-bold text-white mb-1 tracking-tight">{link.title}</h4>
                                        <p className="text-[10px] text-zinc-500 mb-4 flex items-center gap-1 leading-none"><ExternalLink size={10} /> {link.url}</p>
                                        <div className="flex gap-1">
                                            {link.tags.map(t => <span key={t} className="px-1.5 py-0.5 rounded-md bg-zinc-800 text-[9px] font-medium text-zinc-400 leading-none">{t}</span>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="text-left">
                            <div className="flex items-center justify-between mb-6 px-2">
                                <div className="flex items-center gap-2">
                                    <FileText size={18} className="text-zinc-400" />
                                    <h3 className="text-lg font-bold text-white tracking-tight leading-none">Research & Documents</h3>
                                </div>
                                <label className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer">
                                    <Plus size={12} /> Upload File
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const { error } = await supabase.storage
                                                .from('SwipeDeck-files')
                                                .upload(`${Date.now()}_${file.name}`, file);

                                            if (error) {
                                                console.error('Error uploading:', error);
                                                alert(`Upload failed: ${error.message}. \n\nCheck if you RESTARTED your 'npm run dev' after adding .env file.`);
                                            } else {
                                                window.location.reload();
                                            }
                                        }}
                                    />
                                </label>
                            </div>

                            <div className="relative group/upload">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-[36px] blur opacity-0 group-hover/upload:opacity-100 transition duration-500"></div>
                                <div className="relative p-8 rounded-[32px] bg-zinc-950 border border-zinc-800 border-dashed flex flex-col items-center justify-center text-center group hover:border-zinc-700 transition-all cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300">
                                        <Upload size={20} className="text-zinc-400 group-hover:text-blue-400" />
                                    </div>
                                    <p className="text-xs text-zinc-500 max-w-[200px] mb-4 tracking-tight group-hover:text-zinc-300 transition-colors">
                                        Drag and drop <span className="text-white font-bold">competitor research</span> or <span className="text-white font-bold">documentation</span> here
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <span className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-500 font-bold tracking-widest uppercase">PDF</span>
                                        <span className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-500 font-bold tracking-widest uppercase">DOCX</span>
                                    </div>
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const { error } = await supabase.storage
                                                .from('SwipeDeck-files')
                                                .upload(`${Date.now()}_${file.name}`, file);

                                            if (error) {
                                                console.error('Error uploading:', error);
                                                alert(`Upload failed: ${error.message}. \n\nCheck if you RESTARTED your 'npm run dev' after adding .env file.`);
                                            } else {
                                                window.location.reload();
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 space-y-2">
                                {[
                                    { name: "Competitor_Analysis_Q4.pdf", size: "2.4 MB", type: "pdf" },
                                    { name: "IRS_Regulation_Compliance_v2.docx", size: "1.1 MB", type: "doc" }
                                ].map((file, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-zinc-950 text-zinc-500">
                                                <File size={16} />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-sm font-bold text-white tracking-tight leading-none mb-1">{file.name}</h4>
                                                <span className="text-[10px] text-zinc-600 font-bold">{file.size}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors">
                                                <ExternalLink size={14} />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-500 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="p-10 rounded-[40px] bg-zinc-900 border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-950 text-left">
                            <div className="flex flex-col md:flex-row gap-12 items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Cpu size={24} className="text-zinc-100" />
                                        <h3 className="text-2xl font-bold text-white tracking-tight ">AI Brain Selection</h3>
                                    </div>
                                    <p className="text-sm text-zinc-400 leading-relaxed tracking-tighter opacity-80">
                                        RATIONALE: For USA Tax automation, Gemini 1.5 Pro's 1M context window is essential to process massive IRS publications alongside your internal logic for precise cross-referencing.
                                    </p>
                                </div>
                                <div className="w-full md:w-80 space-y-2">
                                    {['gemini', 'claude', 'gpt4'].map(m => (
                                        <div key={m} onClick={() => setModel(m as any)} className={cn("p-4 rounded-xl border cursor-pointer transition-all", model === m ? "bg-white text-black" : "bg-zinc-950 text-white border-zinc-800")}>
                                            <span className="text-sm font-bold ">{m} 1.5 Pro</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {activeSection === 'integrations' && (
                    <div className="space-y-12 animate-in slide-in-from-right-4 duration-500 text-left">
                        <section>
                            <h3 className="text-lg font-bold text-white mb-6 px-2  tracking-tight">Native Tax Stack</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { name: "QuickBooks", desc: "Sync small business data", icon: "https://quickbooks.intuit.com/favicon.ico", status: "Connected" },
                                    { name: "IRS MeF", desc: "Modernized E-File API", icon: "https://www.irs.gov/favicon.ico", status: "Connected" },
                                    { name: "Xero", desc: "Import accounting logs", icon: "https://www.xero.com/favicon.ico", status: "Not Setup" },
                                    {
                                        name: "Slack",
                                        desc: "Import feedback from channels",
                                        icon: "https://a.slack-edge.com/80588/img/services/api_512.png",
                                        status: import.meta.env.VITE_SLACK_TOKEN ? "Connected" : "Not Setup",
                                        isSlack: true
                                    }
                                ].map((app, i) => (
                                    <div key={i} className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 flex flex-col gap-6 group hover:border-zinc-700 transition-all">
                                        <div className="flex items-center justify-between">
                                            <img src={app.icon} className="w-10 h-10 rounded shadow-lg" />
                                            <span className={cn(
                                                "text-[9px] font-bold px-2 py-1 rounded bg-zinc-900",
                                                app.status === "Connected" ? "text-green-500" : "text-zinc-500"
                                            )}>{app.status}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg  tracking-tight">{app.name}</h4>
                                            <p className="text-xs text-zinc-500 mt-1  tracking-tighter opacity-70">{app.desc}</p>
                                        </div>
                                        {app.isSlack && app.status === "Connected" && (
                                            <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-bold text-zinc-600 uppercase">Channel ID</label>
                                                    <input
                                                        type="text"
                                                        placeholder="C012345678"
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-700"
                                                        defaultValue={localStorage.getItem('slack_channel_id') || ''}
                                                        onChange={(e) => localStorage.setItem('slack_channel_id', e.target.value)}
                                                    />
                                                </div>
                                                <button
                                                    disabled={isSyncing}
                                                    onClick={async () => {
                                                        const channelId = localStorage.getItem('slack_channel_id');
                                                        if (!channelId) {
                                                            alert('Please enter a Channel ID first');
                                                            return;
                                                        }
                                                        setIsSyncing(true);
                                                        try {
                                                            const messages = await fetchSlackMessages(channelId);
                                                            const existing = JSON.parse(localStorage.getItem('synced_feedback') || '[]');
                                                            const newInsights = messages.map((m: any) => ({
                                                                id: `slack-${m.ts}`,
                                                                type: m.text.toLowerCase().includes('bug') ? 'bug' : 'feature',
                                                                emoji: m.text.toLowerCase().includes('bug') ? '🛑' : '💬',
                                                                title: m.text.slice(0, 40) + (m.text.length > 40 ? '...' : ''),
                                                                summary: m.text,
                                                                mentions: 1,
                                                                users: [{ name: m.user, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.user}` }],
                                                                tags: ["Slack", "Imported"],
                                                                evidence: [{
                                                                    source: "Slack",
                                                                    text: m.text,
                                                                    time: new Date(parseFloat(m.ts) * 1000).toLocaleTimeString()
                                                                }]
                                                            }));
                                                            localStorage.setItem('synced_feedback', JSON.stringify([...newInsights, ...existing]));
                                                            alert(`Successfully synced ${messages.length} messages! Go to Triage Deck to see them.`);
                                                        } catch (err: any) {
                                                            alert(`Sync failed: ${err.message}`);
                                                        } finally {
                                                            setIsSyncing(false);
                                                        }
                                                    }}
                                                    className="w-full py-2 bg-zinc-100 text-zinc-950 text-[10px] font-bold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
                                                >
                                                    {isSyncing ? 'Syncing...' : (
                                                        <>
                                                            <Slack size={12} className="group-hover:rotate-12 transition-transform" />
                                                            Sync Messages
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 border-dashed flex flex-col items-center justify-center text-center">
                            <Webhook size={32} className="text-zinc-700 mb-4" />
                            <h4 className="text-white font-bold mb-2  tracking-tight">Configure Webhooks</h4>
                            <p className="text-sm text-zinc-500 max-w-sm mb-6  tracking-tight opacity-60">Stream data into TaxGo from Reddit, Slack, or custom scrapers using dedicated endpoints.</p>
                            <button className="px-6 py-2 rounded-xl bg-zinc-800 text-white text-xs font-bold hover:bg-zinc-700 transition-colors  tracking-tight">Generate Endpoint</button>
                        </section>
                    </div>
                )
                }

                {
                    activeSection === 'whitelabel' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in slide-in-from-right-4 duration-500 text-left">
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-4  tracking-tight">Brand Identity</h3>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-zinc-500  tracking-tight">SaaS Name</label>
                                            <input
                                                type="text"
                                                value={brandName}
                                                onChange={(e) => setBrandName(e.target.value)}
                                                className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-zinc-600 focus:bg-zinc-950 transition-all font-bold  tracking-tight"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-zinc-500  tracking-tight">Primary Accent</label>
                                            <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 transition-all">
                                                <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: primaryColor }} />
                                                <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="bg-transparent text-zinc-400 focus:outline-none flex-1 font-mono " />
                                                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-zinc-500 mb-4  tracking-tight">Assets Repository</h3>
                                    <div className="p-10 rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-900/30 flex flex-col items-center justify-center gap-3 group hover:border-zinc-700 transition-all cursor-pointer">
                                        <ImageIcon size={32} className="text-zinc-700 group-hover:text-zinc-500" />
                                        <span className="text-xs text-zinc-500 font-bold  tracking-tight">Upload SVG Branding</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-zinc-950 border border-zinc-800 rounded-[48px] p-10 flex flex-col items-center justify-center relative overflow-hidden h-[500px]">
                                <div className="text-[10px] font-black text-zinc-700  tracking-[0.2em] absolute top-10 left-10">Live Preview</div>
                                <div className="w-full max-w-xs p-8 rounded-[32px] bg-zinc-900 border border-zinc-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] scale-110">
                                    <div className="flex items-center gap-2 mb-8 text-left">
                                        <div className="w-7 h-7 rounded-lg" style={{ backgroundColor: primaryColor }} />
                                        <span className="text-base font-bold tracking-tight text-white ">{brandName}</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-2 w-2/3 bg-zinc-800 rounded-full" />
                                        <div className="h-2 w-full bg-zinc-800 rounded-full opacity-40" />
                                        <div className="h-10 w-full mt-6 rounded-2xl" style={{ backgroundColor: primaryColor }} />
                                    </div>
                                </div>
                                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-[100px]" />
                            </div>
                        </div>
                    )
                }

                {
                    activeSection === 'team' && (
                        <div className="space-y-12 animate-in slide-in-from-right-4 duration-500 text-left">
                            <section>
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <h3 className="text-lg font-bold text-white  tracking-tight">Workspace Roles</h3>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-bold hover:bg-white transition-all  tracking-tight">
                                        <Plus size={14} /> Invite Member
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        { role: "CEO / Owner", members: 1, permissions: "Full Read/Write, Triage Review, Billing", color: "bg-purple-500" },
                                        { role: "Product Manager", members: 2, permissions: "Triage Write, Linear Sync, Docs Edit", color: "bg-blue-500" },
                                        { role: "Head Dev", members: 1, permissions: "Review Technical Bugs, API Access", color: "bg-green-500" },
                                        { role: "Product Designer", members: 1, permissions: "UI/UX Feedback, Insight Review", color: "bg-indigo-500" },
                                        { role: "Marketer", members: 3, permissions: "Read-only Insights, Competitor Docs", color: "bg-orange-500" }
                                    ].map((r, i) => (
                                        <div key={i} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col gap-5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("w-2 h-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]", r.color)} />
                                                    <h4 className="text-sm font-black  tracking-tight text-white">{r.role}</h4>
                                                </div>
                                                <span className="text-[10px] font-bold text-zinc-500 ">{r.members} Members</span>
                                            </div>
                                            <p className="text-xs text-zinc-400 font-medium leading-relaxed  tracking-tight opacity-70">{r.permissions}</p>
                                            <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between">
                                                <button className="text-[10px] font-bold text-zinc-600 hover:text-white  tracking-tight transition-colors">Edit Rights</button>
                                                <ChevronRight size={14} className="text-zinc-700" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="p-10 rounded-[48px] bg-zinc-950 border border-zinc-800 relative overflow-hidden">
                                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start text-left">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                                                <Send size={24} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white tracking-tight ">Handoff & Review Flow</h3>
                                        </div>
                                        <p className="text-sm text-zinc-500 leading-relaxed mb-8  tracking-tight">
                                            Enable structured handoffs between roles. When a teammate finishes triaging their relevant signals, they can bundle them and send to a Reviewer (CEO/PM) with a prioritized rationale.
                                        </p>

                                        <div className="space-y-4">
                                            {[
                                                "Require Argumentation for 'High Impact' tags",
                                                "Notify CEO when Designer completes Triage",
                                                "Auto-archive signals after 30 days of inactivity"
                                            ].map((opt, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                                                        {i < 2 ? <Check size={12} className="text-blue-500" /> : null}
                                                    </div>
                                                    <span className="text-xs text-zinc-300  tracking-tight">{opt}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full md:w-80 p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
                                        <h4 className="text-[10px] font-bold text-zinc-500  tracking-tight mb-4">Signal Routing</h4>
                                        <div className="space-y-2">
                                            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                                                <span className="text-xs text-zinc-300  tracking-tighter leading-none">Bugs → Head Dev</span>
                                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                            </div>
                                            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                                                <span className="text-xs text-zinc-300  tracking-tighter leading-none">UX Issues → Max</span>
                                                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                            </div>
                                            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                                                <span className="text-xs text-zinc-300  tracking-tighter leading-none">Marketer → PM Review</span>
                                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]" />
                            </section>
                        </div>
                    )
                }

                {/* ... Other sections kept but with italic/role style fixes applied ... */}
                {
                    activeSection === 'security' && (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 text-left">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "SOC2 Compliance", status: "Certified", date: "Jan 2024" },
                                    { label: "GDPR Alignment", status: "Active", date: "Continuous" },
                                    { label: "Encrpytion", status: "AES-256", date: "Automated" }
                                ].map((s, i) => (
                                    <div key={i} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col gap-2">
                                        <ShieldCheck className="text-green-500 mb-2" size={24} />
                                        <h4 className="text-white font-bold  tracking-tight">{s.label}</h4>
                                        <p className="text-xs text-zinc-500  tracking-tight">{s.status} — {s.date}</p>
                                    </div>
                                ))}
                            </div>
                            <section className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800">
                                <h4 className="text-white font-bold mb-4  tracking-tight">Access Logs</h4>
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-900 last:border-0 border-dashed">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                                <span className="text-xs text-zinc-300  tracking-tighter">Login attempt from 192.168.1.1</span>
                                            </div>
                                            <span className="text-[10px] text-zinc-600 font-mono ">2h ago</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )
                }

                {
                    activeSection === 'billing' && (
                        <div className="space-y-12 animate-in slide-in-from-right-4 duration-500 text-left">
                            <div className="p-8 rounded-[40px] bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-left">
                                    <span className="text-[10px] font-black text-zinc-500  tracking-tight mb-2 block">Current Plan</span>
                                    <h3 className="text-3xl font-black text-white mb-2 tracking-tighter  leading-none">Scale Plan</h3>
                                    <p className="text-sm text-zinc-400  tracking-tight">Next billing date: Feb 21, 2026</p>
                                </div>
                                <div className="flex flex-col items-end gap-2 text-right">
                                    <span className="text-2xl font-bold text-white tracking-tight">$499/MO</span>
                                    <button className="px-6 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors  tracking-tight">Manage Subscription</button>
                                </div>
                            </div>

                            <section>
                                <h4 className="flex items-center gap-2 text-white font-bold mb-6  tracking-tight">
                                    <History size={18} /> Invoiced History
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        { id: "#INV-9281", date: "Dec 21, 2025", amount: "$499.00" },
                                        { id: "#INV-9220", date: "Nov 21, 2025", amount: "$499.00" }
                                    ].map((inv, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-zinc-900 transition-all cursor-pointer">
                                            <span className="text-sm font-bold text-zinc-300  tracking-tight">{inv.id}</span>
                                            <span className="text-xs text-zinc-500  leading-none">{inv.date}</span>
                                            <span className="text-sm font-bold text-white tracking-tight">{inv.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )
                }
            </div >
        </div >
    );
};
