export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
export interface SuccessResponse<Data> {
  message: string
  data: Data
}

// syntax '-?' will remove property undefined of key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

export interface changePassword {
  confirm_password: string | undefined;
  new_password: string | undefined;
  password: string | undefined;
}

export interface GroupMemberInfo {
  group_id: string;
  user_phone: string;
  role: 'member' | 'admin' | 'owner';
  joined_at: string; // ISO date string
  status: number; // 1 = active
  name: string;
  email: string;
  avatar: string | null;
  user_status: string; // OFFLINE, ONLINE, etc.
}

export interface AddMembersBody {
  memberPhones: string[]
}




