import { useState, useEffect, useReducer } from "react";
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

function reducer(state, action) {
    switch (action.type) {
        case 'flip_single_card': {
            const mycard = action.payload;
            return {
                isflipped: true,
            }
        }
        case 'wait_single_card': {
            return {
                iswaiting: true,
            }
        }
        case 'wait_all': {
            return {
                ...state,
                iswaiting: true,
            }
        }
        case 'unwait_all': {
            return {
                ...state,
                iswaiting: false,
            }
        }
    }
    throw Error("unknown action: " + action.type);
}

function Board({ mycards }) {

    let [allcards, edit_cards] = useState(mycards);
    let [revealed, handle_reveal] = useState([]);
    let [totalcards, dispatch] = useReducer(reducer, mycards);

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

    function update_cards(num) {
        const nextCard = allcards.map((card, index) => {
            if (index === num) {
                if (!card.isflipped) {
                    return {
                        ...card,
                        isflipped: true,
                    }
                } else {
                    return card;
                }

            } else {
                return card;
            }
        })

        edit_cards(nextCard);
        // console.log("nextCard", nextCard);
    }

    function backflip(num_array) {
        const nextCard = allcards.map((card, index) => {
            if (num_array.includes(index)) {
                if (card.isflipped) {
                    return {
                        ...card,
                        isflipped: false,
                    }
                } else {
                    return card;
                }

            } else {
                return card;
            }
        })

        edit_cards(nextCard);
    }

    // function mark_all_wait(cards) {
    //     const nextCard = cards.map((card, index) => {
    //         return {
    //             ...card,
    //             iswaiting: true,
    //         }
    //     })

    //     //console.log("mark all wait:", nextCard);
    //     // edit_cards(nextCard);
    //     return nextCard;
    // }

    function mark_all_wait(cards) {

        edit_cards(
            prev => {
                let newstate = [...prev];
                for (let a in newstate) {
                    newstate[a].iswaiting = true;
                }
                return newstate;
            }
        )

    }

    function mark_card_win(num_array) {
        const nextCard = allcards.map((card, index) => {
            if (num_array.includes(index)) {
                if (!card.iswon) {
                    return {
                        ...card,
                        iswon: true,
                    }
                } else {
                    return card;
                }

            } else {
                return card;
            }
        })

        edit_cards(nextCard);
    }


    function handleClick(num) {
        //to add:
        //arrow func somewhere??
        update_cards(num);
        dispatch({
            type: 'wait_all'
        })
        console.log("reducer test1", totalcards);
        dispatch({
            type: 'unwait_all'
        })
        console.log("reducer test2", totalcards);
        //console.log("update check", allcards);

        //check if 2 cards revealed
        let rev = check_pair(allcards)
        if (rev != false) {
            edit_cards(
                prev => {
                    let newstate = [...prev];
                    for (let a in newstate) {
                        newstate[a].iswaiting = true;
                    }
                    return newstate;
                }
            );
            //check if it's a win
            if (check_win(rev[0], rev[1])) {
                console.log("win");
            } else {
                console.log("lose");
            }
        }
    }

    //check for a win everytime 2 cards are revealed
    function check_pair(cards) {
        //console.log("checkpair cards:", cards);
        //if 2 cards revealed
        let revealed_amt = [];
        for (let i in cards) {
            //console.log("loop", cards[i]);
            if (cards[i].isflipped && !cards[i].iswon) {
                //console.log("found flip");
                revealed_amt.push(cards[i]);
            }
        }


        if (revealed_amt.length == 2) {
            return revealed_amt;
        } else {
            return false;
        }
        // for (let i in cards) {
        //     console.log("looping", cards[i]);
        //     if (cards[i].isflipped) {
        //         console.log("checkpair:", cards[i]);
        //         revealed_amt.push(cards[i]);
        //         //console.log("revealedamt", revealed_amt);
        //     }

        //     if (revealed_amt.length == 2) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
    }

    function check_win(card1, card2) {
        //check the two revealed cards
        if (card1.name === card2.name) {
            return true;
        } else {
            return false;
        }
        //if same, mark as won
        //else, flip back
    }

    //console.log("allcards state", allcards);
    const card_map = allcards.map((card, index) =>

        <Card key={index} name={card.name}
            type={card.type} img={card.img} onCardClick={() => handleClick(index)} isflipped={card.isflipped}
            iswaiting={card.iswaiting} iswon={card.iswon} />

    );

    const game_state = allcards.map((card, index) =>
        <div>
            <div>Card n° {index}:</div>
            <div>flipped? {card.isflipped ? "flipped" : "no"}</div>
            <div>won? {card.iswon ? "won" : "no"}</div>
            <div>waiting? {card.iswaiting ? "waiting" : "no"}</div>
        </div>

    )

    const pair_detect = <div>Pair detected? {check_pair(allcards) ? "yes" : "no"}</div>

    // const card_map = mycards.map((card, index) => {
    //     console.log(card, "myindex: " + index);
    // });

    return (
        <>
            <section className={"board_grid_" + row_num.toString()}>
                {card_map}
            </section>
            <section>
                {pair_detect}
                {game_state}
            </section>
        </>
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
            key: i,
            name: pokemons[random_index_list[i]].name,
            type: pokemons[random_index_list[i]].type,
            img: pokemons[random_index_list[i]].img,
            isflipped: false,
            iswaiting: false,
            iswon: false,
        };
        selected_cards.push(card);
        let card2 = {
            key: i + random_index_list.length,
            name: pokemons[random_index_list[i]].name,
            type: pokemons[random_index_list[i]].type,
            img: pokemons[random_index_list[i]].img,
            isflipped: false,
            iswaiting: false,
            iswon: false,
        };
        selected_cards.push(card2);
    }

    //mix up the cards
    shuffle(selected_cards);
    //console.log(selected_cards);

    return (
        <Board mycards={selected_cards} />
    )
}