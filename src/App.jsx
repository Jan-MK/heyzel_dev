import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from './context/ThemeContext.jsx';
import './App.scss'
import HorizontalMultiStep from "./pages/HorizontalMultiStep/HorizontalMultiStep.jsx";
import Home from "./pages/Home.jsx";
import Gsap from "./pages/GSAP/Gsap.jsx";
import Layout from "./components/Layout/Layout.jsx";
import JobForm from "./pages/JobForm/JobForm.jsx";
import {ReferenceProvider} from "./context/ReferenceContext.jsx";
import {ModalProvider} from "./context/ModalContext.jsx";
import {useWindowDimensions, WindowDimensionsProvider} from "./context/WindowDimensionsContext.jsx";
import Locations from "./components/Locations/Locations.jsx";
import Submitted from "./pages/JobForm/Submitted/Submitted.jsx";

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
                <ReferenceProvider>
                    <ModalProvider>
                        <WindowDimensionsProvider>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/test" element={<HorizontalMultiStep/>}/>
                                <Route path="/jobs" element={<JobForm/>}/>
                                <Route path="/gsap" element={<Gsap/>}/>
                                <Route path="/:modalId" element={<Home/>}/>
                                <Route path="/submitted" element={
                                    <Submitted show={true} answered={false} successful={false}/>
                                }/>
                            </Routes>
                        </WindowDimensionsProvider>
                    </ModalProvider>
                </ReferenceProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App

/*
Step 3: Navigate with Modal Indicator in URL
When creating links to open modals, ensure you update the URL accordingly:

jsx
Copy code
import { Link } from 'react-router-dom';

const SomeComponent = () => {
  return (
    <div>
      <Link to="/imprint">Impressum</Link>
      { Define other links as needed }
</div>
);
};
This Link will navigate to the URL /imprint, which according to our setup in Home, opens the Home component with the LegalModal open.
 */
