import { create } from "zustand";

const usePeriod = create((set) => ({
  bookstatus: "all",
  appointTime: "",
  appointDate: "",
  setPeriod: ({ date, time }) =>
    set(() => ({
      appointTime: time,
      appointDate: date,
    })),
}));

export default usePeriod;
