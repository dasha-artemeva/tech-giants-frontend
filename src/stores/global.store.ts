import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

export interface GlobalStore{
    authModalOpened: boolean;
    createParticipationRequestModalOpened: boolean;
    setAuthModalOpened: (value: boolean) => void;
    setCreateParticipationRequestModalOpened: (value: boolean) => void;
}

const middleware = (f) => devtools(immer(f));

export const useGlobalStore = create<GlobalStore>(middleware((set) => ({
    authModalOpened: false,
    createParticipationRequestModalOpened: false,
    setAuthModalOpened: (value) => set((state) => {
        state.authModalOpened = value;
    }),
    setCreateParticipationRequestModalOpened: (value) => set((state) => {
        state.createParticipationRequestModalOpened = value
    }),
})))
