/*
import { useRef } from 'react';
import './backdrop.scss';

function Backdrop({children, reference, onClick }) {
    const backdropRef = useRef(null);

    return (
        <div
            ref={reference}
            className={"backdrop"}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            {children}
        </div>
    );
}

export default Backdrop;
*/


import { useRef } from 'react';
import ReactDOM from 'react-dom';
import './backdrop.scss';

function Backdrop({ children, onClick }) {
    const backdropRef = useRef(null);

    return ReactDOM.createPortal(
        <div ref={backdropRef} className="backdrop" onClick={onClick}>
            {children}
        </div>,
        document.getElementById('modal-root')
    );
}

export default Backdrop;

