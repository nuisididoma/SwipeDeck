import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    MessageCircle,
    Zap,
    ArrowUpRight,
    ArrowDownRight,
    Target,
    Clock
} from 'lucide-react';
import { cn } from '../lib/utils';

const StatCard = ({ title, value, change, trend, icon: Icon }: any) => (
    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700">
                <Icon size={20} className="text-zinc-400" />
            </div>
            <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold  tracking-tight",
                trend === 'up' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            )}>
                {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {change}
            </div>
        </div>
        <div>
            <div className="text-zinc-500 text-xs font-semibold  tracking-normalr mb-1">{title}</div>
            <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
        </div>
    </div>
);

const ChartBar = ({ height, label, active }: { height: string, label: string, active?: boolean }) => (
    <div className="flex flex-col items-center gap-2 flex-1">
        <div className="w-full relative h-32 bg-zinc-800/30 rounded-t-lg overflow-hidden flex items-end">
            <motion.div
                initial={{ height: 0 }}
                animate={{ height }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={cn(
                    "w-full rounded-t-sm transition-colors",
                    active ? "bg-zinc-100" : "bg-zinc-700 hover:bg-zinc-600"
                )}
            />
        </div>
        <span className="text-[10px] font-medium text-zinc-500 ">{label}</span>
    </div>
);

export const Insights: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col gap-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-end">
                <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
                    <button className="px-4 py-1.5 rounded-lg bg-zinc-800 text-xs font-semibold text-zinc-100 shadow-sm">Last 30 Days</button>
                    <button className="px-4 py-1.5 rounded-lg text-xs font-semibold text-zinc-500 hover:text-zinc-300 transition-colors">Quarterly</button>
                </div>
            </div>

            {/* Primary Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Feedback" value="1,284" change="12%" trend="up" icon={MessageCircle} />
                <StatCard title="Active Segments" value="24" change="2%" trend="down" icon={Users} />
                <StatCard title="Clustering Accuracy" value="98.2%" change="4%" trend="up" icon={Target} />
                <StatCard title="Triage Velocity" value="14m" change="32%" trend="up" icon={Zap} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Feedback Volume Chart */}
                <div className="lg:col-span-2 p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-white">Feedback Inflow</h3>
                            <p className="text-sm text-zinc-500">Volume of incoming signals across all channels</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-zinc-100" />
                                <span className="text-[10px] text-zinc-400 font-bold ">This Month</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-zinc-700" />
                                <span className="text-[10px] text-zinc-400 font-bold ">Previous</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end gap-3 h-40">
                        <ChartBar height="40%" label="Mon" />
                        <ChartBar height="65%" label="Tue" />
                        <ChartBar height="45%" label="Wed" />
                        <ChartBar height="90%" label="Thu" active />
                        <ChartBar height="55%" label="Fri" />
                        <ChartBar height="30%" label="Sat" />
                        <ChartBar height="25%" label="Sun" />
                    </div>
                </div>

                {/* Sentiment Analysis */}
                <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-1">Sentiment Pulse</h3>
                    <p className="text-sm text-zinc-500 mb-8">AI analysis of user tone</p>

                    <div className="space-y-6 flex-1 flex flex-col justify-center">
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-green-500 font-bold ">Positive</span>
                                <span className="text-zinc-300 font-mono">64%</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '64%' }} transition={{ duration: 1.5 }} className="h-full bg-green-500" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-zinc-500 font-bold ">Neutral</span>
                                <span className="text-zinc-300 font-mono">28%</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '28%' }} transition={{ duration: 1.5, delay: 0.1 }} className="h-full bg-zinc-600" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-red-500 font-bold ">Negative</span>
                                <span className="text-zinc-300 font-mono">8%</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '8%' }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full bg-red-500" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-800">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs">
                            <TrendingUp size={14} className="text-green-500" />
                            <span>Sentiment improved by <span className="text-green-500 font-bold">4.2%</span> this week</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Feature Requests */}
                <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Top Feature Clusters</h3>
                        <button className="text-xs text-zinc-500 hover:text-zinc-300 font-semibold underline underline-offset-4">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: "API & Webhooks", count: 142, impact: "High" },
                            { name: "Dark Mode UI", count: 98, impact: "Medium" },
                            { name: "SSO Integration", count: 64, impact: "High" },
                            { name: "Mobile App", count: 52, impact: "High" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="text-sm font-bold text-zinc-500 font-mono">0{i + 1}</div>
                                    <div className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{item.name}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-bold text-zinc-500  tracking-tight">{item.impact} Impact</span>
                                    <div className="text-sm font-bold text-white">{item.count}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Action Summary */}
                <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-6 shadow-xl shadow-white/5">
                        <Zap size={24} className="text-zinc-950 fill-zinc-950" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">AI Strategic Recommendation</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        Based on the last 1,200 signals, there is a <span className="text-zinc-100 font-bold underline decoration-zinc-500 underline-offset-4">34% overlap</span> in Enterprise requests regarding SSO security and API stability.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                            <Clock size={16} className="text-blue-500 mt-0.5" />
                            <div>
                                <div className="text-xs font-bold text-blue-400  tracking-normalr mb-1">Immediate Action</div>
                                <p className="text-xs text-zinc-400 leading-normal">Prioritize "API Timeout" cluster. It affects 12 high-value accounts.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-800/50 border border-zinc-800/60">
                            <TrendingUp size={16} className="text-zinc-500 mt-0.5" />
                            <div>
                                <div className="text-xs font-bold text-zinc-400  tracking-normalr mb-1">Quarterly Focus</div>
                                <p className="text-xs text-zinc-400 leading-normal">Expand Mobile capabilities. User enthusiasm is at an all-time high.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
