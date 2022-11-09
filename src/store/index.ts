import merge from 'lodash/merge';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { useEffect, useLayoutEffect, useState } from 'react';
import Api from 'xBuilder/helpers/Api/Api';
import create, { StateCreator, StoreApi } from 'zustand';
import createContext from 'zustand/context';
import { devtools } from 'zustand/middleware';
import shallow from 'zustand/shallow';

import createContentSlice, { ContentSlice, resetContentSlice } from './content';
import createUserSlice, { resetUserSlice, UserSlice } from './user';

interface StoreState extends UserSlice, ContentSlice {
  api: Api;
  reset: () => void;
  [key: string]: any;
}

declare type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

declare type UseContextStore<S extends StoreApi<unknown>> = {
  <U>(
    selector: (state: ExtractState<S>) => U,
    equalityFn?: (a: U, b: U) => boolean,
  ): U;
};

let store: StoreApi<StoreState>;

const zustandContext = createContext<typeof store>();

const applyMiddlewares = (stateCreator: StateCreator<StoreState>) =>
  devtools(stateCreator);

export const Provider = zustandContext.Provider;
export const useStore: UseContextStore<StoreApi<StoreState>> = (selector) => {
  return zustandContext.useStore(selector, shallow);
};
export const useStoreBase = zustandContext.useStore;
export const useStoreApi = zustandContext.useStoreApi;

export const initializeStore = (
  preloadedState = {},
  cookies?: NextApiRequestCookies,
) => {
  const api = new Api(cookies);

  return create<StoreState>()(
    applyMiddlewares((set, get, ...args) => {
      const initialState = {
        api,
        ...createUserSlice(set, get, ...args),
        ...createContentSlice(set, get, ...args),
      };
      return {
        ...merge(initialState, preloadedState),
        reset: () => {
          set({ ...get(), ...resetUserSlice(get), ...resetContentSlice(get) });
        },
      };
    }),
  );
};

export function useCreateStore(serverInitialState?: Object | undefined) {
  const [mounted, setMounted] = useState(false);
  // Server side code: For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(serverInitialState);
  }
  // Client side code:
  // Next.js always re-uses same store regardless of whether page is a SSR or SSG or CSR type.
  const isReusingStore = Boolean(store);
  store = store ?? initializeStore(serverInitialState);
  // When next.js re-renders _app while re-using an older store, then replace current state with
  // the new state (in the next render cycle).
  // (Why next render cycle? Because react cannot re-render while a render is already in progress.
  // i.e. we cannot do a setState() as that will initiate a re-render)
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment (i.e. client or server)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
    // states on CSR page navigation or not. I have chosen not to, but if you choose to,
    // then add `serverInitialState = getDefaultInitialState()` here.
    if (mounted && serverInitialState && isReusingStore) {
      store.setState(
        {
          // re-use functions from existing store
          ...store.getState(),
          // but reset all other properties.
          ...serverInitialState,
        },
        true, // replace states, rather than shallow merging
      );
    }
    /* eslint-disable-next-line */
  }, [serverInitialState, isReusingStore]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setMounted(true);
  }, []);

  return () => store;
}
