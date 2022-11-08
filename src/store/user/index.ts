import Cookies from 'js-cookie';
import { ReadonlyRequestCookies } from 'next/dist/server/app-render';
import Api from 'xBuilder/helpers/Api/Api';
import { StateCreator, StoreApi } from 'zustand';

export interface UserSlice {
  user: {
    readonly profile: { [key: string]: any } | null;
    readonly auth_token: string | null;
    setProfile: (profile: { [key: string]: any } | null) => void;
    setAuthToken: (auth_token: string | null) => void;
    removeAuthToken: () => void;
    renewAuthToken: () => void;
    reset: () => void;
  };
  api?: Api;
}

export async function getProfile(nextCookies?: ReadonlyRequestCookies) {
  const api = new Api(nextCookies);
  return await api.get('/user/profile');
}

const createUserSlice: StateCreator<UserSlice> | StoreApi<UserSlice> = (
  set,
  get,
) => {
  return {
    user: {
      profile: null,
      auth_token: null,
      getProfile: async () => {
        set({ user: { ...get().user, profile: await getProfile() } });
      },
      setProfile: (profile) => {
        set({ user: { ...get().user, profile } });
      },
      setAuthToken: (auth_token) => {
        if (auth_token) {
          Cookies.set('auth_token', auth_token);
        } else {
          Cookies.remove('auth_token');
        }
        set({ user: { ...get().user, auth_token } });
      },
      removeAuthToken: () => {
        Cookies.remove('auth_token');
        set({ user: { ...get().user, auth_token: null } });
      },
      renewAuthToken: async () => {
        const store = get();
        const { api } = store;
        const { setAuthToken } = store.user;
        const renew = await api?.post('/login/renew');
        setAuthToken(renew.access_token);
      },
      reset: () => {
        Cookies.remove('auth_token');
        set({ user: { ...get().user, profile: null, auth_token: null } });
      },
    },
  };
};

export function resetUserSlice(get: StoreApi<UserSlice>['getState']) {
  Cookies.remove('auth_token');
  return { user: { ...get().user, profile: null, auth_token: null } };
}

export default createUserSlice as (
  set?: StoreApi<UserSlice>['setState'],
  get?: StoreApi<UserSlice>['getState'],
  api?: StoreApi<UserSlice>,
) => UserSlice;
