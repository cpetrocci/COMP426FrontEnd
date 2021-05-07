import React from 'react'
import { useState } from 'react'

const SingleSearch = ({ characters, planets, films, vehicles, species, starships, theme }) => {
    const [text, setText] = useState('');
    const [charID, setCharID] = useState(null);
    const[type, setType] = useState('');

    const submit = (e) => {
        if(e.key !== 'Enter') return type;
        let currType = 'Not Found';
        let count = 0;
        characters.forEach(character => {
            if (character.name.toLowerCase() === text.toLowerCase()) {
                setCharID(count);
                currType = 'character';
                return;
            }
            count++;
            return;
        })
        count = 0
        films.forEach(film => {
            if (film.title.toLowerCase() === text.toLowerCase()) {
                setCharID(count);
                currType = 'film';
                return;
            }
            count++;
            return;
        })
        count = 0;
        starships.forEach(starship => {
            if (starship.name.toLowerCase() === text.toLowerCase()) {
                setCharID(count);
                currType = 'starship';
                return;
            }
            count++;
            return;
        })
        count = 0;
        vehicles.forEach(vehicle => {
            if (vehicle.name.toLowerCase() === text.toLowerCase()) {
                setCharID(count);
                currType = 'vehicle';
                return;
            }
            count++;
            return;
        })
        count = 0
        planets.forEach(planet => {
            if (planet.name.toLowerCase() === text.toLowerCase()) {
                setCharID(count);
                currType = 'planet';
                return;
            }
            count++;
            return;
        })
        count = 0
        species.forEach(specie => {
            if (specie.name.toLowerCase() === text.toLowerCase()) {
                setCharID(count);
                currType = 'species';
                return;
            }
            count++;
            return;
        })
        if (currType !== 'Not Found') {
            setText('');
        } 
        return currType;
    }
    const findCharacter = (urls) => {
        let found = ['unknown']
        urls.forEach(url => {
            characters.forEach(character => {
                if (character.url === url) {
                    if (found[0] === 'unknown') {
                        found[0] = character.name;
                    } else {
                        found.push(character.name);
                    }
                    return;
                }
            })
            return;
        })
        return found;
    }
    
    const findPlanet = (url) => {
        let found = 'unknown';
        planets.forEach(planet => {
            if (planet.url === url) {
                found = planet.name;
            }
            return;
        })
        return found;
    }

    const findPlanets = (urls) => {
        let found = ['unknown'];
        urls.forEach(url => {
            planets.forEach(planet => {
                if (planet.url === url) {
                    if (found[0] === 'unknown') {
                        found[0] = planet.name;
                    } else {
                        found.push(planet.name);
                    }
                }
            })
        })
        return found;
    }

    const findFilm = (urls) => {
        let found = ['unknown'];
        urls.forEach(url => {
            films.forEach(film => {
                if (film.url === url) {
                    if (found[0] === 'unknown') {
                        found[0] = film.title;
                    } else {
                        found.push(film.title);
                    }
                }
                return;
            })
            return;
        })
        return found;
    }

    const findSpecies = (url) => {
        let found = 'Human';
        species.forEach(specie => {
            if (specie.url === url) {
                found = specie.name;
            }
            return;
        })
        return found;
    }
    
    const findVehicles = (urls) => {
        let found = ['unknown'];
        urls.forEach(url => {
            vehicles.forEach(vehicle => {
                if (vehicle.url === url) {
                    if (found[0] === 'unknown') {
                        found[0] = vehicle.name;
                    } else {
                        found.push(vehicle.name);
                    }
                    return;
                }
                return;
            })
            return;
        })
        return found;
    }
    
    const findStarships = (urls) => {
        let found = ['unknown'];
        urls.forEach(url => {
            starships.forEach(starship => {
                if (starship.url === url) {
                    if (found[0] === 'unknown') {
                        found[0] = starship.name;
                    } else {
                        found.push(starship.name);
                    }
                    return;
                }
                return;
            })
            return;
        })
        return found;

    }


    return(
        <div className='box' style={{backgroundColor: theme.first}}>
            <h1 className='title is-2' style={{textAlign: 'center', color: theme.text_color}}>Learn more about your favorite Star Wars characters!</h1>
            <p style={{color: theme.text_color}}>Type your characters name here:</p>
            <input style={{backgroundColor: theme.text_box, color: 'white'}} 
            value={text}  
            onChange={(e) => setText(e.target.value)} 
            className='input' type='text' 
            onKeyUp={e => setType(submit(e))}></input>
            { type === '' ?
            <div style ={{color: theme.text_color}}>
                Search here!
            </div>
            :
            type === 'character' ?
            <div className='container'>
                <div className='columns is-multiline' style={{color: theme.text_color}}>
                    <div className='column is-3'>
                        <p>Name: {characters[charID].name}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Height: {characters[charID].height}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Mass: {characters[charID].mass}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Hair Color: {characters[charID].hair_color}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Skin Color: {characters[charID].skin_color}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Birth Year: {characters[charID].birth_year}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Gender: {characters[charID].gender}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Home Planet: {findPlanet(characters[charID].homeworld)}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Films: {findFilm(characters[charID].films).map(film => <li key={film}>{film}</li>)}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Species: {findSpecies(characters[charID].species[0])}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Vehicles: {findVehicles(characters[charID].vehicles).map(vehicle => <li key={vehicle}>{vehicle}</li>)}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Starships: {findStarships(characters[charID].starships).map(starship => <li key={starship}>{starship}</li>)}</p>
                    </div>
                </div>
            </div>

            : type === 'film' ?
            <div className='container'>
                <div className='columns is-multiline' style={{color: theme.text_color}}>
                    <div className='column is-2'>
                        <p>Title: {films[charID].title}</p>
                    </div>
                    <div className='column is-2'>
                        <p>Episode: {films[charID].episode_id}</p>
                    </div>
                    <div className='column is-6'>
                        <p>Opening Crawl: {films[charID].opening_crawl}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Characters: {findCharacter(films[charID].characters).map(character => <li key={character}>{character}</li>)}</p>
                    </div>
                    <div className='column is-2'>
                        <p>Planets Visited: {findPlanets(films[charID].planets).map(planet => <li key={planet}>{planet}</li>)}</p>
                    </div>
                    <div className='column is-2'>
                        <p>Release Date: {films[charID].release_date}</p>
                    </div>
                </div>
            </div>

            : type === 'species' ?
            <div className='container'>
                <div className='columns is-multiline' style={{color: theme.text_color}}>
                    <div className='column is-3'>
                        <p>Name: {species[charID].name}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Classification: {species[charID].classification}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Average Height: {species[charID].average_height}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Skin Colors: {species[charID].skin_colors}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Eye Colors: {species[charID].eye_colors}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Average Lifespan: {species[charID].average_lifespan}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Home World: {findPlanet(species[charID].homeworld)}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Language: {species[charID].language}</p>
                    </div>
                </div>
            </div>

            : type === 'vehicle' ?
            <div className='container'>
                <div className='columns is-multiline' style={{color: theme.text_color}}>
                    <div className='column is-3'>
                        <p>Name: {vehicles[charID].name}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Model: {vehicles[charID].model}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Manufacturer: {vehicles[charID].manufacturer}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Cost: {vehicles[charID].cost_in_credits} credits</p>
                    </div>
                    <div className='column is-3'>
                        <p>Max speed: {vehicles[charID].max_atmosphering_speed}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Passenger Capacity: {vehicles[charID].passengers}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Pilots: {findCharacter(vehicles[charID].pilots).map(pilot => <li key={pilot}>{pilot}</li>)}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Films Seen: {findFilm(vehicles[charID].films).map(film => <li key={film}>{film}</li>)}</p>
                    </div>
                </div>
            </div>

            : type === 'starship' ?
            <div className='container'>
                <div className='columns is-multiline' style={{color: theme.text_color}}>
                    <div className='column is-3'>
                        <p>Name: {starships[charID].name}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Model: {starships[charID].model}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Manufacturer: {starships[charID].manufacturer}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Cost: {starships[charID].cost_in_credits} credits</p>
                    </div>
                    <div className='column is-3'>
                        <p>Max speed: {starships[charID].max_atmosphering_speed}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Crew Count: {starships[charID].crew}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Passengers: {starships[charID].passengers}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Hyperdrive Rating: {starships[charID].hyperdrive_rating}</p>
                    </div>
                </div>
            </div>

            : type === 'planet' ?
            <div className='container'>
                <div className='columns is-multiline' style={{color: theme.text_color}}>
                    <div className='column is-3'>
                        <p>Name: {planets[charID].name}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Diameter: {planets[charID].diameter}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Climate: {planets[charID].climate}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Gravity: {planets[charID].gravity}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Terrain: {planets[charID].terrain}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Population: {planets[charID].population}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Known Residents: {findCharacter(planets[charID].residents).map(resident => <li key={resident}>{resident}</li>)}</p>
                    </div>
                    <div className='column is-3'>
                        <p>Films Seen: {findFilm(planets[charID].films).map(film => <li key={film}>{film}</li>)}</p>
                    </div>
                </div>
            </div>

            :
            <div>
                Not Found
            </div>
            }
        </div>
    )
}   




export default SingleSearch