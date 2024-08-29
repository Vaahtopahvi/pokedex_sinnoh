//implementing enter key to search a pokemon
const inputField = document.getElementById('pokemonName');

// event listener for the 'keydown' event
inputField.addEventListener('keydown', function (event) {
  // check if the key pressed is 'Enter' (key code is 13)
  if (event.key === 'Enter') {
    // prevent default action (form submission)
    event.preventDefault();
    // call the fetchData function
    fetchData();
  }
});

// pokemon types and their respective colors
const typeColors = {
  normal: '#989898',
  fire: '#fc622e',
  water: '#6390F0',
  electric: '#fedb03',
  grass: '#44bf27',
  ice: '#44befd',
  fighting: '#c22e28',
  poison: '#994dcc',
  ground: '#aa793b',
  flying: '#96c8fc',
  psychic: '#fc637f',
  bug: '#9fa427',
  rock: '#bdb88b',
  ghost: '#6d456e',
  dragon: '#5662d0',
  dark: '#4e4746',
  steel: '#6aadd2',
  fairy: '#ffb1fe',
};

//capitalize the first letter of the pokemon name
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

async function fetchData() {
  try {
    const pokemonName = document
      .getElementById('pokemonName')
      .value.toLowerCase();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    ); //backtics

    if (!response.ok) {
      throw new Error('Could not fetch that Pokemon.');
    }

    const data = await response.json();
    // console.log(data);
    const imgElement = document.getElementById('pokemonSprite');
    const indexElement = document.getElementById('pokemonIndex');
    const nameElement = document.getElementById('pokemonNameDisplay');
    // const cryElement = document.getElementById("pokemonCry");
    const typeElement = document.getElementById('pokemonType');
    const heightElement = document.getElementById('pokemonHeight');
    const weightElement = document.getElementById('pokemonWeight');

    //loads the image first
    imgElement.src = data.sprites.front_default;
    imgElement.style.display = 'block';

    //loads the rest of the information after the image is loaded
    imgElement.onload = () => {
      indexElement.textContent = `No. ${data.id.toString().padStart(3, '0')}`; //add 0 to the left of the number
      nameElement.textContent = `${capitalizeFirstLetter(data.name)}`;

      // Extract the type and apply changes
      const type = data.types[0].type.name;
      let displayType1 = type.toUpperCase();

      // Apply the type of the pokemon to the element
      typeElement.textContent = displayType1;
      // Apply the color from typeColors
      typeElement.style.backgroundColor = typeColors[type] || '#fff';
      // Apply the style to the element
      typeElement.style.textAlign = 'center';
      typeElement.style.fontSize = 'medium';
      typeElement.style.color = 'white';
      typeElement.style.fontWeight = '500';
      typeElement.style.padding = '1px 10px';
      typeElement.style.borderRadius = '3px';

      // check, if the pokemon has more than one type
      if (data.types[1]) {
        const type2 = data.types[1].type.name;
        let typeElement2 = document.getElementById('pokemonType2');
        typeElement2.textContent = type2.toUpperCase();
        typeElement2.style.backgroundColor = typeColors[type2] || '#fff';

        // Apply the styles to the new element
        typeElement2.style.textAlign = 'center';
        typeElement2.style.fontSize = 'medium';
        typeElement2.style.color = 'white';
        typeElement2.style.fontWeight = '500';
        typeElement2.style.padding = '1px 10px';
        typeElement2.style.borderRadius = '3px';
      } else {
        document.getElementById('pokemonType2').style.backgroundColor =
          'transparent';
        document.getElementById('pokemonType2').textContent = '';
      }

      // height and weight
      heightElement.textContent = `${data.height / 10}m`;
      weightElement.textContent = `${data.weight / 10} kg`;
    };
  } catch (error) {
    console.error(error);
  }
}

// // Get the div element
// const div = document.getElementsByClassName('frame')[0];

// // Create an array of the color values
// const colors = Object.values(typeColors);

// // Initialize the index
// let index = 0;

// // Function to change the color
// function changeColor() {
//     // Apply the current color to the div
//     div.style.backgroundColor = colors[index];

//     // Update the index, looping back to the start if necessary
//     index = (index + 1) % colors.length;
// }

// // Set an interval to change the color every 2 seconds
// setInterval(changeColor, 1000);
