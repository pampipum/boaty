// src/routes/boat/+page.server.ts
import { error } from '@sveltejs/kit';
import { getAllSailboats } from '$lib/server/database/sailboat-model';

export const load = async () => {
  try {
    const sailboats = await getAllSailboats();
    console.log(`Server: Fetched ${sailboats.length} sailboats`);
    return {
      sailboats, // Directly return the data without the `props` wrapper
    };
  } catch (e) {
    console.error(`Server: Failed to fetch sailboats - ${e.message}`);
    throw error(500, `Server: Failed to fetch sailboats`);
  }
};
