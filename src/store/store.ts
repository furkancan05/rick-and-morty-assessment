import { create } from "zustand";
import { produce } from "immer";

// types
import { RickObject } from "@/src/types/types";

interface Store {
  ricks: RickObject[];
  search: string;
  selectedRicks: RickObject[];
  loading: boolean;
  error: string;
  continuation: string | undefined;

  setSearch: (value: string) => void; // search text
  setRicks: (ricks: RickObject[]) => void; // all ricks coming from search request (for pagination)
  addRicks: (ricks: RickObject[]) => void; // all ricks coming from search request (for pagination)
  selectRick: (rick: RickObject) => void; // select or remove a rick
  clearRicks: () => void; // clear all ricks coming from search request,
  setLoading: (condition: boolean) => void;
  setError: (error: string) => void;
  setContinuation: (value: string) => void;
}

const useAppStore = create<Store>()((set) => ({
  ricks: [],
  search: "",
  selectedRicks: [],
  loading: false,
  error: "",
  continuation: undefined,

  setSearch: (value) => set(() => ({ search: value })),
  setRicks: (ricks) => set((state) => ({ ricks: [...ricks] })),
  addRicks: (ricks) => set((state) => ({ ricks: [...state.ricks, ...ricks] })),
  selectRick: (rick) =>
    set(
      produce((state) => {
        const isSelected = !!state.selectedRicks.find(
          (sr: RickObject) => sr.id === rick.id
        );

        if (isSelected) {
          const filteredRicks = state.selectedRicks.filter(
            (sr: RickObject) => sr.id !== rick.id
          );

          state.selectedRicks = [...filteredRicks];
          return;
        }

        state.selectedRicks = [...state.selectedRicks, rick];
      })
    ),
  clearRicks: () => set(() => ({ ricks: [] })),
  setLoading: (condition) => set(() => ({ loading: condition })),
  setError: (error) => set(() => ({ error: error })),
  setContinuation: (value) => set(() => ({ continuation: value })),
}));

export default useAppStore;
