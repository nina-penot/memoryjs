import { useState } from "react";
import pokemons from '../../data/pokemons.json';

function Card({ key, name, img, type, onCardClick, isflipped, iswon, iswaiting }) {

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

    if (isflipped && iswon) {
        return (
            <div key={key} className="card_cont" style={{ background: type_colors[type in type_colors ? type : "normal"] }}>
                <div className="card_front_imgback">
                    <img className="card_front_img" src={img} alt={name}></img>
                </div>

                <div className="card_front_name">{name}</div>
            </div >
        )
    }

    if (isflipped) {
        return (
            <div key={key} onClick={onCardClick} className="card_cont" style={{ background: type_colors[type in type_colors ? type : "normal"] }}>
                <div className="card_front_imgback">
                    <img className="card_front_img" src={img} alt={name}></img>
                </div>

                <div className="card_front_name">{name}</div>
            </div >
        )
    } else {
        return (
            <div key={key} onClick={onCardClick} className="card_cont"></div>
        )
    }

}

function Board({ mycards }) {

    //let [flipped, setflip] = useState(false);
    let [allcards, edit_cards] = useState(mycards);

    //form grid
    //make the board with num of cards per row depending on amount of total cards
    function cards_per_row(num) {
        if (num % 5 == 0) {
            return 5;
        }
        if (num % 4 == 0) {
            return 4;
        }
        if (num % 3 == 0) {
            return 3;
        }
        return 4;
    }

    let row_num = cards_per_row(mycards.length);

    function handleClick(num) {
        console.log(allcards[num])
        if (!allcards[num].isflipped) {
            edit_cards(allcards[num].isflipped = true);
            console.log(allcards);
        } else {
            edit_cards(allcards[num].isflipped = false);
        }
        //console.log("new card values:", mycards[num]);

        check_pair();
    }

    //check for a win everytime 2 cards are revealed
    function check_pair() {
        //if 2 cards revealed
        let revealed_amt = [];
        for (let i in allcards) {
            if (allcards[i].isflipped) {
                revealed_amt.push(allcards[i]);
            }
            if (revealed_amt.length == 2) {
                break;
            }
        }
        console.log("pair detected!");

        //check if equal
        //if true: score+1, keep cards revealed
        //if false: flip cards
    }

    // const card_map = mycards.map((card, index) => {
    //     if (card.isflipped) {
    //         return (
    //             <Card key={card.key} name={card.name}
    //                 type={card.type} img={card.img} onCardClick={() => handleClick(index)} isflipped={true} iswaiting9={card.iswaiting}
    //                 iswon={card.iswon} />
    //         )

    //     } else {
    //         return (
    //             <Card key={card.key} name={card.name}
    //                 type={card.type} img={card.img} onCardClick={() => handleClick(index)} isflipped={false} iswaiting9={card.iswaiting}
    //                 iswon={card.iswon} />
    //         )
    //     }

    // });

    const card_map = allcards.map((card, index) =>
        <Card key={index} name={card.name}
            type={card.type} img={card.img} onCardClick={() => handleClick(index)} isflipped={card.isflipped}
            iswaiting={card.iswaiting} iswon={card.iswon} />
    );

    // const card_map = mycards.map((card, index) => {
    //     console.log(card, "myindex: " + index);
    // });

    return (
        <section className={"board_grid_" + row_num.toString()}>
            {card_map}
        </section>
    )
}

export default function New_Board({ difficulty }) {

    //let [flipped, setflip] = useState(false);

    if (difficulty == 0) {
        difficulty = 3;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * (max + 1));
    }

    //get random indexes of the pokemons list
    let random_index_list = [];

    for (let a = 0; a < difficulty; a++) {
        let rand_num = getRandomInt(pokemons.length - 1);
        while (random_index_list.includes(rand_num)) {
            rand_num = getRandomInt(pokemons.length - 1);
        }
        random_index_list.push(rand_num);
    }

    function shuffle(array) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

    let selected_cards = [];
    //multiply each by 2 (to make pairs) and have them in an array
    for (let i = 0; i < random_index_list.length; i++) {
        let card = {
            name: pokemons[random_index_list[i]].name,
            type: pokemons[random_index_list[i]].type,
            img: pokemons[random_index_list[i]].img,
            isflipped: false,
            iswaiting: false,
            iswon: false,
        };
        selected_cards.push(card);
        selected_cards.push(card);
    }

    //mix up the cards
    shuffle(selected_cards);
    //console.log(selected_cards);

    return (
        <Board mycards={selected_cards} />
    )
}