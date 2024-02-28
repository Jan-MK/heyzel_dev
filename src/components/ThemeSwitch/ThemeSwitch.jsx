import {useContext} from 'react';
import ThemeContext from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import classes from './ThemeSwitch.module.scss';

const ThemeSwitch = () => {
    const {mode, toggleMode} = useContext(ThemeContext);

    return (
        <div className={classes.themeSwitch} onClick={toggleMode}>
            <label className={classes.switch}>
                <input type="checkbox" checked={mode === 'dark'} />
                <span className={`${classes.slider} ${classes.round} ${mode === 'dark' ? 'checked' : 'unchecked'}`}>
                    {mode === 'light' ? <FiSun className={`${classes.icon} ${classes.right}`} /> : <FiMoon className={`${classes.icon} ${classes.left}`} />}
                </span>
            </label>
        </div>
    );
};

export default ThemeSwitch;

