import create from 'zustand';

const useStore = create((set) => ({
    possible: false,
    keys: [],
    setPossible: () => set((state) => ({ possible: true})),
    setKeys: (value) => set((state) => ({keys: value}))
}));

export default useStore;