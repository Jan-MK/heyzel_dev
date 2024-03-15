import classes from "./ErrorFallBack.module.scss"
import {useNavigate} from "react-router-dom";

function ErrorFallBack({error}) {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleTryAgain = () => {
        window.location.reload(); // Consider if there's a less disruptive way to recover from the error
    };

    const handleBackHome = () => {
        navigate('/'); // Navigates back to the home page
    };

    return (
        <div role="alert" className={classes.fullPage}>
            <h2>Something went wrong:</h2>
            <p>Could not load this site! Please try again or write us an e-mail.</p>
            <div className={classes.error}>
                <p>Error:</p>
                <pre>{error.message}</pre>
            </div>
            <div className={classes.btns}>
                <button className={'primary'} onClick={handleTryAgain}>Try again</button>
                <button className={'third'} onClick={handleBackHome}>Back home</button>
            </div>
        </div>
    );
}

export default ErrorFallBack;