import {useConnectionStore} from "./ConnectionStore";
import {useSpring, a} from "react-spring";


export function Connection(){

    const {show, message} = useConnectionStore();

    const animation = useSpring({
        bottom: show ? '20px' : '-50px'
    })

    return (
        <a.div style={{
            position: 'fixed',
            left: '20px',
            bottom: animation.bottom,
            padding: '10px 20px',
            border: '1px solid #0000005e',
            borderRadius: '5px'
        }}>
            {message}
        </a.div>
    )
}