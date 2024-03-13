import type { RequestHandler } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { CLAUDE_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { text } = await request.json();
	console.log('Server request:', text);

	try {
		const anthropic = new Anthropic({
			apiKey: CLAUDE_API_KEY
		});

		const response = await anthropic.messages.create({
			model: 'claude-instant-1.2',
			max_tokens: 200,
			messages: [
				{
					role: 'user',
					content: `Check if the provided boat listing text mentions any of the following points:
                        1. Sails
                        2. Standing Rigging
                        3. Anchors
                        4. Running Rigging
                        5. Bottom Job
                        6. Dinghy
                        7. Engine
                        8. Life Raft
                        9. Chain
                        10. EPIRB

                        For each point, if it is mentioned, provide the specific text that mentions it.

                        Boat listing text:
                        ${text}`
				}
			]
		});

		console.log('Server response:', response);

		return new Response(JSON.stringify(response), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('Error:', error);
		return new Response('An error occurred while processing the request.', {
			status: 500
		});
	}
};
