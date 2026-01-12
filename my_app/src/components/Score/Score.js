import React, { useState } from "react";

function Score(props) {

    const [score, setScore] = useState(0);

    function click() {
        setScore(score + 1);
    }

    return (
        <>
            <p> Mon score est de {score} .</p>
            <button onClick={click}>Click pour + score</button >
        </>
    )

}

export default Score;