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
    setPlayers: (player: any) => void,
    addPlayer: (player: any) => void,
    removePlayer: (id: string) => void
}

export const usePlayerStore = create<PlayerStoreI>(set => {
    return {
        players: [],
        setPlayers: (player) => {
            set({players: player})
        },
        addPlayer: (player) => {
            set(state => {
                return {players: state.players.concat(player)}
            })
        },
        removePlayer: (id) => {
            set(state => {
                return {players: state.players.filter(e => e.id !== id)}
            })
        }
    }
});


export const useBoardStore = create(
    combine(
        {board: new Array(9).fill(null)},
        (set) => {
            return {
                set: (stat: any[]) => {
                    set({board: stat})
                }
            }
        }
    )
);


export const useXIsNextStore = create(
    combine(
        {xIsNext: true},
        (set) => {
            return {
                set: (stat: boolean) => {
                    set({xIsNext: stat})
                }
            }
        }
    )
);