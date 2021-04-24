export interface RoomInterface{
    id: string
    name: string
    xIsNext: boolean
    start: boolean
    players: {
        id: string
        name: string
        role: 'X' | 'O' | 'observer'
    }[]
    board: {
        step: number
        board: string[]
    }[]
}