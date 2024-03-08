import { useRef } from 'react';
import ReactDOM from 'react-dom';
import classes from './Backdrop.module.scss';

function Backdrop({ children, onClick }) {
    const backdropRef = useRef(null);

    return ReactDOM.createPortal(
        <div ref={backdropRef} className={classes.backdrop} onClick={onClick}>
            {children}
        </div>,
        document.getElementById('modal-root')
    );
}

export default Backdrop;

