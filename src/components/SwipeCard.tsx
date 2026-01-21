import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, type PanInfo, AnimatePresence } from 'framer-motion';
import { Layers, Check, Archive, Info, Sparkles, Search, Loader2, Star } from 'lucide-react';
import { type FeedbackCard } from '../mockData';
import { cn } from '../lib/utils';

interface SwipeCardProps {
    card: FeedbackCard;
    onSwipe: (direction: 'left' | 'right') => void;
    onShowDetails: (card: FeedbackCard) => void;
    isFront: boolean;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
    card,
    onSwipe,
    onShowDetails,
    isFront,
    isFavorite = false,
    onToggleFavorite
}) => {
    const [isSearchingLinear, setIsSearchingLinear] = useState(false);
    const [linearMatch, setLinearMatch] = useState<{ id: string, title: string } | null>(null);

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    const rightOverlayOpacity = useTransform(x, [50, 150], [0, 1]);
    const leftOverlayOpacity = useTransform(x, [-150, -50], [1, 0]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.x > 150) {
            onSwipe('right');
        } else if (info.offset.x < -150) {
            onSwipe('left');
        }
    };

    const handleLinearSearch = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSearchingLinear(true);
        // Simulate API call to Linear
        setTimeout(() => {
            setIsSearchingLinear(false);
            setLinearMatch({ id: "ENG-402", title: "API enrichment via third-party vendors" });
        }, 1500);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleFavorite?.();
    };

    return (
        <motion.div
            style={{ x, rotate, opacity, zIndex: isFront ? 10 : 0 }}
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileTap={isFront ? { scale: 0.98 } : {}}
            className={cn(
                "absolute inset-0 rounded-[32px] cursor-grab active:cursor-grabbing overflow-hidden border-2 border-zinc-800 bg-zinc-900 card-shadow",
                !isFront && "scale-95 translate-y-4 opacity-40 blur-[1px]"
            )}
        >
            {/* Visual Feedback Overlays */}
            <motion.div
                style={{ opacity: rightOverlayOpacity }}
                className="absolute inset-0 bg-green-500/10 pointer-events-none flex items-center justify-center border-4 border-green-500/50 rounded-[32px] z-20"
            >
                <div className="bg-green-500 text-white px-6 py-2 rounded-full flex items-center gap-2 font-bold transform -rotate-12 shadow-lg shadow-green-500/20">
                    <Check size={20} strokeWidth={3} /> To Backlog
                </div>
            </motion.div>

            <motion.div
                style={{ opacity: leftOverlayOpacity }}
                className="absolute inset-0 bg-red-500/10 pointer-events-none flex items-center justify-center border-4 border-red-500/50 rounded-[32px] z-20"
            >
                <div className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 font-bold transform rotate-12 shadow-lg shadow-red-500/20">
                    <Archive size={20} strokeWidth={3} /> Archive
                </div>
            </motion.div>

            {/* Card Content */}
            <div className="h-full flex flex-col p-8 select-none">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl shadow-inner">
                            {card.emoji}
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50">
                            <Layers size={12} className="text-zinc-400" />
                            <span className="text-xs font-semibold text-zinc-300">{card.mentions} mentions</span>
                        </div>
                    </div>
                    <button
                        onClick={handleFavoriteClick}
                        className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                            isFavorite
                                ? "bg-yellow-500/20 border border-yellow-500/40 text-yellow-500"
                                : "bg-zinc-800/50 border border-zinc-700/50 text-zinc-500 hover:text-yellow-500 hover:border-yellow-500/30"
                        )}
                    >
                        <Star size={16} className={isFavorite ? "fill-yellow-500" : ""} />
                    </button>
                </div>

                {/* AI Insight Badge */}
                <div className="mb-4 flex items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 tracking-tight">
                        <Sparkles size={10} /> Synthesized Cluster
                    </div>
                    <button
                        onClick={handleLinearSearch}
                        disabled={isSearchingLinear}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-[10px] font-bold text-zinc-400 hover:text-white tracking-tight transition-colors"
                    >
                        {isSearchingLinear ? <Loader2 size={10} className="animate-spin" /> : <Search size={10} />}
                        Check Linear Duplicates
                    </button>
                </div>

                {/* Linear Match Info */}
                <AnimatePresence>
                    {linearMatch && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="mb-4 overflow-hidden"
                        >
                            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-3">
                                <div className="text-xs font-bold text-orange-500 shrink-0">{linearMatch.id}</div>
                                <div className="text-[10px] text-zinc-400 truncate font-medium">Potential Match: {linearMatch.title}</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Title & Description */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white mb-3 tracking-tight leading-tight">
                        {card.title}
                    </h1>
                    <p className="text-base text-zinc-400 leading-relaxed font-medium line-clamp-4">
                        {card.summary}
                    </p>
                </div>

                {/* Tags & Footer */}
                <div className="mt-auto pt-4 border-t border-zinc-800/50">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {/* Type badge first */}
                        <span className={cn(
                            "px-2 py-0.5 rounded border text-[10px] font-bold tracking-tight",
                            card.type === 'bug' ? "text-red-400 border-red-500/20 bg-red-500/5" : "text-blue-400 border-blue-500/20 bg-blue-500/5"
                        )}>
                            {card.type}
                        </span>
                        {/* Other tags */}
                        {card.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-zinc-950/50 border border-zinc-800 text-[10px] font-medium text-zinc-500">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={() => onShowDetails(card)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-zinc-100 text-zinc-950 font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <Info size={18} /> View Convergence Detail
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
