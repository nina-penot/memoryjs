import React, { useState } from "react";

function Score(props) {

    const [score, setScore] = useState(0);

    function click() {
        if (score < 15) {
            setScore(score + 1);
        }
    }

    return (
        <>
            <p> Mon score est de {score} .</p>
            <button className={"btn " + props.class} onClick={click}>Click pour + score</button >
        </>
    )

}

export default Score;