import create, {State} from 'zustand';
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


interface PlayerStoreI extends State{
    players: {
        name: string
        id: string
        role: 'X' | 'O' | 'observer'
    }[],
}

export const usePlayerStore = create<PlayerStoreI>(set => {
    return {
        players: []
    }
})