export interface SlackMessage {
    text: string;
    user: string;
    ts: string;
}

export const fetchSlackMessages = async (channelId: string): Promise<SlackMessage[]> => {
    // We now use a serverless function proxy to avoid CORS issues in the browser
    const response = await fetch(`/api/sync-slack?channelId=${channelId}`);

    const data = await response.json();
    if (!data.ok) throw new Error(data.error || 'Failed to fetch Slack messages');

    return data.messages;
};
