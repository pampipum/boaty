// Import necessary modules and types
import { eq } from 'drizzle-orm';
import db from '$lib/server/database/drizzle';
import { sailboatsTable } from '$lib/server/database/drizzle-schemas'; // Adjust this path as necessary

// Function to get all sailboats
export const getAllSailboats = async () => {
	console.log('Database: Querying for all sailboats');
	const sailboats = await db.select().from(sailboatsTable);
	console.log(`Database: Queried ${sailboats.length} sailboats`);
	return sailboats;
};

// Function to get a sailboat by model
export const getSailboatByModel = async (model: string) => {
	const sailboat = await db.select().from(sailboatsTable).where(eq(sailboatsTable.model, model));
	if (sailboat.length === 0) {
		return null;
	} else {
		return sailboat[0];
	}
};

// Function to get all sailboat models
export const getAllSailboatModels = async () => {
	console.log('Database: Querying for all sailboat models');
	const sailboatModels = await db.select({ model: sailboatsTable.model }).from(sailboatsTable);
	console.log(`Database: Queried ${sailboatModels.length} sailboat models`);
	return sailboatModels;
};
