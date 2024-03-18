// src/routes/boat/+page.server.ts
import { error } from '@sveltejs/kit';
import { getAllSailboatModels } from '$lib/server/database/sailboat-model';

export const load = async () => {
	try {
		const sailboatModels = await getAllSailboatModels();
		console.log(`Server: Fetched ${sailboatModels.length} sailboat models`);
		return {
			sailboatModels
		};
	} catch (e) {
		console.error(`Server: Failed to fetch sailboat models - ${e.message}`);
		throw error(500, `Server: Failed to fetch sailboat models`);
	}
};
