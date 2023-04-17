// Container será onde os cards pokemon ficarão alocados
function createPokemonCard(pokemon){
    fetch(pokemon.url)
        .then( response => response.json() )
        .then( pokemonData => {
            let container = document.getElementById("container");
            let pokemonName = pokemonData.name;
            let pokemonNumber = pokemonData.id;
            let pokemonSprite = pokemonData.sprites.front_default;
            let pokemonType = [];
                pokemonData.types.forEach( slot => pokemonType.push(slot.type.name));

            let pokemonCard = document.createElement("li");
                pokemonCard.className = `card pokemon-card col-3 bg-${pokemonType[0]}`;
                pokemonCard.innerHTML = (`
                <div>
                    <p class="pokemon-name">${pokemonName}</p>
                </div>
            
                <div>
                    <img src="${pokemonSprite}" alt="pokemon-${pokemonNumber}">
                </div>

                <div class="d-flex">
                    <p class="${pokemonType[0]} type-icon">${pokemonType[0].toUpperCase()}</p>
                    ${pokemonType[1] ? `<p class="${pokemonType[1]} type-icon">${pokemonType[1].toUpperCase()}</p>` : ""}
                </div>`
            );

            container.appendChild(pokemonCard);
        })
}

function pokemonFilter(){
    let filter = document.getElementById("options").value;
    let container = document.getElementById("container");
        container.innerHTML = "";

    if (filter == "pokemon"){
        fetch("https://pokeapi.co/api/v2/pokemon")
        .then ( response => response.json() )
        .then ( jsonBody => jsonBody.results )
        .then ( pokemonAPI => {
            let pokemonList = pokemonAPI;

            pokemonList.forEach( pokemon => createPokemonCard(pokemon));
        });
    } else {
        fetch(`https://pokeapi.co/api/v2/${filter}`)
        .then ( response => response.json() )
        .then ( jsonBody => {
            for (pokemon of jsonBody.pokemon){
                createPokemonCard(pokemon.pokemon);
            }
        })
    }
}

let options = document.getElementById("options");

pokemonFilter();
options.addEventListener("change", pokemonFilter);



