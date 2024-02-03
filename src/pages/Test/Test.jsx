import classes from "./Test.module.scss"

function Test(props) {
    return (
        <div>
            <h1>TestSeite</h1>
            <div className={classes.testing}>
                <div className="left">
                    <h1>Heading 1</h1>
                    <p>This is some basic text beneath the heading of a ReverseText</p>
                    <h2>Heading 2</h2>
                    <p>This is some basic text beneath the heading of a ReverseText</p>
                    <h3>Heading 3</h3>
                    <p>This is some basic text beneath the heading of a ReverseText</p>
                    <h4>Heading 4</h4>
                    <p>This is some basic text beneath the heading of a ReverseText</p>
                    <h5>Heading 5</h5>
                    <p>This is some basic text beneath the heading of a ReverseText</p>
                </div>
                <div className="right">
                    <div className="reverseOrder">
                        <h1>Heading 1</h1>
                        <p>This is a paragraph</p>
                    </div>
                    <p>This is some basic text beneath the heading of a ReverseText</p>
                    <div className="reverseOrder">
                        <h2>Heading 2</h2>
                        <p>This is a paragraph</p>
                    </div>
                    <p>This is some basic text beneath the heading of a ReverseText</p>
                    <div className="reverseOrder">
                        <h3>Heading 3</h3>
                        <p>This is a paragraph</p>
                    </div>
                    <p>This is some basic text beneath the heading of a ReverseText</p>
                    <div className="reverseOrder">
                        <h4>Heading 4</h4>
                        <p>This is a paragraph</p>
                    </div>
                    <p>This is some basic text beneath the heading of a ReverseText</p>
                    <div className="reverseOrder">
                        <h5>Heading 5</h5>
                        <p>This is a paragraph</p>
                    </div>
                    <p>This is some basic text beneath the heading of a ReverseText</p>
                </div>
            </div>
        </div>
    );
}

export default Test;