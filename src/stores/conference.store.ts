import {create, StateCreator} from "zustand";
import { immer } from 'zustand/middleware/immer'
import {ConferenceDto} from "../services/ConferenceService/schemas.ts";
import conferenceService from "../services/ConferenceService";
import {createJSONStorage, devtools, persist} from "zustand/middleware";
import isEqual from 'lodash.isequal';
import {storage} from "./storage.ts";

interface ConferenceState {
    conference?: ConferenceDto;
    refresh: () => Promise<void>;
}

const middlewares = (f) =>
    devtools(immer(persist(
        f,
        {
            name: 'conference-store',
            storage: storage,
        }
    )))

export const useConferenceStore = create<
    ConferenceState,
    [
        ["zustand/persist", ConferenceState],
        ["zustand/immer", never],
        ["zustand/devtools", never],
    ]
>(middlewares(
    (set, get) => ({
        conference: undefined,
        refresh: async () => {
            const conference = await conferenceService.get();
            if (!isEqual(conference, get().conference))
                set((state) => {
                    state.conference = conference;
                })
        }
    })
));

