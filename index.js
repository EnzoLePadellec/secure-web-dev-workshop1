// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length
}
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)

// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate () {
	const test = filmingLocations.sort(function(a,b){ return new Date(a.fields.date_debut) - new Date(b.fields.date_debut);});
	return test[0];
}

console.log(sortFilmingLocationsByStartDate())

// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	let film2020 = [];
	for (let i = 0; i<filmingLocations.length;i++){
		if(filmingLocations[i].fields.annee_tournage === '2020'){
			film2020.push(filmingLocations[i]);
		}
	}
	return film2020.length;
}

console.log(getFilmingLocationsNumber2020() + " films ont été tournés en 2020")

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear () {
	var dict = {};
	for(let i =0; i<filmingLocations.length;i++){
		if(dict[filmingLocations[i].fields.annee_tournage]!= null){
			dict[filmingLocations[i].fields.annee_tournage] +=1;
		}
		else{
			dict[filmingLocations[i].fields.annee_tournage] = 1
		}	
	}
	return dict
}

console.log("Nombre de films par année : ")
var filmLocationPerYear = getFilmingLocationsNumberPerYear()
for(var key in filmLocationPerYear){
	console.log(key + " : " + filmLocationPerYear[key])
}

// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict () {
	var dict = {};
	for(let i =0; i<filmingLocations.length;i++){
		if(dict[filmingLocations[i].fields.ardt_lieu]!= null){
			dict[filmingLocations[i].fields.ardt_lieu] +=1;
		}
		else{
			dict[filmingLocations[i].fields.ardt_lieu] = 1
		}	
	}
	return dict
}

console.log("Nombre de films par arrondissement : ")
var filmLocationPerDistrict = getFilmingLocationsNumberPerDistrict ()
for(var key in filmLocationPerDistrict){
	console.log(key + " : " + filmLocationPerDistrict[key])
}
console.log(getFilmingLocationsNumberPerDistrict ())

// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm () {

	var dict = {};
	for(let i =0; i<filmingLocations.length;i++){
		if(dict[filmingLocations[i].fields.nom_tournage]!= null){
			dict[filmingLocations[i].fields.nom_tournage] +=1;
		}
		else{
			dict[filmingLocations[i].fields.nom_tournage] = 1
		}	
	}

	var array = [];
	let clés = Object.keys(dict);
	let valeurs = Object.values(dict);
	for(let i = 0; i < clés.length; i++){
		array.push({
			'films': clés[i],
			'locations': valeurs[i],
		});
	}

	array.sort(function(a,b){
		return b.locations - a.locations
	});	

	return array;

}
console.log(getFilmLocationsByFilm()[0])
console.log("est le premier élément.")

console.log(getFilmLocationsByFilm()[getFilmLocationsByFilm().length-1])
console.log("est le dernier élément.")

// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	var set = new Set();
	for(let i =0; i<filmingLocations.length;i++){
		set.add(filmingLocations[i].fields.nom_tournage);	
	}
	return set.size
}

console.log("Il y a " + getNumberOfFilms() + " films différents.")

// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	let LRDM = [];
	for(const location of filmingLocations) {
		if(location.fields.nom_tournage ==`LRDM - Patriot season 2`){
			LRDM.push(location.fields.adresse_lieu);
		}
	}
	return LRDM;
}

console.log("Les différents lieu de tournage de LRDM - Patriot Season 2 sont : " + getArseneFilmingLocations());

// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations (favoriteFilmsNames) {
	let film = {}
	for(const location of filmingLocations) {
		if(favoriteFilmsNames.includes(location.fields.nom_tournage)==true)
		{
			if(film[location.fields.nom_tournage]==undefined)
			{
				film[location.fields.nom_tournage] = new Set()
			}
			film[location.fields.nom_tournage].add(location.fields.ardt_lieu)
		}
	}
	return film;
}

const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	];

const favorite = getFavoriteFilmsLocations(favoriteFilms)
console.log("Les lieux de tournages de nos films favoris sont : ");
for(var key in favorite){
	console.log(key + " : " + favorite[key])
	for(let i of favorite[key]){
		console.log(i)
	}
}

// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	const films = {};
	for(const location of filmingLocations) {
		if(films[location.fields.nom_tournage]==undefined){
			films[location.fields.nom_tournage]=[location.fields.ardt_lieu];
		}
		else if(films[location.fields.nom_tournage].indexOf(location.fields.ardt_lieu)==-1){
			films[location.fields.nom_tournage].push(location.fields.ardt_lieu);
		}		
	}
	return films;
}

const locationPerFilm = getFilmingLocationsPerFilm();
for(var key in locationPerFilm){
	console.log(key + " : " + locationPerFilm[key])
}

// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	const numberPerTypes = {};
	const filmsAlreadySeen = [];
	for(const location of filmingLocations)
	{
		if(location.fields.type_tournage in numberPerTypes == false)
		{
			numberPerTypes[location.fields.type_tournage] = 1;
			filmsAlreadySeen.push(location.fields.nom_tournage);
		}
		else{
			if(location.fields.nom_tournage in filmsAlreadySeen == false){
				filmsAlreadySeen.push(location.fields.nom_tournage);
				numberPerTypes[location.fields.type_tournage] += 1;
			}
		}
	}
	return numberPerTypes
}

console.log("The different type of film:")
const filmType = countFilmingTypes()
for(var key in filmType){
	console.log(key + " : " + filmType[key])
}

// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	const numberPerTypes = countFilmingTypes();
	const sortedCountTypes =[]
	for (const Type of Object.keys(numberPerTypes)) {
		sortedCountTypes.push({'type':Type, 'count' : numberPerTypes[Type]})
	}
	sortedCountTypes.sort(function(a,b){return b.count - a.count})
	return sortedCountTypes
}

const sortedFilmType = sortedCountFilmingTypes()
for(let i of sortedFilmType)
{
	for(var key in i){
		console.log(key + " : " + i[key])
	}
}

/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration

function longestFilmingLocations(){
	let longestDuration = 0;
	let result=[];
	for(let i of filmingLocations)
	{
		const currentDuration = new Date(i.fields.date_fin)-new Date(i.fields.date_debut);
		if(currentDuration>longestDuration)
		{
			longestDuration = currentDuration;
			result=[i.fields.adresse_lieu,duration(longestDuration)];
		}
	}
	return result
}

console.log("Le filming le plus long a été tourné à "+ longestFilmingLocations()[0]+ " et dure " + longestFilmingLocations()[1])

// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result

function averageFilmingDuration() {
	let averageDuration = 0;
	for(let i of filmingLocations){
		averageDuration+= new Date(i.fields.date_fin) - new Date(i.fields.date_debut);
	}
	averageDuration = averageDuration/filmingLocations.length
	return duration(averageDuration)
}

console.log('La durée moyenne d\'un filming de cette base de données est de : ' + averageFilmingDuration())