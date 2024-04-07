import {useContext} from 'react';
import ThemeContext from '../../context/ThemeContext';
import classes from './ThemeSwitch.module.scss';
import {IoMoonOutline, IoSunnyOutline} from "react-icons/io5";

const ThemeSwitch = ({isOnAbsolute}) => {
    const {mode, toggleMode} = useContext(ThemeContext);

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
                    {mode === 'light' ? <IoSunnyOutline className={`${classes.icon} ${classes.right}`} /> : <IoMoonOutline className={`${classes.icon} ${classes.left}`} />}
                </span>
                <span className={classes.visuallyHidden}>Toggle dark/light theme</span>
            </label>
        </div>
    );
};

export default ThemeSwitch;

