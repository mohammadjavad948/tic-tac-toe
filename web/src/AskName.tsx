import style from './askName.module.css';
import {Button, TextField, Typography} from "@material-ui/core";
import {useSpring, a} from 'react-spring';
import {useNameStore} from "./nameStore";
import {useState} from "react";

export default function AskName(){

    const { setName: setNewName } = useNameStore()

    const [name, setName] = useState("");

    const animation = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    })

    function change(e: any){
        setName(e.target.value);
    }

    function save(){
        setNewName(name);
    }

    return (
        <a.div className={style.container} style={animation}>
            <Typography variant={"h6"}>Hi. What’s your name?</Typography>
            <div className={style.form}>
                <TextField label={"name"} variant={"outlined"} onChange={change}/>
                <Button variant={"contained"} onClick={save} color={"primary"}>Go</Button>
            </div>
        </a.div>
    )
}