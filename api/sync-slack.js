export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get('channelId');
    const token = process.env.VITE_SLACK_TOKEN;

    if (!token) {
        return new Response(JSON.stringify({ ok: false, error: 'Slack token not found in environment' }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }

    try {
        const response = await fetch(`https://slack.com/api/conversations.history?channel=${channelId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ ok: false, error: error.message }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}
