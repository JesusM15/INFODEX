const search = document.getElementById('search') ;
const btnSend = document.getElementById('btn-send');
let name = document.querySelector('.name'); 
let img = document.querySelector('.img');
let where = document.querySelector('.location');
let abilities = document.querySelector('.abilities');
let height = document.querySelector('.height');
let type = document.querySelector('.type');
let infoContain = document.querySelector('.container-info');

const getPokemonInfo = async ()=>{
	try{
	let user_search = search.value.toLowerCase();
	let request = await fetch(`https://pokeapi.co/api/v2/pokemon/${user_search}`);
	let result = await request.json();
	let requestLocation = await fetch(`${result.location_area_encounters}`);
	let resultLocation = await requestLocation.json();
	let resulttype = result.types[0].type.name;

	if (resulttype == 'fire'){
		infoContain.style.backgroundColor = "#FF0000";
	}
	else if (resulttype == 'water'){
		infoContain.style.backgroundColor = "#48e";
	}
	else if (resulttype == 'grass'){
		infoContain.style.backgroundColor = "#3EC200";
	} else if (resulttype == 'rock'){
		infoContain.style.backgroundColor = "#C89500";
	} else if (resulttype == 'bug'){
		infoContain.style.backgroundColor = "#195B23";
	}
	else if (resulttype == 'electric'){
		infoContain.style.backgroundColor = "#D0C102";
	}
	else{
		infoContain.style.backgroundColor = "transparent";
	}


	switch (resultLocation[0].location_area.name){
		case `trophy-garden-area`:
		    spanish = `Zona ajardinada`;
		    break;
		case `pallet-town-area`:
		    spanish = `En los alrededores de Ciudad Paleta`;
		    break;
		case `kanto-route-2-south-towards-viridian-city`:
		    spanish = `Kanto ruta 2 sur hacia la ciudad de viridian`;
		    break;
		case `viridian-forest-area`:
		    spanish = `En los alrededores de bosque viridiano`;
		    break;
		case `power-plant-area`:
		    spanish = `Area de la planta de energía`;
		    break;
	    case `hoenn-safari-zone-sw`:
	        spanish = `Hoenn en la zona del safari`;
	        break;
	    default:
	        spanish = resultLocation[0].location_area.name;
	        break;
		    return spanish;
	}

	type.innerHTML = `Tipo:<br>${resulttype}`
	height.innerHTML = `Altura:<br> ${result.height*10/100} M`;
	name.innerHTML = `${result.name.toUpperCase()} N. º${result.id}`;
	img.src = result.sprites.front_default;
	where.innerHTML = `Localización:<br> ${spanish}`
	abilities.innerHTML = `Habilidades:<br> `;
	for (let i = 0; i<result.abilities.length; i++){
		powers = result.abilities[i].ability.name;
		if (i == result.abilities.length-1){
			abilities.innerHTML += ` ${powers} `
		}else{
			abilities.innerHTML += ` ${powers}, `
		}
	}
	console.log(result);
    } catch(e){
    	console.log("Pokemon no encontrado...");
		infoContain.style.backgroundColor = "transparent";
    	img.src = `error.png`;
    	height.innerHTML = ``;
    	abilities.innerHTML = `<b style="color:#000">Lo sentimos, no logramos dar con el Pokemon</b>`;
    	where.innerHTML = `<b style="color:#000">:(</b>`
    	name.innerHTML = `Este pokemon no existe o aún no contamos con sus datos.`;
    	type.innerHTML = ``
    }
}

btnSend.addEventListener("click", (e)=>{
	e.preventDefault();
	getPokemonInfo();
})



const typed = new Typed('.typed', {
    strings: [
        '<h1 class="title">  Pokemon Favorito</h1>',
        '<h1 class="title">  Descubre sus atributos</h1>'
    ],

    //stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
    typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
    startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
    backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
    smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
    shuffle: false, // Alterar el orden en el que escribe las palabras.
    backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
    loop: true, // Repetir el array de strings
    loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
    showCursor: true, // Mostrar cursor palpitanto
    cursorChar: '|', // Caracter para el cursor
    contentType: 'html', // 'html' o 'null' para texto sin formato
});