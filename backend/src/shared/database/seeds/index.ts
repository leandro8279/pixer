import 'dotenv/config';
import { Pool } from 'pg';

import { seedBase } from './seedBase';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  database: process.env.DB_DATABASE || 'mydatabase',
  user: process.env.DB_USERNAME || 'myuser',
  password: process.env.DB_PASSWORD || 'password',
});

async function clearAll(): Promise<void> {
  console.log('🗑️  Limpando banco de dados...');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('TRUNCATE TABLE languages RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE settings RESTART IDENTITY CASCADE');
    await client.query('COMMIT');
    console.log('Banco de dados limpo com sucesso!');
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
    console.log('Base seed completo:', baseData);
    // Continuar com outros seeds...
  } catch (error) {
    console.error('Seed falhou:', error);
  } finally {
    await pool.end();
  }
}

runSeeds();
