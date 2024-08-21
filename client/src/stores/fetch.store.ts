import { create } from "zustand";
import api from "../api/api";

export interface FetchStore {
  response: any;
  error: any;
  loading: boolean;
  messages: any;
  apiGet: (url: string) => Promise<void>;
  apiPost: (url: string, data: any) => Promise<void>;
}

export const useFetchStore = create<FetchStore>()((set) => ({
  response: null,
  error: null,
  loading: false,
  messages: null,

  // GET
  apiGet: async (url: string) => {
    set({ loading: true });
    try {
      const res = await api.get(url);
      set({ loading: false, response: res.data, error: null });
    } catch (error) {
      set({ loading: false, response: null, error });
    }
  },

  // POST
  apiPost: async (url: string, data: any) => {
    set({ loading: true });
    try {
      const res = await api.post(url, data);

      set({
        loading: false,
        response: res.data,
        messages: null,
        error: null,
      });
    } catch (error: any) {
      set({
        loading: false,
        response: null,
        error,
        messages: error.response.data.error,
      });
    }
  },
}));
