import {lazy, Suspense, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from './context/ThemeContext.jsx';
import './App.scss'
import Home from "./pages/Home.jsx";
import {ReferenceProvider} from "./context/ReferenceContext.jsx";
import {ModalProvider} from "./context/ModalContext.jsx";
import {WindowDimensionsProvider} from "./context/WindowDimensionsContext.jsx";
import {MobileMenuProvider} from "./context/MobileMenuContext.jsx";
import ReactLenis from "@studio-freight/react-lenis";
import SkeletonJob from "./components/Skeleton/SkeletonJob.jsx";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallBack from "./components/Skeleton/ErrorFallBack.jsx";
import {CookieProvider} from "./context/CookieContext.jsx";
import {VerificationProvider} from "./context/VerificationContext.jsx";
import {useTranslation} from "react-i18next";
import { HelmetProvider } from 'react-helmet-async';


const JobForm = lazy(() => import("./pages/JobForm/JobForm.jsx"));

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

function App() {
    useDynamicFavicon()
    const { i18n } = useTranslation();

    useEffect(() => {
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <Router>
            <ThemeProvider>
                <HelmetProvider>
                <CookieProvider>
                    <VerificationProvider>
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
                                            <Route path="/jobs" element={
                                                <ErrorBoundary FallbackComponent={ErrorFallBack}>
                                                    <Suspense fallback={<SkeletonJob/>}>
                                                        <JobForm/>
                                                    </Suspense>
                                                </ErrorBoundary>
                                            }/>
                                            <Route path="/:modalId" element={
                                                <ReactLenis root>
                                                    <Home/>
                                                </ReactLenis>}/>
                                        </Routes>
                                    </MobileMenuProvider>
                                </WindowDimensionsProvider>
                            </ModalProvider>
                        </ReferenceProvider>
                    </VerificationProvider>
                </CookieProvider>
                </HelmetProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App
