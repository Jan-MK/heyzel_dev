import {createContext, useEffect, useState} from "react";
import Cookies from 'universal-cookie';

const ThemeContext = createContext()

export function ThemeProvider({children}) {
    const cookies = new Cookies();
    const [mode, setMode] = useState('light');

    useEffect(() => {
        // Check if there's a 'heyzel_mode' cookie
        const modeCookie = cookies.get('heyzel_mode');

        // If the cookie exists and has a valid value, use it
        if (modeCookie && (modeCookie === 'dark' || modeCookie === 'light')) {
            setMode(modeCookie);
            cookies.set('heyzel_mode', `${modeCookie}`, {path: '/'})
            document.documentElement.setAttribute('data-theme', `${modeCookie}`);
        } else {
            // 2. Check user/browser settings for color scheme
            const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (userPrefersDark) {
                setMode('dark');
                cookies.set('heyzel_mode', 'dark', {path: '/'})
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                setMode('light');
                cookies.set('heyzel_mode', 'light', {path: '/'})
                document.documentElement.setAttribute('data-theme', 'light');
            }
        }
    }, []);

    function toggleTheme(e) {
        e?.preventDefault()
        setMode(() => {
            const newMode = mode === 'light' ? 'dark' : 'light';
            cookies.set('heyzel_mode', newMode, {path: '/'})
            document.documentElement.setAttribute('data-theme', `${newMode}`);
            return newMode
        })
    }

    return (
        <ThemeContext.Provider value={{
            mode: mode,
            toggleMode: toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;