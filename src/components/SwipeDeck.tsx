import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { type FeedbackCard, mockFeedback } from '../mockData';
import { SwipeCard } from './SwipeCard';
import { DetailsDrawer } from './DetailsDrawer';
import { Trophy, Archive as ArchiveIcon, LayoutList, ChevronRight, X, Check, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface SwipeDeckProps {
    backlogCount: number;
    archiveCount: number;
    onSwipeAction: (direction: 'left' | 'right', card: FeedbackCard) => void;
    onFinishReview: () => void;
}

export const SwipeDeck: React.FC<SwipeDeckProps> = ({
    backlogCount,
    archiveCount,
    onSwipeAction,
    onFinishReview
}) => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'feature' | 'bug'>('all');
    const [cards, setCards] = useState<FeedbackCard[]>(mockFeedback);
    const [lastDirection, setLastDirection] = useState<'left' | 'right'>('right');
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    const [selectedCard, setSelectedCard] = useState<FeedbackCard | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [hintActive, setHintActive] = useState(false);

    const filteredCards = useMemo(() => {
        return cards.filter(c => activeFilter === 'all' || c.type === activeFilter);
    }, [cards, activeFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHintActive(true);
            setTimeout(() => setHintActive(false), 2000);
        }, 1000);
        return () => clearTimeout(timer);
    }, [activeFilter]);

    const handleSwipe = (direction: 'left' | 'right') => {
        const currentCard = filteredCards[0];
        if (!currentCard) return;

        setLastDirection(direction);
        onSwipeAction(direction, currentCard);
        setCards(prev => prev.filter(c => c.id !== currentCard.id));
    };

    const toggleFavorite = (cardId: string) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(cardId)) {
                newFavorites.delete(cardId);
            } else {
                newFavorites.add(cardId);
            }
            return newFavorites;
        });
    };

    const showDetails = (card: FeedbackCard) => {
        setSelectedCard(card);
        setDrawerOpen(true);
    };

    const currentCard = filteredCards[0];

    return (
        <div className="relative w-full flex flex-col items-center p-4">
            {/* Global Filter Bar - 440px width */}
            <div className="w-[440px] flex items-stretch gap-0 p-1 rounded-2xl bg-zinc-900 border border-zinc-800 mb-8 z-40 shadow-2xl">
                <button
                    onClick={() => setActiveFilter('all')}
                    className={cn(
                        "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all",
                        activeFilter === 'all' ? "bg-zinc-100 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"
                    )}
                >
                    All Signals
                </button>
                <button
                    onClick={() => setActiveFilter('feature')}
                    className={cn(
                        "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all",
                        activeFilter === 'feature' ? "bg-zinc-100 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"
                    )}
                >
                    Features
                </button>
                <button
                    onClick={() => setActiveFilter('bug')}
                    className={cn(
                        "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all",
                        activeFilter === 'bug' ? "bg-zinc-100 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"
                    )}
                >
                    Bugs
                </button>
            </div>

            {/* Triage Area with Side Buttons - 440px card width */}
            <div className="relative flex items-center gap-6 mt-4">
                {/* Left Archive Button */}
                <button
                    onClick={() => currentCard && handleSwipe('left')}
                    disabled={!currentCard}
                    className="w-14 h-14 rounded-2xl bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500/20 hover:border-red-500/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                >
                    <X size={28} className="group-hover:scale-110 transition-transform" />
                </button>

                {/* Card Stack */}
                <div className="relative w-[440px] aspect-[4/5]">
                    <AnimatePresence mode="popLayout">
                        {filteredCards.length > 0 ? (
                            filteredCards.map((card, index) => (
                                index < 2 && (
                                    <motion.div
                                        key={card.id}
                                        layout
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={index === 0 && hintActive ? {
                                            scale: 1, opacity: 1,
                                            x: [0, 40, -40, 0],
                                            rotate: [0, 5, -5, 0],
                                        } : { scale: 1 - index * 0.05, opacity: 1, y: index * 10 }}
                                        exit={{ x: lastDirection === 'right' ? 400 : -400, opacity: 0, rotate: lastDirection === 'right' ? 30 : -30 }}
                                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                        className="absolute inset-0"
                                        style={{ zIndex: 10 - index }}
                                    >
                                        <SwipeCard
                                            card={card}
                                            isFront={index === 0}
                                            onSwipe={handleSwipe}
                                            onShowDetails={showDetails}
                                            isFavorite={favorites.has(card.id)}
                                            onToggleFavorite={() => toggleFavorite(card.id)}
                                        />
                                    </motion.div>
                                )
                            )).reverse()
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-800 rounded-[32px] bg-zinc-900/30"
                            >
                                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                                    <Trophy size={32} className="text-yellow-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Deck Complete!</h3>
                                <p className="text-xs text-zinc-500 max-w-[240px] mb-8 leading-relaxed">
                                    You've triaged all relevant signals for your role. Ready to review and hand off to the PM?
                                </p>
                                <div className="flex flex-col gap-3 w-full">
                                    <button
                                        onClick={onFinishReview}
                                        className="w-full py-4 rounded-2xl bg-zinc-100 text-zinc-950 text-xs font-black tracking-tight hover:bg-white transition-all flex items-center justify-center gap-2"
                                    >
                                        Review Results <ChevronRight size={14} />
                                    </button>
                                    <button
                                        onClick={() => setCards(mockFeedback)}
                                        className="w-full py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs font-bold hover:text-zinc-300 transition-all"
                                    >
                                        Reset Deck
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Backlog Button */}
                <button
                    onClick={() => currentCard && handleSwipe('right')}
                    disabled={!currentCard}
                    className="w-14 h-14 rounded-2xl bg-green-500/10 border-2 border-green-500/20 flex items-center justify-center text-green-500 hover:bg-green-500/20 hover:border-green-500/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                >
                    <Check size={28} className="group-hover:scale-110 transition-transform" />
                </button>
            </div>

            {/* Footer Area with Stats - 440px total width */}
            <div className="mt-16 w-[440px] grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 flex flex-col items-center gap-2 text-center">
                    <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <ArchiveIcon size={16} />
                    </div>
                    <div>
                        <div className="text-[9px] font-bold text-zinc-500 tracking-tight leading-none mb-1">Archive</div>
                        <div className="text-base font-bold text-white leading-none">{archiveCount}</div>
                    </div>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 flex flex-col items-center gap-2 text-center">
                    <div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                        <LayoutList size={16} />
                    </div>
                    <div>
                        <div className="text-[9px] font-bold text-zinc-500 tracking-tight leading-none mb-1">Backlog</div>
                        <div className="text-base font-bold text-white leading-none">{backlogCount}</div>
                    </div>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 flex flex-col items-center gap-2 text-center">
                    <div className="w-8 h-8 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                        <Star size={16} />
                    </div>
                    <div>
                        <div className="text-[9px] font-bold text-zinc-500 tracking-tight leading-none mb-1">Favorites</div>
                        <div className="text-base font-bold text-white leading-none">{favorites.size}</div>
                    </div>
                </div>
            </div>

            <DetailsDrawer
                card={selectedCard}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
        </div>
    );
};
