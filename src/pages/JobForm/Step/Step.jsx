import React from 'react';

function Step({ children, isFirstStep, isLastStep, goBack, goForward, canProceed }) {
    return (
        <div>
            {children}
            <div>
                {!isFirstStep && <button type="button" onClick={goBack}>Back</button>}
                {!isLastStep && (
                    <button
                        type="button"
                        onClick={goForward}
                        disabled={!canProceed}
                        style={{
                            backgroundColor: canProceed ? 'black' : 'grey',
                            color: canProceed ? 'white' : 'black',
                        }}
                    >
                        Next
                    </button>
                )}
                {isLastStep && <button type="submit" style={{ backgroundColor: 'black', color: 'white' }}>Submit</button>}
            </div>
        </div>
    );
}

export default Step;