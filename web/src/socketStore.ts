import create from "zustand";
import {Socket} from "socket.io-client";

type State = {
    socket: Socket | null,
    set: (socket: Socket) => void
}

export const useSocketStore = create<State>(set => ({
    socket: null,
    set: (s) => set({socket: s})
}))