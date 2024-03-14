import {useEffect, useTransition} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from './context/ThemeContext.jsx';
import './App.scss'
import Home from "./pages/Home.jsx";
import JobForm from "./pages/JobForm/JobForm.jsx";
import {ReferenceProvider} from "./context/ReferenceContext.jsx";
import {ModalProvider} from "./context/ModalContext.jsx";
import {WindowDimensionsProvider} from "./context/WindowDimensionsContext.jsx";
import {MobileMenuProvider} from "./context/MobileMenuContext.jsx";
import ReactLenis from "@studio-freight/react-lenis";

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

        updateFavicon(matchMedia);

        matchMedia.addEventListener('change', updateFavicon);

        return () => matchMedia.removeEventListener('change', updateFavicon);
    }, []);
}

function SmoothScroll({children}) {
    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    )
}


function App() {
    useDynamicFavicon()

    return (
        <Router>
            <ThemeProvider>
                <ReferenceProvider>
                    <ModalProvider>
                        <WindowDimensionsProvider>
                            <MobileMenuProvider>
                                <Routes>
                                    <Route path="/" element={
                                        <ReactLenis root>
                                            <Home/>
                                        </ReactLenis>
                                    }/>
                                    <Route path="/jobs" element={<JobForm/>}/>
                                    <Route path="/:modalId" element={<Home/>}/>
                                </Routes>
                            </MobileMenuProvider>
                        </WindowDimensionsProvider>
                    </ModalProvider>
                </ReferenceProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App
