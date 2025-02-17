function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPokemon(i) {
    try {
        console.log(`Fetching Pokémon ${i + 1}...`);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        const data = await response.json();
        const types = data.types.map(type => type.type.name);
        const imagePath = data.sprites.front_default;

        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`);
        const data2 = await response2.json();

        let description = null;
        const entry = data2.flavor_text_entries.find(entry => entry.language.name === 'fr');
        if (entry) {
            description = entry.flavor_text;
        }
        const name = data2.names.find(entry => entry.language.name === 'fr').name;

        const game_indices = data.game_indices;
        const regions = {
            'red': 'Kanto', 'blue': 'Kanto', 'yellow': 'Kanto',
            'gold': 'Johto', 'silver': 'Johto', 'crystal': 'Johto',
            'ruby': 'Hoenn', 'sapphire': 'Hoenn', 'emerald': 'Hoenn',
            'firered': 'Kanto', 'leafgreen': 'Kanto', 'diamond': 'Sinnoh',
            'pearl': 'Sinnoh', 'platinum': 'Sinnoh', 'heartgold': 'Johto',
            'soulsilver': 'Johto', 'black': 'Unova', 'white': 'Unova',
            'black-2': 'Unova', 'white-2': 'Unova', 'x': 'Kalos', 'y': 'Kalos',
            'omega-ruby': 'Hoenn', 'alpha-sapphire': 'Hoenn', 'sun': 'Alola',
            'moon': 'Alola', 'ultra-sun': 'Alola', 'ultra-moon': 'Alola',
            "let's-go-pikachu": 'Kanto', "let's-go-eevee": 'Kanto',
            'sword': 'Galar', 'shield': 'Galar', 'brilliant-diamond': 'Sinnoh',
            'shining-pearl': 'Sinnoh', 'legends-arceus': 'Hisui',
            'scarlet': 'Paldea', 'violet': 'Paldea'
        };

        const gameRegions = game_indices.map(game => regions[game.version.name] || 'Unknown');
        const uniqueRegions = [...new Set(gameRegions)];
        const regionWithIndex = uniqueRegions.map(region => {
            const gameIndex = game_indices.find(game => regions[game.version.name] === region).game_index;
            return { regionName: region, regionPokedexNumber: gameIndex };
        });

        const animatedGif = data.sprites.versions["generation-v"]["black-white"].animated.front_default || data.sprites.other.showdown.front_default || null;
        const soundPath = data.cries.latest;
        const height = data.height;
        const weight = data.weight;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2FkYmIyNTA5ZTAwM2FiZmVkNjRhN2IiLCJpYXQiOjE3Mzk0NTEyMzUsImV4cCI6MTczOTQ2NTYzNX0.RoNT7bVZLMbpUm0MwA2F6mHmCn0-O0_SwgiR8Mc8JSc");

        const raw = JSON.stringify({
            "name": name,
            "types": types,
            "imagePath": imagePath,
            "animatedGif": animatedGif,
            "soundPath": soundPath,
            "description": description,
            "regions": regionWithIndex,
            "height": height,
            "weight": weight
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const postResponse = await fetch("http://localhost:3001/api/pkmn", requestOptions);
        const result = await postResponse.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Exécuter toutes les requêtes avec un délai de 300ms entre chaque
async function fetchAllPokemons() {
    for (let i = 0; i < 1025; i++) {
        await fetchPokemon(i);
        await sleep(30); // 300ms d'attente entre chaque requête
    }
}

fetchAllPokemons();
