import {FC} from "react";
import style from './titleAnimation.module.css';
import {useTransition, a} from "react-spring";

export const TitleAnimation: FC = (props) => {

    const animation = useTransition([props.children], {
       from: {
           y: -20,
           opacity: 0
       },
       enter: {
           y: 0,
           opacity: 1
       },
       leave: {
           y: 20,
           opacity: 0
       }
    });

    return (
        <div className={style.container}>
            {animation((springStyle,item) => {
                return <a.div style={springStyle} className={style.item}>
                        {item}
                </a.div>;
            })}
        </div>
    )
}