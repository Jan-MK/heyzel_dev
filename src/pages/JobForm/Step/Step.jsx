import React, {useEffect} from 'react';
import classes from './Step.module.scss'

function Step({ children }) {
    return (
        <div className={classes.stepWrapper} style={{}}>
            {children}
        </div>
    );
}

export default Step;