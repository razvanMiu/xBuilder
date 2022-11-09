import Api from 'xBuilder/helpers/Api/Api';
import { StateCreator, StoreApi } from 'zustand';

export interface ContentSlice {
  content: {
    readonly data: { [key: string]: any } | null;
    readonly error: { [key: string]: any } | null;
    setContentData: (data: { [key: string]: any } | null) => void;
    reset: () => void;
  };
  api?: Api;
}
const createContentSlice:
  | StateCreator<ContentSlice>
  | StoreApi<ContentSlice> = (set, get) => {
  return {
    content: {
      data: null,
      error: null,
      setContentData: (data) => {
        set({ content: { ...get().content, data } });
      },
      reset: () => {
        set({ content: { ...get().content, data: null } });
      },
    },
  };
};

export function resetContentSlice(get: StoreApi<ContentSlice>['getState']) {
  return { content: { ...get().content, data: null, error: null } };
}

export default createContentSlice as (
  set?: StoreApi<ContentSlice>['setState'],
  get?: StoreApi<ContentSlice>['getState'],
  api?: StoreApi<ContentSlice>,
) => ContentSlice;
