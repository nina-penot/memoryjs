import React, { useState } from "react";

function Card(props) {

    const [flipped, set_flip] = useState(false);

    const info = {
        img: "insert img here",
        name: "name",
        type: "type"
    };

    function click() {
        //flip card
        if (flipped == false) {
            set_flip(flipped = true);
        }
    }

    function flip_back() {
        //if flipped true and not win....
        //card flips back to show back
    }

    return (
        <div className="card_cont">
            <div className="card_front_imgback">
                <img className="card_front_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"></img>
            </div>

            <div className="card_front_name">Name here</div>
        </div>
    )
}

export default Card;