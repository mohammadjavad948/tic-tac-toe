import style from './container.module.css';
import AskName from "./AskName";
import {useNameStore} from "./nameStore";
import RoomSelection from "./RoomSelection";

export default function Container(){

    const {name} = useNameStore()

    function showComponent(){
        if (name === ''){
            return <AskName />
        }

        return <RoomSelection />
    }

    return (
        <div className={style.container}>
            {showComponent()}
        </div>
    )
}