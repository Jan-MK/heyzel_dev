import React from 'react';
import classes from './NavigationOptions.module.scss';

const NavigationOptions = ({ googleUrl, appleUrl }) => {

    return (
        <div className={classes.navigationOptions}>
            <a href={googleUrl} target="_blank" rel="noopener noreferrer">
                    via Google Maps
            </a>
            <a href={appleUrl} target="_blank" rel="noopener noreferrer">
                    via Apple Maps
            </a>
        </div>
    );
};

export default NavigationOptions;
