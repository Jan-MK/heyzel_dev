import React, { createContext, useContext, useState, useEffect } from 'react';

const WindowDimensionsContext = createContext({
    width: undefined,
    height: undefined,
    isSmartphone: false,
    isTablet: false,
    isDesktop: false,
});

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    const isSmartphone = width <= 768;
    const isTablet = width > 768 && width <= 1070;
    const isDesktop = !isSmartphone && !isTablet;

    return {
        width,
        height,
        isSmartphone,
        isTablet,
        isDesktop,
    };
}

export function WindowDimensionsProvider({ children }) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <WindowDimensionsContext.Provider value={windowDimensions}>
            {children}
        </WindowDimensionsContext.Provider>
    );
}

export function useWindowDimensions() {
    return useContext(WindowDimensionsContext);
}