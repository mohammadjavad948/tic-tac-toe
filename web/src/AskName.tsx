import style from './askName.module.css';
import {Button, TextField, Typography} from "@material-ui/core";

export default function AskName(){

    return (
        <div className={style.container}>
            <Typography variant={"h6"}>Hi. What’s your name?</Typography>
            <div>
                <TextField label={"name"} variant={"outlined"}/>
                <Button variant={"contained"} color={"primary"}>Go</Button>
            </div>
        </div>
    )
}