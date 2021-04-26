import style from './askName.module.css';
import {Button, TextField, Typography} from "@material-ui/core";
import {useSpring, a} from 'react-spring';

export default function AskName(){

    const animation = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    })

    return (
        <a.div className={style.container} style={animation}>
            <Typography variant={"h6"}>Hi. What’s your name?</Typography>
            <div className={style.form}>
                <TextField label={"name"} variant={"outlined"}/>
                <Button variant={"contained"} color={"primary"}>Go</Button>
            </div>
        </a.div>
    )
}