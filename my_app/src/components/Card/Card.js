import React, { useState } from "react";

function Card(props) {

    const [flipped, set_flip] = useState(false);

    // const info = {
    //     img: "insert img here",
    //     name: "name",
    //     type: "type"
    // };

    const type_colors = {
        "fire": "linear-gradient(180deg,rgba(227, 43, 43, 1) 0%, rgba(237, 181, 83, 1) 100%)",
        "electric": "linear-gradient(180deg,rgb(216, 166, 27) 0%, rgb(255, 245, 112) 100%)",
        "normal": "linear-gradient(180deg,rgb(141, 137, 127) 0%, rgb(218, 211, 199) 100%)",
        "water": "linear-gradient(180deg,rgb(38, 66, 226) 0%, rgb(22, 114, 175) 100%)",
        "grass": "linear-gradient(180deg,rgb(14, 134, 50) 0%, rgb(79, 206, 68) 100%)",
        "flying": "linear-gradient(180deg,rgb(82, 106, 116) 0%, rgb(159, 208, 214) 100%)",
        "dragon": "linear-gradient(180deg,rgb(34, 23, 133) 0%, rgb(212, 35, 35) 100%)",
        "bug": "linear-gradient(180deg,rgb(97, 173, 53) 0%, rgb(189, 209, 73) 100%)",
        "psychic": "linear-gradient(180deg,rgb(143, 54, 155) 0%, rgb(240, 85, 214) 100%)",
        "dark": "linear-gradient(180deg,rgb(51, 45, 47) 0%, rgb(95, 86, 86) 100%)",
        "fairy": "linear-gradient(180deg,rgb(189, 66, 183) 0%, rgb(255, 145, 196) 100%)",
        "fighting": "linear-gradient(180deg,rgb(112, 41, 19) 0%, rgb(207, 116, 41) 100%)",
        "ghost": "linear-gradient(180deg,rgb(49, 30, 116) 0%, rgb(151, 116, 190) 100%)",
        "ground": "linear-gradient(180deg,rgb(95, 76, 54) 0%, rgb(197, 157, 88) 100%)",
        "ice": "linear-gradient(180deg,rgb(16, 165, 211) 0%, rgb(73, 242, 248) 100%)",
        "poison": "linear-gradient(180deg,rgb(53, 31, 61) 0%, rgb(162, 68, 216) 100%)",
        "rock": "linear-gradient(180deg,rgb(71, 61, 59) 0%, rgb(184, 144, 126) 100%)",
        "steel": "linear-gradient(180deg,rgb(68, 69, 71) 0%, rgb(158, 152, 149) 100%)"
    }

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
        <div className="card_cont" style={{ background: type_colors[props.type in type_colors ? props.type : "normal"] }}>
            <div className="card_front_imgback">
                <img className="card_front_img" src={props.img} alt={props.name}></img>
            </div>

            <div className="card_front_name">{props.name}</div>
        </div >
    )
}

export default Card;