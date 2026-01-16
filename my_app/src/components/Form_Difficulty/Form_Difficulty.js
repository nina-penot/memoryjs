import pokemons from '../../data/pokemons.json';
import { createElement } from 'react';
import Board from '../Board/Board';

function Form_Difficulty() {
    //Select form
    //uses length of pokemons
    const pair_amount_max = pokemons.length;
    //Divide in difficulty groups
    //pair min: 3
    const difficulty_groups = {
        6: "Facile",
        10: "Moyen",
        14: "Difficile",
        [pair_amount_max]: "Extreme"
    }

    // let build_diff_groups = {};
    // for (let i = 3; i <= pair_amount_max; i++) {
    //     if (i <= 6) {
    //         build_diff_groups[i] = "Facile";
    //     } else if (i <= 10) {
    //         build_diff_groups[i] = "Moyen";
    //     } else if (i <= 14) {
    //         build_diff_groups[i] = "Difficile";
    //     } else {
    //         build_diff_groups[i] = "EXTREME";
    //     }
    // }

    let prev = 3;
    let groups = []
    for (let i in difficulty_groups) {
        let options = [];

        for (let a = prev; a < i; a++) {
            // console.log(a);
            let option = createElement("option", { name: a, value: a }, a + " paires (" + a * 2 + " cartes)");
            options.push(option);
        }

        let mygroup = createElement("optgroup", { name: difficulty_groups[i], label: difficulty_groups[i] }, options);
        groups.push(mygroup);

        prev = parseInt(i);
    }


    let select_elem = createElement("select", {}, groups);
    let title = createElement("div", {}, "Difficulté :")
    let submit_btn = createElement("button", { type: "submit" }, "Commencer");

    function spawn_board(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        console.log(form[0].value);
        return (
            <Board difficulty={form[0].value} />
        );
    }

    return (
        createElement("form", { onSubmit: spawn_board }, [title, select_elem, submit_btn])
    )

}

export default Form_Difficulty;