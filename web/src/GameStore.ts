import create from 'zustand';
import {combine} from "zustand/middleware";

export const useGameStore = create(
    combine(
        {inRoom: false},
        (set) => {
            return {
                set: (stat: boolean) => {
                    set({inRoom: stat})
                }
            }
        }
    )
);