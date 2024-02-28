import React, {useRef} from 'react';

// Create a context for the refs
const NavbarContext = React.createContext();

export function NavbarProvider({ children }) {
    const navbarRef = useRef(null);
    const logoRef = useRef(null);

    return (
        <NavbarContext.Provider value={{ navbarRef, logoRef }}>
            {children}
        </NavbarContext.Provider>
    );
};

export default NavbarContext;