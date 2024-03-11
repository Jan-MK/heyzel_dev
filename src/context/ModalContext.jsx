import {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import Modal from './Modal/Modal.jsx';
import {useNavigate} from "react-router-dom";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const navigate = useNavigate()
    const [modalContent, setModalContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showUpArrow, setShowUpArrow] = useState(false);
    const [showDownArrow, setShowDownArrow] = useState(false);
    const contentScrollRef = useRef(null);
    const [paramOnClose, setParamOnClose] = useState(false)

    const openModal = (content, withParam) => {
        setModalContent(content);
        setShowModal(true);
        setParamOnClose(withParam);
    };
    const closeModal = () => {
        if (paramOnClose) {
            setParamOnClose(false);
            navigate("/", { replace: true });
        }
        setShowModal(false);
        setShowUpArrow(false);
        setShowDownArrow(false);
    };

    const checkScrollability = useCallback(() => {
        if (!contentScrollRef.current) return;

        const wrapper = contentScrollRef.current;
        const isScrollable = wrapper.scrollHeight > wrapper.clientHeight;
        const isScrolledToTop = wrapper.scrollTop === 0;
        const isScrolledToBottom = wrapper.scrollHeight - wrapper.scrollTop <= wrapper.clientHeight;
        setShowUpArrow(isScrollable && !isScrolledToTop);
        setShowDownArrow(isScrollable && !isScrolledToBottom);
    }, []);

    useEffect(() => {
        const scrollContainer = contentScrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScrollability, { passive: true });
            checkScrollability();
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', checkScrollability);
            }
        };
    }, [checkScrollability]);

    return (
        <ModalContext.Provider  value={{ openModal, closeModal, paramOnClose, showUpArrow, showDownArrow, contentScrollRef }}>
            {children}
            <Modal showModal={showModal} closeModal={closeModal} content={modalContent} />
        </ModalContext.Provider>
    );
};
