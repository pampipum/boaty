// src/routes/boat/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { CLAUDE_API_KEY } from '$env/static/private';
import { BOAT_BROKER_PROMPT } from './prompts';

export const POST: RequestHandler = async ({ request }) => {
	const { data } = await request.json();
	console.log('Server request:', data);

	try {
		const anthropic = new Anthropic({
			apiKey: CLAUDE_API_KEY
		});

		const response = await anthropic.messages.create({
			model: 'claude-instant-1.2',
			max_tokens: 2000, // Increased max_tokens value
			system: BOAT_BROKER_PROMPT,
			messages: [
				{
					role: 'user',
					content: `
                        Boat data:
                        ${JSON.stringify(data, null, 2)}` // Stringify the data object for better formatting
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