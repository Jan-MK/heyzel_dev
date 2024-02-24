import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './App.scss'
import HorizontalMultiStep from "./pages/HorizontalMultiStep/HorizontalMultiStep.jsx";
import Home from "./pages/Home.jsx";
import JobFormOld from "./pages/JobFormOld/JobFormOld.jsx";
import Gsap from "./pages/GSAP/Gsap.jsx";
import Layout from "./components/Layout/Layout.jsx";
import JobForm2Nd from "./pages/JobForm2nd/JobForm2nd.jsx";
import JobForm2nd from "./pages/JobForm2nd/JobForm2nd.jsx";
import JobForm from "./pages/JobForm/JobForm.jsx";

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
                    <Routes>
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route path="/test" element={<HorizontalMultiStep />} />
                        <Route path="/jobs" element={<JobForm />} />
                        <Route path="/jobs2" element={<JobForm2nd />} />
                        <Route path="/jobs3" element={<JobFormOld />} />
                        <Route path="/gsap" element={<Gsap />} />
                    </Routes>
            </ThemeProvider>
        </Router>
    );
}

export default App
