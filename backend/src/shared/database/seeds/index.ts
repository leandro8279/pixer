import 'dotenv/config';
import { Pool } from 'pg';

import { seedBase } from './seedBase';
import { seedAuth } from './seedAuth';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host:     process.env.PGHOST     || process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.PGPORT || process.env.DB_PORT || '5432'),
  database: process.env.PGDATABASE || process.env.DB_DATABASE || 'mydatabase',
  user:     process.env.PGUSER     || process.env.DB_USERNAME  || 'myuser',
  password: process.env.PGPASSWORD || process.env.DB_PASSWORD  || 'password',
});

async function clearAll(): Promise<void> {
  console.log('🗑️  Limpando banco de dados...');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('TRUNCATE TABLE model_has_permissions RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE model_has_roles       RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE role_has_permissions  RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE user_profiles         RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE wallets               RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE users                 RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE permissions           RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE roles                 RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE languages             RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE settings              RESTART IDENTITY CASCADE');
    await client.query('COMMIT');
    console.log('   ✔ Banco de dados limpo com sucesso');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro ao limpar banco de dados:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function runSeeds() {
  await clearAll();

  try {
    const baseData = await seedBase(pool);
    console.log('   Base seed:', baseData);

    const authData = await seedAuth(pool);
    console.log('   Auth seed:', authData.users);

    console.log('\n✅ Todos os seeds concluídos com sucesso!');
  } catch (error) {
    console.error('❌ Seed falhou:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runSeeds();
