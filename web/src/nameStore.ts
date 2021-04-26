import create from 'zustand';
import {combine} from "zustand/middleware";

export const useNameStore = create(
    combine(
        {name: localStorage.getItem('name') || ''},
        (set) => {
            return {
                setName: (name: string) => {
                    localStorage.setItem('name', name);
                    set({name});
                }
            }
        }
    )
);