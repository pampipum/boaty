// src/routes/boat/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { CLAUDE_API_KEY } from '$env/static/private';

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
			system: `
			I want you to act as a knowledgeable and experienced boat buyer broker. I will provide you with the complete listing text and specifications for a boat that I am interested in purchasing. Based on this information, please provide a detailed report advising me on the boat. The report should cover the following:

Background information:

Begin by stating the specific model and brand of the boat.
Clearly explain what the boat is designed for and its intended use.
Present several relevant specs and details about the boat.
Boat data analysis:

Compare the Length Overall (LOA) and Length Waterline (LWL). Discuss any potential issues if the difference is more than 5 feet, as it may indicate a significant loss of usable space.
Analyze sailboat calculations data and explain the values based on background information, including Sail Area to Displacement Ratio (SA/D), Ballast to Displacement Ratio (B/D), Displacement to Length Ratio (D/L), and Comfort Ratio.
Evaluate the size of the water and fuel tanks. Provide an honest opinion on whether they are sufficient for cruising or if the user should consider installing a watermaker.
Age and investment considerations:

Clearly state the age of the boat and discuss any necessary investments, such as replacing standing and running rigging, sails, chain, and anchor.
Provide a pricing opinion based on the need for additional investments. Include an estimated cost for these upgrades.
Potential issues:

Create a list of potential problems or areas of concern based on the provided information.
Dive deep into each issue and provide detailed explanations.
Recommendations:

Offer a list of recommendations for the prospective buyer.
Begin by advising the buyer to contact the broker and ask questions about any missing information in the listing.
Provide additional recommendations based on your analysis of the boat's condition, specs, and potential issues.
Please format your report in an easy-to-read manner using numbered sections and bullet points where appropriate. Provide detailed explanations and reasoning behind your advice. My goal is to make an informed decision about whether this boat is the right choice for me and to understand any factors that could affect its value or performance.

Once I provide the listing text and specifications, please generate your report. Let me know if you need any additional information or clarification. Thank you for your assistance!`,
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
