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
            
                <div class="pokemon-img">
                    <img src="${pokemonSprite}" alt="pokemon-${pokemonNumber}" height=100% width=100%>
                </div>

                <div class="d-flex">
                    <p class="${pokemonType[0]} type-icon">${pokemonType[0].toUpperCase()}</p>
                    ${pokemonType[1] ? `<p class="${pokemonType[1]} type-icon">${pokemonType[1].toUpperCase()}</p>` : ""}
                </div>`
            );

            container.appendChild(pokemonCard);
            nameScrollableDetect(container.children[container.children.length - 1].children[0]);
        })
}

//Essa função avalia se o nome do pokemon é maior que o card e atribui a ele um efeito scroll.
function nameScrollableDetect(pokemonName){
    if (pokemonName.scrollWidth > pokemonName.offsetWidth){
        pokemonName.classList.add("scrollable");
    }
}

//Filtro de pokemons por tipo
function pokemonFilterType(){
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

pokemonFilterType();
options.addEventListener("change", pokemonFilterType);

    
  


