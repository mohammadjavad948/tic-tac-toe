import style from './askName.module.css';
import {Typography} from "@material-ui/core";

export default function AskName(){

    return (
        <div className={style.container}>
            <Typography variant={"h6"}>Hi. What’s your name?</Typography>
        </div>
    )
}