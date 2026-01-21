import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, ExternalLink, Activity, Target, Share2, Edit3, Mic } from 'lucide-react';
import { type FeedbackCard } from '../mockData';

interface DetailsDrawerProps {
    card: FeedbackCard | null;
    isOpen: boolean;
    onClose: () => void;
}

export const DetailsDrawer: React.FC<DetailsDrawerProps> = ({ card, isOpen, onClose }) => {
    if (!card) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-[480px] bg-zinc-950 border-l border-zinc-800 z-50 overflow-y-auto no-scrollbar"
                    >
                        <div className="p-8 flex flex-col gap-8">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        {card.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-medium text-zinc-400  tracking-tight">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
                                        {card.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Action Bar */}
                            <div className="flex items-center gap-3">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 text-sm font-semibold hover:bg-zinc-200 transition-colors">
                                    <Share2 size={16} /> Push to Linear
                                </button>
                                <div className="flex gap-2">
                                    <button className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                                        <Edit3 size={18} />
                                    </button>
                                    <button className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                                        <Mic size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Evidence Section */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageSquare size={16} className="text-zinc-500" />
                                    <h3 className="text-sm font-semibold text-zinc-300  tracking-tight">Raw Evidence</h3>
                                </div>
                                <div className="space-y-3">
                                    {card.evidence.map((item, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-zinc-500">{item.source}</span>
                                                <span className="text-[10px] text-zinc-600 ">{item.time}</span>
                                            </div>
                                            <p className="text-sm text-zinc-300 leading-relaxed  tracking-tight opacity-80">
                                                "{item.text}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* AI Market Pulse */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <Activity size={16} className="text-zinc-500" />
                                    <h3 className="text-sm font-semibold text-zinc-300  tracking-tight">Market Pulse</h3>
                                </div>
                                <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-transparent">
                                    <p className="text-sm text-zinc-400 leading-relaxed  tracking-tighter opacity-70">
                                        AI Analysis: Discussion around <span className="text-zinc-200 font-medium">"{card.title}"</span> is trending on Reddit r/SaaS (34 mentions) and Twitter (89 mentions in last 24h). Sentiment is <span className="text-green-500">highly positive (82%)</span> for productivity-focused personas.
                                    </p>
                                    <div className="mt-4 flex gap-4">
                                        <div className="flex-1">
                                            <div className="text-[10px] text-zinc-500  mb-1 leading-none">Sentiment</div>
                                            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                                <div className="w-[82%] h-full bg-green-500" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[10px] text-zinc-500  mb-1 leading-none">Clustering</div>
                                            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                                <div className="w-[65%] h-full bg-blue-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Competitor Analysis */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <Target size={16} className="text-zinc-500" />
                                    <h3 className="text-sm font-semibold text-zinc-300  tracking-tight">Competitor Scan</h3>
                                </div>
                                {card.competitor ? (
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-zinc-700 flex items-center justify-center text-[10px] font-bold">
                                                {card.competitor.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-zinc-200  tracking-tight">{card.competitor.name}</div>
                                                <div className="text-[10px] text-zinc-500 ">Feature already active</div>
                                            </div>
                                        </div>
                                        <div className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-400  tracking-tighter">
                                            View Docs <ExternalLink size={10} className="inline ml-1" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-xl bg-zinc-900/40 border border-dotted border-zinc-800 text-center">
                                        <span className="text-xs text-zinc-500  tracking-tight">No direct competitor feature matches found. Potential USP.</span>
                                    </div>
                                )}
                            </section>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
