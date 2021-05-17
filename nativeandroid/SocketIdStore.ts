import create from "zustand";
import {combine} from "zustand/middleware";

export const useSocketIdStore = create(
    combine(
        {id: ''},
        (set) => {
            return {
                set: (stat: string) => {
                    set({id: stat})
                }
            }
        }
    )
);