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
            <h1 className='title is-2' style={{textAlign: 'center', color: theme.text_color}}>Learn more about your favorites!</h1>
            <p style={{color: theme.text_color}}>Search here!</p>
            <input style={{backgroundColor: theme.text_box, color: 'white'}} 
            value={text}  
            onChange={(e) => setText(e.target.value)} 
            className='input' type='text' 
            onKeyUp={e => setType(submit(e))}></input>
            { type === '' ?
            <div style ={{color: theme.text_color}}>
                
            </div>
            :
            type === 'character' ?
            <div>
                <h1 className='title is-2' style={{textAlign: 'center', color: theme.text_color}}>Character</h1>
                <div className='container'>
                    <div className='columns is-multiline' style={{color: theme.text_color}}>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Name: {characters[charID].name}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Height: {characters[charID].height}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Mass: {characters[charID].mass}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Hair Color: {characters[charID].hair_color}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Skin Color: {characters[charID].skin_color}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Birth Year: {characters[charID].birth_year}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Gender: {characters[charID].gender}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Home Planet: {findPlanet(characters[charID].homeworld)}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Films: {findFilm(characters[charID].films).map(film => <li key={film}>{film}</li>)}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Species: {findSpecies(characters[charID].species[0])}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Vehicles: {findVehicles(characters[charID].vehicles).map(vehicle => <li key={vehicle}>{vehicle}</li>)}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Starships: {findStarships(characters[charID].starships).map(starship => <li key={starship}>{starship}</li>)}</p>
                        </div>
                    </div>
                </div>
            </div>

            : type === 'film' ?
            <div>
                <h1 className='title is-2' style={{textAlign: 'center', color: theme.text_color}}>Film</h1>
                <div className='container'>
                    <div className='columns is-multiline' style={{textAlign: 'center', color: theme.text_color}}>
                        <div className='column is-4' style={{textAlign: 'center'}}>
                            <p>Title: {films[charID].title}</p>
                        </div>
                        <div className='column is-4' style={{textAlign: 'center'}}>
                            <p>Episode: {films[charID].episode_id}</p>
                        </div>
                        <div className='column is-4' style={{textAlign: 'center'}}>
                            <p>Release Date: {films[charID].release_date}</p>
                        </div>
                        <div className='column is-4' style={{textAlign: 'center'}}>
                            <p>Planets Visited: {findPlanets(films[charID].planets).map(planet => <li key={planet}>{planet}</li>)}</p>
                        </div>
                        <div className='column is-4' style={{textAlign: 'center'}}>
                            <p>Opening Crawl:</p>
                            <p>"{films[charID].opening_crawl}"</p>
                        </div>
                        <div className='column is-4' style={{textAlign: 'center'}}>
                            <p>Characters: {findCharacter(films[charID].characters).map(character => <li key={character}>{character}</li>)}</p>
                        </div>
                    </div>
                </div>
            </div>

            : type === 'species' ?
            <div>
                <h1 className='title is-2' style={{textAlign: 'center', color: theme.text_color}}>Species</h1>
                <div className='container'>
                    <div className='columns is-multiline' style={{color: theme.text_color}}>
                        <div className='column is-3 ' style={{textAlign: 'center'}}>
                            <p>Name: {species[charID].name}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Classification: {species[charID].classification}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Average Height: {species[charID].average_height}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Skin Colors: {species[charID].skin_colors}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Eye Colors: {species[charID].eye_colors}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Average Lifespan: {species[charID].average_lifespan}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Home World: {findPlanet(species[charID].homeworld)}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Language: {species[charID].language}</p>
                        </div>
                    </div>
                </div>
            </div>

            : type === 'vehicle' ?
            <div>
                <h1 className='title is-2' style={{textAlign: 'center', color: theme.text_color}}>Vehicle</h1>
                <div className='container'>
                    <div className='columns is-multiline' style={{color: theme.text_color}}>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Name: {vehicles[charID].name}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Model: {vehicles[charID].model}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Manufacturer: {vehicles[charID].manufacturer}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Cost: {vehicles[charID].cost_in_credits} credits</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Max speed: {vehicles[charID].max_atmosphering_speed}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Passenger Capacity: {vehicles[charID].passengers}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Pilots: {findCharacter(vehicles[charID].pilots).map(pilot => <li key={pilot}>{pilot}</li>)}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Films Seen: {findFilm(vehicles[charID].films).map(film => <li key={film}>{film}</li>)}</p>
                        </div>
                    </div>
                </div>
            </div>

            : type === 'starship' ?
            <div>
                <h1 className='title is-2' style={{textAlign: 'center', color: theme.text_color}}>Starship</h1>
                <div className='container'>
                    <div className='columns is-multiline' style={{color: theme.text_color}}>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Name: {starships[charID].name}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Model: {starships[charID].model}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Manufacturer: {starships[charID].manufacturer}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Cost: {starships[charID].cost_in_credits} credits</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Max speed: {starships[charID].max_atmosphering_speed}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Crew Count: {starships[charID].crew}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Passengers: {starships[charID].passengers}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Hyperdrive Rating: {starships[charID].hyperdrive_rating}</p>
                        </div>
                    </div>
                </div>
            </div>

            : type === 'planet' ?
            <div>
                <h1 className='title is-2' style={{textAlign: 'center', color: theme.text_color}}>Planet</h1>
                <div className='container'>
                    <div className='columns is-multiline' style={{color: theme.text_color}}>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Name: {planets[charID].name}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Diameter: {planets[charID].diameter}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Climate: {planets[charID].climate}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Gravity: {planets[charID].gravity}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Terrain: {planets[charID].terrain}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Population: {planets[charID].population}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Known Residents: {findCharacter(planets[charID].residents).map(resident => <li key={resident}>{resident}</li>)}</p>
                        </div>
                        <div className='column is-3' style={{textAlign: 'center'}}>
                            <p>Films Seen: {findFilm(planets[charID].films).map(film => <li key={film}>{film}</li>)}</p>
                        </div>
                    </div>
                </div>
            </div>

            :
            <div>
                <h1 className ='title is-2' style ={{textAlign: 'center', color: theme.text_color}}>Not Found</h1>
            </div>
            }
        </div>
    )
}   




export default SingleSearch