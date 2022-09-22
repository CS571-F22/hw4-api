import {writeFileSync} from 'fs';
import fetch from 'node-fetch';

const collectBadgermon = async () => {
    const badgermons = await Promise.all(new Array(151).fill().map(async (x, _i) => {
        const i = _i + 1; // need to start at 1
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await resp.json();
        const types = data.types.map(type => type.type.name);
        const stats = {
            "hp": data.stats[0].base_stat,
            "attack": data.stats[1].base_stat,
            "defense": data.stats[2].base_stat,
        }
        return {
            id: i,
            name: data.name,
            weight: data.weight,
            stats: stats,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
            types: types
        };
    }))
    return badgermons;
}

collectBadgermon().then(badgermons => writeFileSync("badgermon.json", JSON.stringify(badgermons, null, 2) ));
