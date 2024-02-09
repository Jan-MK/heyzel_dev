import { useEffect, useRef } from 'react';
import gsap from 'gsap';
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
