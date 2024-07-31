/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex: import('knex').Knex): Promise<void> {
  await knex.schema.createTable('account', function (table) {
    table.increments('id').primary();
    table.date('registration_date');
    table.date('postponed_date');
    table.date('delete_date');
    table.date('sign_in_dates');
    table.string('app', 255);
    table.string('sign_in_method', 255);
    table.string('user_invitations', 255);
  });

  await knex.schema.createTable('onboarding', function (table) {
    table.increments('id').primary();
    table.integer('steps_completed');
    table.date('complete_date');
  });

  await knex.schema.createTable('locations', function (table) {
    table.increments('id').primary();
    table.string('continent', 255);
    table.string('country', 255);
    table.string('state', 255);
    table.string('city', 255);
  });

  await knex.schema.createTable('landing_page', function (table) {
    table.increments('id').primary();
    table.string('page_type', 255);
    table.integer('session_time');
    table.integer('number_of_page_visited');
  });

  await knex.schema.createTable('business_account', function (table) {
    table.increments('id').primary();
    table.integer('account_id').unsigned().references('id').inTable('account');
    table
      .integer('onboarding_id')
      .unsigned()
      .references('id')
      .inTable('onboarding');
    table.string('business_name', 255);
    table.string('business_type', 255);
    table.date('created_at');
    table.date('updated_at');
  });

  await knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.integer('account_id').unsigned().references('id').inTable('account');
    table
      .integer('location_id')
      .unsigned()
      .references('id')
      .inTable('location');
    table.string('language', 50);
    table.string('connections_data', 255);
    table
      .integer('onboarding_id')
      .unsigned()
      .references('id')
      .inTable('onboarding');
  });

  await knex.schema.createTable('career_pages', function (table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.date('delete_date');
    table.string('page_type', 255);
    table.string('public_private', 50);
    table.integer('views');
    table.integer('members');
  });

  await knex.schema.createTable('career_posts', function (table) {
    table.increments('id').primary();
    table.date('create_date');
    table.date('delete_date');
    table.integer('views');
    table.integer('comments');
    table.integer('likes');
    table
      .integer('career_page_id')
      .unsigned()
      .references('id')
      .inTable('career_pages');
  });

  await knex.schema.createTable('traffic', function (table) {
    table.increments('id').primary();
    table.string('traffic_source', 255);
    table
      .integer('location_id')
      .unsigned()
      .references('id')
      .inTable('location');
    table
      .integer('landing_page_id')
      .unsigned()
      .references('id')
      .inTable('landing_page');
    table.integer('user_id').unsigned().references('id').inTable('users');
  });

  await knex.schema.createTable('client', function (table) {
    table.increments('id').primary();
    table.string('current_plan', 255);
    table.boolean('free');
    table.boolean('premium_trial');
    table.boolean('premium');
    table.date('start_date');
    table.date('end_date');
    table
      .integer('business_account_id')
      .unsigned()
      .references('id')
      .inTable('business_account');
  });

  await knex.schema.createTable('billing', function (table) {
    table.increments('id').primary();
    table.date('payment_dates');
    table.decimal('payment_sum', 10, 2);
    table.boolean('failed_payment');
    table.date('failed_payment_date');
    table.decimal('failed_payment_sum', 10, 2);
    table.boolean('failed_payment_paused_account');
    table.decimal('billing_monthly_budget', 10, 2);
    table
      .integer('business_account_id')
      .unsigned()
      .references('id')
      .inTable('business_account');
  });

  await knex.schema.createTable('business_companies', function (table) {
    table.increments('id').primary();
    table
      .integer('business_account_id')
      .unsigned()
      .references('id')
      .inTable('business_account');
    table.date('create_date');
    table.date('update_date');
    table
      .integer('location_id')
      .unsigned()
      .references('id')
      .inTable('location');
    table.string('type', 255);
    table.integer('company_page_views');
    table.date('business_active_date');
    table.date('business_paused_date');
    table.date('business_deleted_date');
    table.integer('user_id').unsigned().references('id').inTable('users');
  });

  await knex.schema.createTable('job_page', function (table) {
    table.increments('id').primary();
    table.string('page_name', 255);
    table.text('page_description');
    table.date('create_date');
    table.date('update_date');
    table.integer('views');
    table.integer('applications');
    table.integer('user_id').unsigned().references('id').inTable('users');
  });

  await knex.schema.createTable('business_jobs', function (table) {
    table.increments('id').primary();
    table
      .integer('company_id')
      .unsigned()
      .references('id')
      .inTable('business_companies');
    table
      .integer('business_account_id')
      .unsigned()
      .references('id')
      .inTable('business_account');
    table.date('publish_date');
    table
      .integer('location_id')
      .unsigned()
      .references('id')
      .inTable('location');
    table
      .integer('job_page_id')
      .unsigned()
      .references('id')
      .inTable('job_page');
    table.boolean('hiring');
    table.date('job_active_date');
    table.date('job_paused_date');
    table.date('job_deleted_date');
    table.integer('user_id').unsigned().references('id').inTable('users');
  });

  await knex.schema.createTable('hiring', function (table) {
    table.increments('id').primary();
    table.integer('candidates');
    table.integer('active_candidates');
    table.integer('disqualified_candidates');
    table.integer('number_of_stages');
    table
      .integer('job_id')
      .unsigned()
      .references('id')
      .inTable('business_jobs');
  });

  await knex.schema.createTable('organizations', function (table) {
    table.increments('id').primary();
    table.string('organization_name', 255);
    table.string('organization_type', 255);
    table.date('create_date');
    table.date('update_date');
    table.integer('user_id').unsigned().references('id').inTable('users');
  });

  await knex.schema.createTable('pages', function (table) {
    table.increments('id').primary();
    table.string('page_name', 255);
    table.text('page_description');
    table.date('create_date');
    table.date('update_date');
    table.integer('views');
    table.integer('followers');
    table.integer('user_id').unsigned().references('id').inTable('users');
  });

  await knex.schema.createTable('posts', function (table) {
    table.increments('id').primary();
    table.string('post_type', 255);
    table.text('content');
    table.date('create_date');
    table.date('update_date');
    table.integer('views');
    table.integer('comments');
    table.integer('likes');
    table.integer('user_id').unsigned().references('id').inTable('users');
  });

  await knex.schema.createTable('invitations', function (table) {
    table.increments('id').primary();
    table.date('sent_date');
    table.date('accepted_date');
    table.string('status', 255);
    table.integer('user_id').unsigned().references('id').inTable('users');
  });
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex: import('knex').Knex): Promise<void> {
  await knex.schema.dropTableIfExists('hiring');
  await knex.schema.dropTableIfExists('business_jobs');
  await knex.schema.dropTableIfExists('job_page');
  await knex.schema.dropTableIfExists('business_companies');
  await knex.schema.dropTableIfExists('billing');
  await knex.schema.dropTableIfExists('client');
  await knex.schema.dropTableIfExists('traffic');
  await knex.schema.dropTableIfExists('career_posts');
  await knex.schema.dropTableIfExists('career_pages');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('business_account');
  await knex.schema.dropTableIfExists('landing_page');
  await knex.schema.dropTableIfExists('location');
  await knex.schema.dropTableIfExists('onboarding');
  await knex.schema.dropTableIfExists('account');
  await knex.schema.dropTableIfExists('organizations');
  await knex.schema.dropTableIfExists('pages');
  await knex.schema.dropTableIfExists('posts');
  await knex.schema.dropTableIfExists('invitations');
};
