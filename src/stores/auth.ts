import auth from '@/services/auth.service';
import AuthService from '@/services/auth.service';

import { defineStore } from 'pinia';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export interface User {
  firstName: string;
  lastName: string;
  roles: Roles[];
}
export interface AuthState {
  user: User | null;
  pending: boolean;
  finished: boolean;
}

const useAuthStore = defineStore({
  id: 'auth',
  state: () =>
    ({
      user: null,
      pending: false,
      finished: false,
    } as AuthState),
  getters: {},
  actions: {
    async getCurrentUser() {
      this.pending = true;
      this.finished = false;

      const user = await AuthService.getCurrentUser();

      this.finished = true;
      this.user = user;
      this.pending = false;
    },

    setUser(user: User | null) {
      this.user = user;
      this.finished = true;
      this.pending = false;
    },

    async logout(): Promise<void> {
      await auth.logout();
    },
  },
});

export default useAuthStore;
