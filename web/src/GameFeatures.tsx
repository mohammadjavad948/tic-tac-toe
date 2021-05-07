import {usePlayerStore} from "./GameStore";
import {animated, useTransition} from "react-spring";
import {Icon, Typography} from "@material-ui/core";
import styles from "./game.module.css";

export default function GameFeatures({...props}){

    return <div {...props}>
        <Players />
    </div>
}


function Players(){

    const {players} = usePlayerStore();

    const transition = useTransition(
        players,
        {
            from: (item, index) => {
                return { y: index * 60, opacity: 0 }
            },
            leave: (item, index) => {
                return { y: index * 60, opacity: 0 }
            },
            enter: (item, index) => {
                return { y: index * 70, opacity: 1 }
            },
            update: (item, index) => {
                return { y: index * 70 }
            },
        }
    );

    return (
        <div style={{width: '100%', position: 'relative', height: '100%', overflowX: 'hidden', overflowY: 'auto'}}>
            <Typography variant={"h6"}>
                Players
            </Typography>
            {transition((style, item) => (
                <PlayerCard player={item} style={style}/>
            ))}
        </div>
    )
}

// @ts-ignore
function PlayerCard({player, style}){

    return (
        <animated.div className={styles.playerCard} style={{top: style.y.to((x: any) => (x + 28) + 'px'), opacity: style.opacity}}>
            <span className={styles.playerLogo}>
                {
                    player.role !== 'observer' ?
                        player.role :
                        <Icon>
                            visibility
                        </Icon>
                }
            </span>
            <span>{player.name}</span>
        </animated.div>
    )
}
