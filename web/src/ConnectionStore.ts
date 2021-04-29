import create from 'zustand';
import {combine} from "zustand/middleware";

export const useConnectionStore = create(
    combine(
        {show: true, message: 'connecting'},
        (set) => {
            return {
                show: () => {
                    set({show: true});
                },
                hide: () => {
                    set({show: true})
                },
                changeMessage: (m: string) => {
                    set({message: m})
                }
            }
        }
    )
);