import {createContext, useContext, useState} from 'react';
import MobileMenu from "./MobileMenu/MobileMenu.jsx";

const MobileMenuContext = createContext();

export const useMobileMenu = () => useContext(MobileMenuContext);

export const MobileMenuProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openMenu = (e) => {
        e?.preventDefault()
        setIsOpen(true);
    };

    const closeMenu = (e) => {
        e?.preventDefault()
        setIsOpen(false)
    };

    return (
        <MobileMenuContext.Provider value={{ isOpen, openMenu, closeMenu}}>
            {children}
            <MobileMenu />
        </MobileMenuContext.Provider>
    );
};