import {createContext, useRef} from 'react';

const ReferenceContext = createContext();

export function ReferenceProvider({ children }) {
    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const menuContainerRef = useRef(null);
    const locationsHeadingRef = useRef(null);

    return (
        <ReferenceContext.Provider value={{ navbarRef, logoRef, menuContainerRef, locationsHeadingRef }}>
            {children}
        </ReferenceContext.Provider>
    );
}

export default ReferenceContext;