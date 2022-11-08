'use client';
import { Provider, useCreateStore } from 'xBuilder/store';

type StoreProvider = {
  children: React.ReactNode;
  initialState?: Object | undefined;
};

export function StoreProvider({ children, initialState }: StoreProvider) {
  const createStore = useCreateStore(initialState);

  return <Provider createStore={createStore}>{children}</Provider>;
}
