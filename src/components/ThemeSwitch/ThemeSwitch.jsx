import {useContext} from 'react';
import ThemeContext from '../../context/ThemeContext';
import classes from './ThemeSwitch.module.scss';
import {IoMoonOutline, IoSunnyOutline} from "react-icons/io5";

const ThemeSwitch = ({isOnAbsolute}) => {
    const {mode, toggleMode} = useContext(ThemeContext);

    return (
        <div className={classes.themeSwitch} onClick={isOnAbsolute ? toggleMode : () => {}}>
            <label className={classes.switch}>
                <input
                    type="checkbox"
                    checked={mode === 'dark'}
                    onChange={isOnAbsolute ? () => {} : toggleMode}
                />
                <span className={`${classes.slider} ${classes.round} ${mode === 'dark' ? 'checked' : 'unchecked'}`}>
                    {mode === 'light' ? <IoSunnyOutline className={`${classes.icon} ${classes.right}`} /> : <IoMoonOutline className={`${classes.icon} ${classes.left}`} />}
                </span>
            </label>
        </div>
    );
};

export default ThemeSwitch;

