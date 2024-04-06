import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const CookieContext = createContext();

export const useCookie = () => useContext(CookieContext);

export const CookieProvider = ({ children }) => {
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        const allowCookie = cookies.get('heyzel_allow');
        setIsAllowed(allowCookie === true);
    }, []);

    useEffect(() => {
        console.log("User allowed cookies: ", isAllowed)
    }, [isAllowed]);

    const setAllow = (allowValue) => {
        cookies.set('heyzel_allow', allowValue);
        setIsAllowed(allowValue);

        if (!allowValue) {
            // Remove specific cookies based on your conditions
            const allCookies = cookies.getAll();
            Object.keys(allCookies).forEach(cookieName => {
                if (cookieName.includes('heyzel_')) {
                    cookies.remove(cookieName);
                }
            });
            window.location.reload();
        }
    };

    return (
        <CookieContext.Provider value={{ isAllowed, setAllow }}>
            {children}
        </CookieContext.Provider>
    );
};
