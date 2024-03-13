import { pgTable, text, numeric, bigint, timestamp, boolean } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
	id: text('id').notNull().primaryKey(),
	provider: text('provider').notNull().default('email'),
	providerId: text('provider_id').notNull().default(''),
	email: text('email').notNull().unique(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	role: text('role').notNull().default('USER'),
	verified: boolean('verified').notNull().default(false),
	receiveEmail: boolean('receive_email').notNull().default(true),
	password: text('password'),
	token: text('token').unique(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const sessionTable = pgTable('sessions', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const sailboatsTable = pgTable('sailboats', {
	id: numeric('id').notNull().primaryKey(),
	model: text('model'),
	first_built: numeric('first_built'),
	link: text('link'),
	hull_type: text('hull_type'),
	rigging_type: text('rigging_type'),
	construction: text('construction'),
	builder: text('builder'),
	designer: text('designer'),
	type: text('type'),
	hp: text('hp'),
	sa_displ: text('sa_displ'),
	bal_displ: text('bal_displ'),
	disp_len: text('disp_len'),
	comfort_ratio: numeric('comfort_ratio'),
	capsize_screening_formula: numeric('capsize_screening_formula'),
	hull_speed: text('hull_speed'),
	pounds_per_inch_immersion: text('pounds_per_inch_immersion'),
	mast_height_from_dwl: text('mast_height_from_dwl'),
	sa_displ_calc: text('sa_displ_calc'),
	sailboat_links: text('sailboat_links'),
	designers: text('designers'),
	builders: text('builders'),
	loa_imperial: numeric('loa_imperial'),
	loa_metric: numeric('loa_metric'),
	lwl_imperial: numeric('lwl_imperial'),
	lwl_metric: numeric('lwl_metric'),
	beam_imperial: numeric('beam_imperial'),
	beam_metric: numeric('beam_metric'),
	displacement_imperial: numeric('displacement_imperial'),
	displacement_metric: numeric('displacement_metric'),
	ballast_imperial: text('ballast_imperial'),
	ballast_metric: text('ballast_metric'),
	max_draft_imperial: numeric('max_draft_imperial'),
	max_draft_metric: numeric('max_draft_metric'),
	sa_reported_imperial: numeric('sa_reported_imperial'),
	sa_reported_metric: numeric('sa_reported_metric'),
	sa_fore_imperial: text('sa_fore_imperial'),
	sa_fore_metric: text('sa_fore_metric'),
	sa_main_imperial: text('sa_main_imperial'),
	sa_main_metric: text('sa_main_metric'),
	sa_total_imperial: text('sa_total_imperial'),
	sa_total_metric: text('sa_total_metric'),
	est_forestay_length_imperial: text('est_forestay_length_imperial'),
	est_forestay_length_metric: text('est_forestay_length_metric'),
	i_imperial: text('i_imperial'),
	i_metric: text('i_metric'),
	j_imperial: text('j_imperial'),
	j_metric: text('j_metric'),
	p_imperial: text('p_imperial'),
	p_metric: text('p_metric'),
	e_imperial: text('e_imperial'),
	e_metric: text('e_metric'),
	fuel_imperial: text('fuel_imperial'),
	fuel_metric: text('fuel_metric'),
	water_imperial: text('water_imperial'),
	water_metric: text('water_metric')
});

export type User = typeof userTable.$inferInsert;
export type UpdateUser = Partial<typeof userTable.$inferInsert>;
export type Session = typeof sessionTable.$inferInsert;
export type Sailboat = typeof sailboatsTable.$inferInsert;
export type UpdateSailboat = Partial<typeof sailboatsTable.$inferInsert>;
