// const img_link_start = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
// const img_link_end = ".png";
// const pkmn_link = "https://pokeapi.co/api/v2/pokemon/"

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// const pkmn_id_list = [25, 1, 4, 7, 16, 147, 10, 261, 35, 56, 200, 50, 582, 143, 23, 63, 524, 599];

function FetchData() {
    const pkmn_id_list = [25, 1, 4, 7, 16, 147, 10, 261, 35, 56, 200, 50, 582, 143, 23, 63, 524, 599];
    const img_link_start = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
    const img_link_end = ".png";
    const pkmn_link = "https://pokeapi.co/api/v2/pokemon/"
    const [pokemons, setPokemons] = useState([]);
    let pkmn_extract = [];

    useEffect(() => {
        fetch(pkmn_link + "1")
            .then(res => res.json())
            .then(data => setPokemons(data))
            .then(pkmn_extract = {
                num: 1,
                name: data.name,
                type: data.types[0].type.name,
                img: img_link_start + 1 + img_link_end
            })
            .catch(err => console.log(err))
    }, [])

    return (pokemons);
}

// const test = require("https://pokeapi.co/api/v2/pokemon/25");
// console.log(test);

// async function get_pkmn_data(list, obj_build) {
//     const pkmn_link = "https://pokeapi.co/api/v2/pokemon/";
//     const img_link_start = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
//     const img_link_end = ".png";

//     for (let i = 0; i < list.length; i++) {
//         let url = pkmn_link + list[i];

//         let res = await fetch(url);
//         let pkmn_all_data = await res.json();
//         let pkmn_extract = {
//             num: list[i],
//             name: pkmn_all_data.name,
//             type: pkmn_all_data.types[0].type.name,
//             img: img_link_start + list[i] + img_link_end
//         }
//         obj_build.push(pkmn_extract);
//     }

//     console.log(obj_build);
//     return obj_build;
// }

// let pokemons = [];
// get_pkmn_data(pkmn_id_list, pokemons)

export default FetchData;