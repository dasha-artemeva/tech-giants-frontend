import {RetrieveUserDto} from "../services/AuthService/schemas.ts";
import authService from "../services/AuthService";
import {create, StateCreator} from "zustand";
import {immer} from "zustand/middleware/immer";
import {createJSONStorage, devtools, persist} from "zustand/middleware";
import isEqual from "lodash.isequal";
import {storage} from "./storage.ts";
import zustymiddleware from 'zustymiddlewarets';

interface UserState{
    user?: RetrieveUserDto;
    refresh: () => Promise<void>;
}

const middlewares = (f) =>
    zustymiddleware(immer(persist(
        f,
        {
            name: 'user-store',
            storage: storage,
        }
    )));


export const useUserStore= create<
    UserState,
    [
        ["zustand/persist", UserState],
        ["zustand/immer", never],
        ["zustand/devtools", never],
    ]
>(middlewares(
    (set, get) => ({
        user: undefined,
        refresh: async () => {
            try{
                const response = await authService.me();
                if (!isEqual(response, get().user))
                    set((state) => {
                        state.user = response;
                    });
            } catch{
                if (get().user !== undefined)
                    set((state) => {
                        state.user = undefined;
                    });
            }
        }
    })
))
window.store = useUserStore;

export default useUserStore;

