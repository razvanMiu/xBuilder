import merge from 'lodash/merge';
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

export const initializeStore = (preloadedState = {}) => {
  const api = new Api();

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
  // Server side code
  if (typeof window === 'undefined') {
    return () => initializeStore(serverInitialState);
  }
  // Client side code:
  store = store ?? initializeStore(serverInitialState);

  return () => store;
}
