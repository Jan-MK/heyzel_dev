import {useContext} from 'react';
import ThemeContext from '../../context/ThemeContext';
import classes from './ThemeSwitch.module.scss';
//import {IoMoonOutline, IoSunnyOutline} from "react-icons/io5";
import Icon from "../Icons/Icon.jsx";

const ThemeSwitch = ({isOnAbsolute}) => {
    const {mode, toggleMode} = useContext(ThemeContext);

    let IoMoonOutline = <Icon styling={`${classes.icon} ${classes.right}`} width={"18"} measure={"px"} type={"moon"}/>
    let IoSunnyOutline = <Icon styling={`${classes.icon} ${classes.left}`} width={"18"} measure={"px"} type={"sun"}/>

    return (
        <div className={classes.themeSwitch} onClick={isOnAbsolute ? toggleMode : () => {}}>
            <label htmlFor={'theme-switch'} className={classes.switch}>
                <input
                    id={"theme-switch"}
                    type="checkbox"
                    checked={mode === 'dark'}
                    onChange={isOnAbsolute ? () => {} : toggleMode}
                />
                <span className={`${classes.slider} ${classes.round} ${mode === 'dark' ? 'checked' : 'unchecked'}`}>
                    {mode === 'light' ? IoSunnyOutline : IoMoonOutline}
                </span>
                <span className={classes.visuallyHidden}>Toggle dark/light theme</span>
            </label>
        </div>
    );
};

export default ThemeSwitch;

