import { Pool, PoolClient } from 'pg';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export interface AuthData {
  permissions: Record<string, string>;
  roles: Record<string, string>;
  users: {
    admin: string;
    vendor1: string;
    vendor2: string;
    staff: string;
    customer1: string;
    customer2: string;
  };
}

const MODEL_TYPE = 'App\\Models\\User';
const GUARD      = 'api';

const PERM_NAMES = ['super_admin', 'store_owner', 'staff', 'customer'] as const;

export async function seedAuth(pool: Pool): Promise<AuthData> {
  console.log('02 🔐 Auth: permissões, roles e usuários...');

  const client: PoolClient = await pool.connect();

  try {
    await client.query('BEGIN');

    const hash = await bcrypt.hash('password', 10);
    const now  = new Date().toISOString();

    // ── Permissions ──────────────────────────────────────────────────────────
    const permIds: Record<string, string> = {};

    for (const name of PERM_NAMES) {
      const id = randomUUID();
      await client.query(
        `INSERT INTO permissions (id, name, guard_name, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $4)`,
        [id, name, GUARD, now],
      );
      permIds[name] = id;
    }

    // ── Roles ─────────────────────────────────────────────────────────────────
    const roleIds: Record<string, string> = {};

    for (const name of PERM_NAMES) {
      const id = randomUUID();
      await client.query(
        `INSERT INTO roles (id, name, guard_name, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $4)`,
        [id, name, GUARD, now],
      );
      roleIds[name] = id;
    }

    // Cada role recebe a permissão de mesmo nome
    for (const name of PERM_NAMES) {
      await client.query(
        `INSERT INTO role_has_permissions (permission_id, role_id)
         VALUES ($1, $2)`,
        [permIds[name], roleIds[name]],
      );
    }

    // ── Users ─────────────────────────────────────────────────────────────────
    type UserRow = { id: string; permName: string };

    type AvatarInput = { original: string; thumbnail: string } | null;

    async function createUser(
      name: string,
      email: string,
      bio: string,
      avatar: AvatarInput,
      totalPoints: number,
      availablePoints: number,
    ): Promise<string> {
      const userId    = randomUUID();
      const profileId = randomUUID();
      const walletId  = randomUUID();

      await client.query(
        `INSERT INTO users
           (id, name, email, password, "isActive", email_verified_at, created_at, updated_at)
         VALUES ($1, $2, $3, $4, true, $5, $6, $6)`,
        [userId, name, email, hash, now, now],
      );

      const avatarJson = avatar ? JSON.stringify({ id: null, ...avatar }) : null;

      await client.query(
        `INSERT INTO user_profiles (id, bio, customer_id, avatar, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $5)`,
        [profileId, bio, userId, avatarJson, now],
      );

      await client.query(
        `INSERT INTO wallets
           (id, total_points, points_used, available_points, customer_id, created_at, updated_at)
         VALUES ($1, $2, 0, $3, $4, $5, $5)`,
        [walletId, totalPoints, availablePoints, userId, now],
      );

      return userId;
    }

    const userRows: UserRow[] = [];

    const adminAvatar = {
      original:  'https://ui-avatars.com/api/?name=Admin+Marvel&background=0D8ABC&color=fff&size=200',
      thumbnail: 'https://ui-avatars.com/api/?name=Admin+Marvel&background=0D8ABC&color=fff&size=80',
    };

    const adminId     = await createUser('Admin Marvel',    'admin@marvel.com',     'Administrador da plataforma Marvel.',   adminAvatar, 0,   0);
    const vendor1Id   = await createUser('Vendor One',      'vendor1@marvel.com',   'Vendedor especializado em moda.',       null, 250, 250);
    const vendor2Id   = await createUser('Vendor Two',      'vendor2@marvel.com',   'Vendedor especializado em eletrônicos.', null, 180, 180);
    const staffId     = await createUser('Staff Member',    'staff@marvel.com',     'Membro da equipe de suporte.',          null, 0,   0);
    const customer1Id = await createUser('Alice Customer',  'customer1@marvel.com', 'Cliente frequente.',                    null, 500, 400);
    const customer2Id = await createUser('Bob Customer',    'customer2@marvel.com', 'Comprador ocasional.',                  null, 120, 120);

    userRows.push(
      { id: adminId,     permName: 'super_admin' },
      { id: vendor1Id,   permName: 'store_owner' },
      { id: vendor2Id,   permName: 'store_owner' },
      { id: staffId,     permName: 'staff'       },
      { id: customer1Id, permName: 'customer'    },
      { id: customer2Id, permName: 'customer'    },
    );

    // ── model_has_permissions + model_has_roles ───────────────────────────────
    for (const { id, permName } of userRows) {
      await client.query(
        `INSERT INTO model_has_permissions (permission_id, model_type, model_id)
         VALUES ($1, $2, $3)`,
        [permIds[permName], MODEL_TYPE, id],
      );

      await client.query(
        `INSERT INTO model_has_roles (role_id, model_type, model_id)
         VALUES ($1, $2, $3)`,
        [roleIds[permName], MODEL_TYPE, id],
      );
    }

    await client.query('COMMIT');

    console.log(`   ✔ ${PERM_NAMES.length} permissões criadas`);
    console.log(`   ✔ ${PERM_NAMES.length} roles criadas`);
    console.log(`   ✔ 6 usuários criados (admin, 2 vendors, staff, 2 customers)`);

    return {
      permissions: permIds,
      roles:       roleIds,
      users: {
        admin:     adminId,
        vendor1:   vendor1Id,
        vendor2:   vendor2Id,
        staff:     staffId,
        customer1: customer1Id,
        customer2: customer2Id,
      },
    };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Erro no seed auth:', error);
    throw error;
  } finally {
    client.release();
  }
}
