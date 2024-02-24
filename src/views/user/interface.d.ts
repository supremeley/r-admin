import type { User } from '@/api/user/interface';

export type UserTableModel = User & { age?: number | null };
