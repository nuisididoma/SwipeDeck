import React, { useState } from 'react';
import {
    FolderIcon,
    ChevronRight,
    Search,
    Plus,

    Clock,
    CheckCircle2,
    Trash2,
    Filter,
    MoreVertical,
    Info,
    Send,
    MessageSquareText
} from 'lucide-react';
import { type FeedbackCard } from '../mockData';
import { cn } from '../lib/utils';
import { DetailsDrawer } from './DetailsDrawer';

interface ClustersViewProps {
    initialBacklog: FeedbackCard[];
    initialArchive: FeedbackCard[];
    onUpdateBacklog: (cards: FeedbackCard[]) => void;
    onUpdateArchive: (cards: FeedbackCard[]) => void;
    isReviewFlow?: boolean;
}

export const ClustersView: React.FC<ClustersViewProps> = ({
    initialBacklog,
    initialArchive,
    onUpdateBacklog,
    onUpdateArchive,
    isReviewFlow = false
}) => {
    const [view, setView] = useState<'folders' | 'backlog' | 'archive'>(isReviewFlow ? 'backlog' : 'folders');
    const [selectedCard, setSelectedCard] = useState<FeedbackCard | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [argumentation, setArgumentation] = useState('');

    const currentCards = view === 'backlog' ? initialBacklog : initialArchive;

    const handleDelete = (id: string) => {
        if (view === 'backlog') {
            onUpdateBacklog(initialBacklog.filter(c => c.id !== id));
        } else {
            onUpdateArchive(initialArchive.filter(c => c.id !== id));
        }
    };

    if (view === 'folders') {
        return (
            <div className="w-full h-full animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Backlog Folder */}
                    <div
                        onClick={() => setView('backlog')}
                        className="group p-8 rounded-[32px] bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 rounded-2xl bg-green-500/10 text-green-500">
                                <FolderIcon size={32} />
                            </div>
                            <ChevronRight className="text-zinc-700 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Backlog</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                            High-confidence signals approved for the next development cycle.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-black text-white">{initialBacklog.length}</span>
                            <span className="text-zinc-600 font-bold text-xs  tracking-tight px-3 py-1 bg-zinc-950 rounded-full">Active</span>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors" />
                    </div>

                    {/* Archive Folder */}
                    <div
                        onClick={() => setView('archive')}
                        className="group p-8 rounded-[32px] bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 rounded-2xl bg-zinc-800/50 text-zinc-500">
                                <FolderIcon size={32} />
                            </div>
                            <ChevronRight className="text-zinc-700 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Archive</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                            Past experiments, noise, and low-priority signals stored for context.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-black text-white">{initialArchive.length}</span>
                            <span className="text-zinc-600 font-bold text-xs  tracking-tight px-3 py-1 bg-zinc-950 rounded-full">History</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-8 animate-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={() => setView('folders')}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group self-start"
            >
                <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold  tracking-tight">Back to Collection</span>
            </button>

            {isReviewFlow && view === 'backlog' && (
                <div className="p-8 rounded-[32px] bg-blue-500/5 border border-blue-500/20 mb-4 animate-in fade-in zoom-in-95 duration-700">
                    <div className="flex flex-col gap-8">
                        {/* PM Info Header */}
                        <div className="flex items-center gap-4 pb-6 border-b border-zinc-800">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-600 border border-white/10 flex items-center justify-center font-bold text-white shadow-lg overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-white">Sarah Chen</span>
                                    <div className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-[9px] font-bold text-purple-400">Product Manager</div>
                                </div>
                                <p className="text-xs text-zinc-500 mt-0.5">Will review your submission</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1 space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <MessageSquareText size={20} className="text-blue-500" />
                                        <h3 className="text-lg font-bold text-white">Review & Handoff</h3>
                                    </div>
                                    <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                                        Review your triaged signals below. You can delete or edit items before submission. Add your prioritization rationale for the PM review.
                                    </p>
                                </div>

                                <textarea
                                    value={argumentation}
                                    onChange={(e) => setArgumentation(e.target.value)}
                                    placeholder="Write your argumentation here..."
                                    className="w-full h-32 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-600 resize-none"
                                />

                                {/* File Attachment */}
                                <div className="flex items-center gap-3">
                                    <label className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group">
                                        <svg className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                        <span className="text-xs text-zinc-400 group-hover:text-zinc-300 font-semibold">Attach files (optional)</span>
                                        <input type="file" className="hidden" multiple />
                                    </label>
                                </div>
                            </div>

                            <div className="w-full md:w-64 pt-0 md:pt-12">
                                <button
                                    onClick={() => {
                                        alert('Submitted to PM Review!');
                                        setView('folders');
                                    }}
                                    className="w-full py-4 rounded-2xl bg-blue-600 text-white text-xs font-black tracking-tight hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                                >
                                    <Send size={16} /> Submit to PM
                                </button>
                                <p className="text-[10px] text-zinc-600 text-center mt-3 font-bold tracking-tight">
                                    All {initialBacklog.length} signals will be sent
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-800">
                <div />
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                        <input
                            type="text"
                            placeholder="Search signals..."
                            className="bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-4 text-xs text-zinc-300 focus:outline-none focus:border-zinc-700 w-full sm:w-64"
                        />
                    </div>
                    <button className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
                        <Filter size={14} />
                    </button>
                    <button className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
                        <Plus size={14} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {currentCards.map((card) => (
                    <div
                        key={card.id}
                        className="group p-5 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => { setSelectedCard(card); setDrawerOpen(true); }}>
                            <div className={cn(
                                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0",
                                card.type === 'feature' ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500"
                            )}>
                                {card.type === 'feature' ? <CheckCircle2 size={18} /> : <Info size={18} />}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{card.title}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[10px] font-bold text-zinc-500  tracking-tight">{card.author}</span>
                                    <div className="flex items-center gap-1 text-[10px] text-zinc-600">
                                        <Clock size={10} /> {card.time}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2 mr-4">
                                {[1, 2].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[8px] font-bold text-zinc-500">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <button className="p-2 rounded-lg text-zinc-600 hover:text-white hover:bg-zinc-800 transition-all opacity-0 group-hover:opacity-100">
                                <MoreVertical size={14} />
                            </button>
                            <button
                                onClick={() => handleDelete(card.id)}
                                className="p-2 rounded-lg text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}

                {currentCards.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                        <FolderIcon size={48} className="text-zinc-700 mb-4" />
                        <p className="text-sm font-bold text-zinc-500  tracking-tight">No signals found</p>
                    </div>
                )}
            </div>

            <DetailsDrawer
                card={selectedCard}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
        </div>
    );
};
