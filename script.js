fetchData();

async function fetchData() {

    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/blastoise`); //backtics
        

        if (!response.ok) {
            throw new Error("Could not fetch that Pokemon.");
        }

        const data = await response.json();
        console.log(data);
        // const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        const nameElement = document.getElementById("pokemonNameDisplay");

        //loads the image first
        imgElement.src = data.sprites.front_default;
        imgElement.style.display = "block";
        
        //loads the text after the image is loaded
        imgElement.onload = () => { 
            nameElement.textContent = `${capitalizeFirstLetter(data.name)}` 
        };        
    }

    catch(error) {
        console.error(error);

    }
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// fetchData();