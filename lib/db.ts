import 'server-only';
import { neon } from '@neondatabase/serverless';

// Fallback seguro para o build do GitHub Actions não quebrar caso a env venha vazia temporariamente
const connectionString = process.env.DATABASE_URL || '';

if (!connectionString && process.env.NODE_ENV === 'production') {
  console.warn('Aviso: DATABASE_URL não encontrada durante o build.');
}

export const sql = neon(connectionString);