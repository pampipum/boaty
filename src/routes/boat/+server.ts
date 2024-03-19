// src/routes/boat/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { CLAUDE_API_KEY } from '$env/static/private';
import { BOAT_BROKER_PROMPT } from './prompts';
import { getSailboatByModel } from '$lib/server/database/sailboat-model';
import { json } from '@sveltejs/kit';

const maxTries = 3;

export const POST: RequestHandler = async ({ request }) => {
	const { data } = await request.json();
	console.log('Server received data:', data);

	let tries = 0;
	while (tries < maxTries) {
		try {
			const anthropic = new Anthropic({
				apiKey: CLAUDE_API_KEY
			});

			const response = await anthropic.messages.create({
				model: 'claude-instant-1.2',
				max_tokens: 1500,
				system: BOAT_BROKER_PROMPT,
				messages: [
					{
						role: 'user',
						content: `
                            Boat data:
                            ${JSON.stringify(data, null, 2)}`
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
			tries++;
			if (tries === maxTries) {
				return new Response('An error occurred while processing the request.', {
					status: 500
				});
			}
			console.log(`Retrying... (Attempt ${tries})`);
		}
	}
};

export const GET: RequestHandler = async ({ url }) => {
	const model = url.searchParams.get('model');

	if (model) {
		try {
			const sailboat = await getSailboatByModel(model);
			if (sailboat) {
				console.log(`Server: Fetched data for sailboat model ${model}`);
				return json(sailboat);
			} else {
				console.log(`Server: No data found for sailboat model ${model}`);
				return json({ message: 'Sailboat not found' }, { status: 404 });
			}
		} catch (e) {
			console.error(`Server: Failed to fetch sailboat data - ${e.message}`);
			return json({ message: 'Failed to fetch sailboat data' }, { status: 500 });
		}
	}

	return json({ message: 'No model provided' }, { status: 400 });
};
