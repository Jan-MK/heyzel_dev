import { createContext, useState, useEffect } from 'react';
const VerificationContext = createContext();

export const VerificationProvider = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);


    return (
        <VerificationContext.Provider value={{ isVerified, setIsVerified }}>
            {children}
        </VerificationContext.Provider>
    );
};

export default VerificationContext;
