// Container será onde os cards pokemon ficarão alocados
let container = document.getElementById("container");

// Aqui eu utilizo a API de Pokedex json para obtenção de dados
fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
.then( response => response.json())
.then( pokemonList => {
            pokemonList.results.forEach( pokemon => { // Para cada pokemon da lista...
                // Card
                let pokemonCard = document.createElement("div");
                pokemonCard.className = "card col-3";

                // Imagem
                let pokemonImage = document.createElement("img");
                    pokemonImage.className = "card-top-img";
                    
                // Nome
                let pokemonName = document.createElement("h5");
                    pokemonName.className = "card-header text-center text-capitalize";
                    pokemonName.innerText = pokemon.name;
                    
                // Há outro json dentro do json acima...
                fetch(pokemon.url)
                .then( response => response.json())
                .then( data => { // "data" são os dados do pokemon específico do loop
                    // Aqui eu adiciono o source para a renderização da imagem do pokemon
                    pokemonImage.setAttribute("src", data.sprites.front_default);
                    pokemonImage.className = `${data.types[0].type.name}`;

                    // Esse "forEach" foi necessário para obter os tipos do pokemon
                    data.types.forEach( type => {
                        let pokemonType = document.createElement("p");
                            type = type.type.name;
                            pokemonType.className = `type-icon ${type}`;

                            pokemonType.style.color = "white";
                            pokemonType.innerText = type.toUpperCase();
                            pokemonCard.appendChild(pokemonType);
                    })
                });

                
                pokemonCard.appendChild(pokemonImage);
                pokemonCard.appendChild(pokemonName);
                container.appendChild(pokemonCard);
    })
})