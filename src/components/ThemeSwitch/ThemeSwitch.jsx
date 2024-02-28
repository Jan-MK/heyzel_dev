import {useContext} from 'react';
import ThemeContext from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import classes from './ThemeSwitch.module.scss';

const ThemeSwitch = () => {
    const {mode, toggleMode} = useContext(ThemeContext);

    const handleChange = (event) => {
        event.preventDefault(); // Prevent the form from submitting when clicking the input directly
        toggleMode(); // Toggle the theme
    };

    return (
        <div className={classes.themeSwitch} onClick={toggleMode}>
            <label className={classes.switch}>
                <input
                    type="checkbox"
                    checked={mode === 'dark'}
                    onChange={handleChange} // Use handleChange to manage changes
                    readOnly // Add readOnly since the actual change is handled by the div's onClick
                />
                <span className={`${classes.slider} ${classes.round} ${mode === 'dark' ? 'checked' : 'unchecked'}`}>
                    {mode === 'light' ? <FiSun className={`${classes.icon} ${classes.right}`} /> : <FiMoon className={`${classes.icon} ${classes.left}`} />}
                </span>
            </label>
        </div>
    );
};

export default ThemeSwitch;

