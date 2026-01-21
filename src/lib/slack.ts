export interface SlackMessage {
    text: string;
    user: string;
    ts: string;
}

export const fetchSlackMessages = async (channelId: string): Promise<SlackMessage[]> => {
    const token = import.meta.env.VITE_SLACK_TOKEN;
    if (!token) throw new Error('Slack token not found');

    try {
        const response = await fetch(`https://slack.com/api/conversations.history?channel=${channelId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (!data.ok) throw new Error(data.error || 'Failed to fetch Slack messages');

        return data.messages;
    } catch (error) {
        console.error('Slack Fetch Error:', error);
        throw error;
    }
};
