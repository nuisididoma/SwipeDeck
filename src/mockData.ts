export interface FeedbackCard {
    id: string;
    type: 'feature' | 'bug';
    emoji: string;
    title: string;
    summary: string;
    mentions: number;
    users: { name: string; avatar: string }[];
    tags: string[];
    author?: string;
    time?: string;
    competitor?: {
        name: string;
        featureMatch: boolean;
    };
    evidence: {
        source: string;
        text: string;
        time: string;
    }[];
}

export const mockFeedback: FeedbackCard[] = [
    {
        id: "1",
        type: "feature",
        emoji: "🏦",
        title: "Direct IRS E-File Integration",
        summary: "Users are requesting a more streamlined way to e-file directly to the IRS from within the platform, bypassing third-party bridges to reduce latency and security risks.",
        mentions: 124,
        users: [
            { name: "CPA Mark", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark" },
            { name: "Linda S.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda" },
            { name: "TaxPro Inc", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TaxPro" },
        ],
        tags: ["Critical", "API", "IRS"],
        competitor: { name: "TurboTax", featureMatch: true },
        evidence: [
            { source: "Zendesk #4410", text: "Why do I have to export a CSV to file? Can we just hit 'Submit' to IRS?", time: "1h ago" },
            { source: "Slack #tax-ops", text: "Enterprise firms are asking for direct IRS API status tracking.", time: "4h ago" },
        ]
    },
    {
        id: "2",
        type: "bug",
        emoji: "📐",
        title: "Incorrect Section 179 Depreciation Calc",
        summary: "Reported discrepancy in the 2024 Section 179 expense deduction limit. AI is calculating based on 2023 thresholds ($1.16M vs $1.22M).",
        mentions: 89,
        users: [
            { name: "Accountant Dave", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dave" },
        ],
        tags: ["Bug", "High Priority", "Calculation"],
        evidence: [
            { source: "Twitter", text: "@TaxGo_App your depreciation math is off for 2024 returns. Please fix!", time: "30m ago" },
            { source: "In-App Feedback", text: "The system is capping Section 179 too early. Check 2024 IRS updates.", time: "2h ago" },
        ]
    },
    {
        id: "3",
        type: "feature",
        emoji: "🚗",
        title: "AI Mileage Log Reconciliation",
        summary: "Users want the AI to automatically reconcile Uber/Lyft mileage logs with bank statements to auto-generate Form 2106 deductions.",
        mentions: 45,
        users: [
            { name: "Gary V.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gary" },
            { name: "Uber Driver Assoc", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Uber" },
        ],
        tags: ["AI", "Automation", "Form 2106"],
        competitor: { name: "QuickBooks", featureMatch: false },
        evidence: [
            { source: "Reddit r/TaxPro", text: "TaxGo needs a better way to handle gig worker mileage.", time: "1d ago" },
        ]
    },
    {
        id: "4",
        type: "feature",
        emoji: "📜",
        title: "State-Specific K-1 Auto-Import",
        summary: "Large firms need faster state-level K-1 processing, specifically for NY and CA. Currently requires heavy manual data entry.",
        mentions: 67,
        users: [
            { name: "Sarah Corp", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        ],
        tags: ["Reporting", "K-1", "State Tax"],
        evidence: [
            { source: "Email", text: "Processing 500 NY K-1s is taking hours. Help!", time: "2d ago" },
        ]
    },
    {
        id: "5",
        type: "bug",
        emoji: "🛑",
        title: "Duplicate 1099-NEC Generation",
        summary: "System is generating duplicate 1099-NEC forms when the vendor has multiple bank accounts linked. Risk of misreporting to the IRS.",
        mentions: 34,
        users: [
            { name: "Office Mgr", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Office" },
        ],
        tags: ["Bug", "Urgent", "Compliance"],
        evidence: [
            { source: "Slack #support", text: "URGENT: A client sent two 1099s to the same contractor. IRS will flag this.", time: "45m ago" },
        ]
    },
    {
        id: "6",
        type: "feature",
        emoji: "🏗️",
        title: "Opportunity Zone Investment Tracker",
        summary: "High-net-worth clients need a dashboard to track QOF (Qualified Opportunity Fund) investments for deferral tracking.",
        mentions: 22,
        users: [
            { name: "Investor Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Inv" },
        ],
        tags: ["Strategic", "Wealth Management"],
        competitor: { name: "Addepar", featureMatch: true },
        evidence: [
            { source: "Interview", text: "We need a way to track reinvestment timelines for tax deferrals.", time: "1w ago" },
        ]
    }
];
