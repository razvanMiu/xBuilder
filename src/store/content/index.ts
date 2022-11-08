// import Cookies from 'js-cookie';
// import { ReadonlyRequestCookies } from 'next/dist/server/app-render';
import Api from 'xBuilder/helpers/Api/Api';
import { StateCreator, StoreApi } from 'zustand';

export interface ContentSlice {
  content: {
    readonly properties: { [key: string]: any } | null;
    setProperties: (properties: { [key: string]: any } | null) => void;
    reset: () => void;
  };
  api?: Api;
}
const createContentSlice:
  | StateCreator<ContentSlice>
  | StoreApi<ContentSlice> = (set, get) => {
  return {
    content: {
      properties: null,
      setProperties: (properties) => {
        set({ content: { ...get().content, properties } });
      },
      reset: () => {
        set({ content: { ...get().content, properties: null } });
      },
    },
  };
};

export function resetContentSlice(get: StoreApi<ContentSlice>['getState']) {
  return { content: { ...get().content, properties: null } };
}

export default createContentSlice as (
  set?: StoreApi<ContentSlice>['setState'],
  get?: StoreApi<ContentSlice>['getState'],
  api?: StoreApi<ContentSlice>,
) => ContentSlice;
