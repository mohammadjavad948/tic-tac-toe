import {CSSProperties, FC} from "react";
import style from './titleAnimation.module.css';
import {useTransition, a} from "react-spring";

export const TitleAnimation: FC<{style?: CSSProperties}> = (props) => {

    const animation = useTransition([props.children], {
       from: {
           y: -40,
           opacity: 0
       },
       enter: {
           y: 0,
           opacity: 1
       },
       leave: {
           y: 40,
           opacity: 0
       }
    });

    return (
        <div className={style.container} style={props.style}>
            {animation((springStyle,item) => {
                return <a.div style={springStyle} className={style.item}>
                        {item}
                </a.div>;
            })}
        </div>
    )
}