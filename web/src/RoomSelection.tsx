import {Socket} from "socket.io-client";
import {FC, useEffect, useState} from "react";
import style from './roomSelection.module.css';
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    Fab,
    Icon,
    TextField,
    Typography,
    useTheme
} from "@material-ui/core";
import {useTransition, a, useSpring} from 'react-spring';
import {useBoardStore, useGameStore, usePlayerStore} from "./GameStore";
import {useDrag} from "react-use-gesture";

const AnimatedCard = a(Card)
const AnimatedFab = a(Fab)

interface Props{
    socket: Socket
}

export const RoomSelection: FC<Props> = (props) => {

    const [rooms, setRooms] = useState<string[]>([]);
    const {set: setGameStore} = useGameStore();
    const {set: setBoard} = useBoardStore();
    const {setPlayers} = usePlayerStore();

    const transitions = useTransition(
        rooms,
        {
            from: (item, index) => {
                return { y: index * 60, opacity: 0 }
            },
            leave: (item, index) => {
                return { y: index * 60, opacity: 0 }
            },
            enter: (item, index) => {
                return { y: index * 80, opacity: 1 }
            },
            update: (item, index) => {
                return { y: index * 80 }
            },
        }
    )
    useEffect(() => {
        props.socket.on('connect', () => {
            props.socket.emit('rooms:all', (res: any) => {
                setRooms(res.rooms)
            });

            props.socket.on('room:new', (name: string) => {
                setRooms(s => {
                    return [...s, name]
                })
            })

            props.socket.on('room:delete', (name: string) => {
                setRooms(s => {
                    const newList = s.filter(e => e !== name);

                    return newList
                })
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function create(name: any){
        props.socket.emit('room:create', name, (res: any) => {
            if (res.ok){
                setPlayers(res.room.players);
                setBoard(res.room.board)
                setGameStore(true);
            }
        })
    }

    function join(name: any){
        props.socket.emit('room:join', name, (res: any) => {
            setPlayers(res.room.players);
            setBoard(res.room.board);
            setGameStore(true);
        });
    }

    return (
        <div className={style.container}>
           <NewRoom create={create}/>
           <Typography variant={"h5"}>Rooms</Typography>
           <div className={style.roomsContainer} style={{height: (rooms.length + 1) * 90}}>
               {transitions((style, item) => (
                   <RoomCard join={join} name={item} style={style}/>
               ))}
           </div>
        </div>
    )
}

// @ts-ignore
function NewRoom({create}){

    const [open, setOpen] = useState(false);

    function fabClick(){
        setOpen(true);
    }

    function close(){
        setOpen(false);
    }

    const [animation, api] = useSpring(() => {
        return {x: 0, y: 0}
    })

    const bind = useDrag(state => {
        const {down, movement: [x, y]} = state;

        api.start({x: down ? x : 0, y: down ? y : 0})
    })

    return (
        <div>
            <div className={style.addFab}>
                <AnimatedFab {...bind()} style={animation} onClick={fabClick} color="primary" aria-label="add">
                    <Icon>
                        add
                    </Icon>
                </AnimatedFab>
            </div>
            <NewRoomDialog create={create} open={open} close={close}/>
        </div>
    )
}

// @ts-ignore
function NewRoomDialog(props) {
    const [name, setName] = useState('');

    function change(e: any){
        setName(e.target.value);
    }

    function handleEnter(event: any){
        if (event.keyCode !== 13) return null;

        if (name === '') return null;

        create();
    }

    function create(){
        props.create(name);
        close()
    }

    const { close, open } = props;

    const handleClose = () => {
        close()
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="simple-dialog-title">create new room</DialogTitle>
            <div className={style.form}>
                <TextField onKeyUp={handleEnter} label={"name"} onChange={change} variant={"outlined"}/>
                <Button variant={"contained"} onClick={create} disabled={name === ''} color={"primary"}>create</Button>
            </div>
        </Dialog>
    );
}

// @ts-ignore
function RoomCard({name, style, join}){

    const theme = useTheme();

    return (
        <AnimatedCard
            variant={"outlined"}
            style={{
                background: theme.palette.background.default,
                width: '100%',
                position: 'absolute',
                top: style.y.to((y: any) => y + 'px'),
                opacity: style.opacity
            }}>
            <CardContent style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Typography variant={"body1"}>{name}</Typography>
                <Button onClick={() => join(name)} color={"secondary"} variant={"contained"} size={"small"}>join</Button>
            </CardContent>
        </AnimatedCard>
    )
}