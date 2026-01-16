import React, { useState } from "react";
import pokemons from '../../data/pokemons.json';
import Card from "../Card/Card";

function Board({ difficulty }, props) {
    //must select num of cards at random depending on a difficulty setting
    difficulty = 6;

    function getRandomInt(max) {
        return Math.floor(Math.random() * (max + 1));
    }

    let random_index_list = [];

    for (let a = 0; a < difficulty; a++) {
        let rand_num = getRandomInt(pokemons.length - 1);
        while (random_index_list.includes(rand_num)) {
            rand_num = getRandomInt(pokemons.length - 1);
        }
        random_index_list.push(rand_num);
    }

    console.log(random_index_list);

    let selected_cards = [];

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

    //multiply each by 2 (to make pairs) and have them in an array
    for (let i = 0; i < random_index_list.length; i++) {
        let card = pokemons[random_index_list[i]];
        selected_cards.push(card);
        selected_cards.push(card);
    }
    shuffle(selected_cards);

    //make the board with num of cards per row depending on amount of total cards
    function cards_per_row(num) {
        if (num % 6 == 0) {
            return 6;
        }
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

    let row_num = cards_per_row(selected_cards.length);
    //check for a win everytime 2 cards are revealed

    function check_pair(allcards) {
        //if 2 cards revealed
        //check if equal
        //if true: score+1, keep cards revealed
        //if false: flip cards
    }

    // return (
    //     <Card key={index} name={element.name} img={element.img} type={element.type} />
    // )
}

export default Board;