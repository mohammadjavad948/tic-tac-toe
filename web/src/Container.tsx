import style from './container.module.css';
import AskName from "./AskName";

export default function Container(){

    return (
        <div className={style.container}>
            <AskName />
        </div>
    )
}