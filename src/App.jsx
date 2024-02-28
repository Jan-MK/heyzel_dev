import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from './context/ThemeContext.jsx';
import './App.scss'
import HorizontalMultiStep from "./pages/HorizontalMultiStep/HorizontalMultiStep.jsx";
import Home from "./pages/Home.jsx";
import Gsap from "./pages/GSAP/Gsap.jsx";
import Layout from "./components/Layout/Layout.jsx";
import JobForm from "./pages/JobForm/JobForm.jsx";
import {NavbarProvider} from "./context/NavbarContext.jsx";

function useDynamicFavicon() {
    useEffect(() => {
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

        function updateFavicon(event) {
            const favicon = document.querySelector('link[rel="icon"]');
            if (event.matches) {
                // Dark mode
                favicon.href = '/heyzel-icon-lt.svg';
            } else {
                // Light mode
                favicon.href = '/heyzel-icon-lt.svg';
            }
        }

        // Initial check
        updateFavicon(matchMedia);

        // Listen for changes
        matchMedia.addEventListener('change', updateFavicon);

        // Clean up listener on unmount
        return () => matchMedia.removeEventListener('change', updateFavicon);
    }, []);
}


function App() {
    useDynamicFavicon()

    return (
        <Router>
            <ThemeProvider>
                <NavbarProvider>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/test" element={<HorizontalMultiStep/>}/>
                        <Route path="/jobs" element={<JobForm/>}/>
                        <Route path="/gsap" element={<Gsap/>}/>
                    </Routes>
                </NavbarProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App
