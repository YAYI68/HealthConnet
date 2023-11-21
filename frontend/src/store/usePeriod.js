import { create } from "zustand";

const usePeriod = create((set) => ({
  appointTime: "",
  appointDate: "",
  setPeriod: ({ date, time }) =>
    set((state) => ({
      ...state,
      appointTime: (state.appointTime = time),
      appointDate: (state.appointDate = date),
    })),
}));

export default usePeriod;
