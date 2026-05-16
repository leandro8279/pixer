export type SearchFieldDef =
  | { op: 'like' }
  | { op: 'exact' }
  | { op: 'boolean' }
  | { op: 'numeric' }
  | { op: 'relation_one'; field: string; nested_op?: 'like' | 'exact' }
  | { op: 'relation_many'; field: string; nested_op?: 'like' | 'exact' }
  /** Pivot table many-to-many: { relation: { some: { pivot: { field: value } } } } */
  | { op: 'relation_many_through'; pivot: string; field: string; nested_op?: 'like' | 'exact' };

export type SearchConfig = Record<string, SearchFieldDef>;

function buildClause(key: string, value: string, def: SearchFieldDef): Record<string, unknown> | null {
  const prismaKey = key.includes('.') ? key.split('.')[0] : key;

  switch (def.op) {
    case 'like':
      return { [prismaKey]: { contains: value, mode: 'insensitive' } };

    case 'exact':
      return { [prismaKey]: value };

    case 'boolean':
      return { [prismaKey]: value === '1' || value === 'true' };

    case 'numeric': {
      const n = Number(value);
      return isNaN(n) ? null : { [prismaKey]: n };
    }

    case 'relation_one': {
      const nestedVal = def.nested_op === 'like' ? { contains: value, mode: 'insensitive' } : value;
      return { [prismaKey]: { [def.field]: nestedVal } };
    }

    case 'relation_many': {
      const nestedVal = def.nested_op === 'like' ? { contains: value, mode: 'insensitive' } : value;
      return { [prismaKey]: { some: { [def.field]: nestedVal } } };
    }

    case 'relation_many_through': {
      const nestedVal = def.nested_op === 'like' ? { contains: value, mode: 'insensitive' } : value;
      return { [prismaKey]: { some: { [def.pivot]: { [def.field]: nestedVal } } } };
    }

    default:
      return null;
  }
}

/**
 * Converte a string `search` do padrão Marvel (ex: `name:foo;type.slug:bar`)
 * num fragmento `where` compatível com Prisma.
 *
 * - `searchJoin=and`  → `{ AND: [...cláusulas] }`
 * - `searchJoin=or`   → `{ OR:  [...cláusulas] }`
 *
 * Se `search` não contiver `:`, trata como `name:<search>` para compatibilidade
 * com chamadas legadas (busca livre por nome).
 *
 * Retorna `undefined` quando não há cláusulas válidas.
 */
export function parseSearchString(
  search: string | undefined,
  searchJoin: string | undefined,
  config: SearchConfig,
): Record<string, unknown> | undefined {
  if (!search?.trim()) return undefined;

  const raw = search.includes(':') ? search : `name:${search}`;
  const join = searchJoin?.toLowerCase() === 'or' ? 'or' : 'and';

  const clauses: Record<string, unknown>[] = [];

  for (const entry of raw.split(';')) {
    const colonIdx = entry.indexOf(':');
    if (colonIdx === -1) continue;

    const key = entry.slice(0, colonIdx).trim();
    const value = entry.slice(colonIdx + 1).trim();
    if (!key || !value) continue;

    const def = config[key];
    if (!def) continue;

    const clause = buildClause(key, value, def);
    if (clause) clauses.push(clause);
  }

  if (clauses.length === 0) return undefined;
  if (clauses.length === 1) return clauses[0];

  return join === 'or' ? { OR: clauses } : { AND: clauses };
}
