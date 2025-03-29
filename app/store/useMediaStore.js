import { create } from "zustand";

const useMediaStore = create((set) => ({
  media: null, // Uploaded media URL
  setMedia: (url) => set({ media: url }),

  width: 400,
  height: 300,
  setDimensions: (width, height) => set({ width, height }),

  x: 50,
  y: 50,
  setPosition: (x, y) => set({ x, y }),

  startTime: 0,
  endTime: 10,
  setTimeRange: (start, end) => set({ startTime: start, endTime: end }),

  currentTime: 0,
  setCurrentTime: (time) => set({ currentTime: time }),
}));

export default useMediaStore;
