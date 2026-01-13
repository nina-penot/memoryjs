<?php

$pkmn_id_list = [25, 1, 4, 7, 16, 147, 10, 261, 35, 56, 200, 50, 582, 143, 23, 63, 524, 599];
$img_link_start = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
$img_link_end = ".png";
$pkmn_link = "https://pokeapi.co/api/v2/pokemon/";
$pkmn_data = [];

foreach ($pkmn_id_list as $i) {
    $data = file_get_contents($pkmn_link . $i);
    $data = json_decode($data);

    $pkmn_data[] = [
        "id" => $i,
        "name" => $data->name,
        "img" => $img_link_start . $i . $img_link_end,
        "type" => $data->types[0]->type->name
    ];
};
print_r($pkmn_data);
$pkmn_data = json_encode($pkmn_data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
file_put_contents("./newfile.json", $pkmn_data);
