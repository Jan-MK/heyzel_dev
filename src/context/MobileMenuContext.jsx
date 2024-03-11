import React, {createContext, useContext, useRef, useState} from 'react';
import {gsap} from "gsap";
import MobileMenu from "./MobileMenu/MobileMenu.jsx";

const MobileMenuContext = createContext();

export const useMobileMenu = () => useContext(MobileMenuContext);

export const MobileMenuProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    // Assuming menuRef is managed here; adjust according to your setup


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