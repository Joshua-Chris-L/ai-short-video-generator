
/** @type {import('drizzle-kit').Config} */
export default {
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_O6oJFRSi0CfU@ep-shiny-snowflake-a5ogi6s6-pooler.us-east-2.aws.neon.tech/ai-short-database?sslmode=require',
  },
};