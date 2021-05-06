import { useState, useEffect } from 'react'
import SignUpForm from './components/SignUpForm';
import axios from 'axios'
import SignedIn from './components/SignedIn';
import LogInForm from './components/LogInForm';
import Button from './components/Button';
import FavoritesSelector from './components/FavoritesSelector';
import SithTranslator from './components/SithTranslator';
import SingleSearch from './components/SithTranslator';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 
  const [theme, setTheme] = useState({});
  const [favorites, setFavorites] = useState({})
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [species, setSpecies] = useState([]);
  const [planets, setPlanets] = useState([]);




  const getTheme = async (tid) => {
    const res = await axios({
      method: 'get',
      url: 'https://colepetrocci.pythonanywhere.com/theme/' + tid
    });
    return res.data;
  }

  const updateUser = async () => {
    const res = await axios({
      method: 'get',
      url: 'https://colepetrocci.pythonanywhere.com/user/' + user.username
    })
    setUser(res.data);
  }

  const signedUp = async ({ userText, tid }) => {
    const res = await axios({
      method: 'get',
      url: 'https://colepetrocci.pythonanywhere.com/user/' + userText
    });
    await updateUserTheme(userText, tid);
    setTheme(await getTheme(tid));
    setFavorites(await getFavorites(res.data.id));
    setUser(res.data);
    setLoggedIn(true);
  }

  const logIn = async (userText) => {
    const res = await axios({
      method: 'get',
      url: 'https://colepetrocci.pythonanywhere.com/user/' + userText,
    });
    setTheme(await getTheme(res.data.tid));
    setFavorites(await getFavorites(res.data.id));
    setUser(res.data);
    setLoggedIn(true);
  }

  const updateUserTheme = async (userText, tid) => {
    await axios({
      method: 'put',
      url: 'https://colepetrocci.pythonanywhere.com/user/' + userText,
      data: {
        tid: tid
      }
    });
  }

  const updateShowLogIn = () => {
    setShowLogIn(previous => !previous);
  }

  const updateShowSignUp = () => {
    setShowSignUp(previous => !previous);
  }

  const logOut = () => {
    setShowSignUp(false);
    setShowLogIn(false);
    setLoggedIn(false);
    setUser(null);
    setTheme(null)
    setFavorites(null);
  }

  const getSWCharacters = async (url, arr, int) => {
    const res = await axios({
      method: 'get',
      url: url
    });
    res.data.results.forEach(person => arr.push(person));
    if(res.data.next === null) {
      setCharacters(arr);
      return;
    }
    let newUrl = 'https://swapi.dev/api/people/?page=' + int;
    getSWCharacters(newUrl, arr, int+ 1);
  }
  const getSWFilms = async (url, arr, int) => {
    const res = await axios({
      method: 'get',
      url: url
    });
    res.data.results.forEach(person => arr.push(person));
    if(res.data.next === null) {
      setFilms(arr);
      return;
    }
    let newUrl = 'https://swapi.dev/api/films/?page=' + int;
    getSWFilms(newUrl, arr, int + 1);
  }
  const getSWStarships = async (url, arr, int) => {
    const res = await axios({
      method: 'get',
      url: url
    });
    res.data.results.forEach(person => arr.push(person));
    if(res.data.next === null) {
      setStarships(arr);
      return;
    }
    let newUrl = 'https://swapi.dev/api/starships/?page=' + int;
    getSWStarships(newUrl, arr, int + 1);
  }
  const getSWVehicles = async (url, arr, int) => {
    const res = await axios({
      method: 'get',
      url: url
    });
    res.data.results.forEach(person => arr.push(person));
    if(res.data.next === null) {
      setVehicles(arr);
      return;
    }
    let newUrl = 'https://swapi.dev/api/vehicles/?page=' + int;
    getSWVehicles(newUrl, arr, int + 1);
  }
  const getSWSpecies = async (url, arr, int) => {
    const res = await axios({
      method: 'get',
      url: url
    });
    res.data.results.forEach(person => arr.push(person));
    if(res.data.next === null) {
      setSpecies(arr);
      return;
    }
    let newUrl = 'https://swapi.dev/api/species/?page=' + int;
    getSWSpecies(newUrl, arr, int + 1);
  }
  const getSWPlanets = async (url, arr, int) => {
    const res = await axios({
      method: 'get',
      url: url
    });
    res.data.results.forEach(person => arr.push(person));
    if(res.data.next === null) {
      setPlanets(arr);
      return;
    }
    let newUrl = 'https://swapi.dev/api/planets/?page=' + int;
    getSWPlanets(newUrl, arr, int + 1);
  }
  const getFavorites = async(id) => {
    const res = await axios({
      method: 'get',
      url: 'https://colepetrocci.pythonanywhere.com/favorites/' + id
    })
    return res.data;
  }

  const updateCharacter = async(fav) => {
    await axios({
      method: 'put',
      url: 'https://colepetrocci.pythonanywhere.com/favorites/' + user.id,
      data: {
        "character": fav,
        "film": favorites.film === null ? null: favorites.film,
        "starship": favorites.starship === null ? null: favorites.starship,
        "vehicle": favorites.vehicle === null ? null: favorites.vehicle,
        "species": favorites.species === null ? null: favorites.species,
        "planet": favorites.planet === null ? null: favorites.planet
      }
    });
    setFavorites(await getFavorites(user.id));
  }
  const updateFilm = async(fav) => {
    await axios({
      method: 'put',
      url: 'https://colepetrocci.pythonanywhere.com/favorites/' + user.id,
      data: {
        "character": favorites.character === null ? null: favorites.character,
        "film": fav,
        "starship": favorites.starship === null ? null: favorites.starship,
        "vehicle": favorites.vehicle === null ? null: favorites.vehicle,
        "species": favorites.species === null ? null: favorites.species,
        "planet": favorites.planet === null ? null: favorites.planet
      }
    });
    setFavorites(await getFavorites(user.id));
  }
  const updateStarship = async(fav) => {
    await axios({
      method: 'put',
      url: 'https://colepetrocci.pythonanywhere.com/favorites/' + user.id,
      data: {
        "character": favorites.character === null ? null: favorites.character,
        "film": favorites.film === null ? null: favorites.film,
        "starship": fav,
        "vehicle": favorites.vehicle === null ? null: favorites.vehicle,
        "species": favorites.species === null ? null: favorites.species,
        "planet": favorites.planet === null ? null: favorites.planet
      }
    });
    setFavorites(await getFavorites(user.id));
  }
  const updateVehicle = async(fav) => {
    await axios({
      method: 'put',
      url: 'https://colepetrocci.pythonanywhere.com/favorites/' + user.id,
      data: {
        "character": favorites.character === null ? null: favorites.character,
        "film": favorites.film === null ? null: favorites.film,
        "starship": favorites.starship === null ? null: favorites.starship,
        "vehicle": fav,
        "species": favorites.species === null ? null: favorites.species,
        "planet": favorites.planet === null ? null: favorites.planet
      }
    });
    setFavorites(await getFavorites(user.id));
  }
  const updateSpecies = async(fav) => {
    await axios({
      method: 'put',
      url: 'https://colepetrocci.pythonanywhere.com/favorites/' + user.id,
      data: {
        "character": favorites.character === null ? null: favorites.character,
        "film": favorites.film === null ? null: favorites.film,
        "starship": favorites.starship === null ? null: favorites.starship,
        "vehicle": favorites.vehicle === null ? null: favorites.vehicle,
        "species": fav,
        "planet": favorites.planet === null ? null: favorites.planet
      }
    });
    setFavorites(await getFavorites(user.id));
  }
  const updatePlanet = async(fav) => {
    await axios({
      method: 'put',
      url: 'https://colepetrocci.pythonanywhere.com/favorites/' + user.id,
      data: {
        "character": favorites.character === null ? null: favorites.character,
        "film": favorites.film === null ? null: favorites.film,
        "starship": favorites.starship === null ? null: favorites.starship,
        "vehicle": favorites.vehicle === null ? null: favorites.vehicle,
        "species": favorites.species === null ? null: favorites.species,
        "planet": fav
      }
    });
    setFavorites(await getFavorites(user.id));
  }

  useEffect(() => {
    (async () => {
      await getSWCharacters('https://swapi.dev/api/people/', [], 2)
      await getSWFilms('https://swapi.dev/api/films/', [], 2)
      await getSWStarships('https://swapi.dev/api/starships/', [], 2)
      await getSWVehicles('https://swapi.dev/api/vehicles/', [], 2)
      await getSWSpecies('https://swapi.dev/api/species/', [], 2)
      await getSWPlanets('https://swapi.dev/api/planets/', [], 2)
  })()}, [])

  return (
    <div>
      {((showLogIn || showSignUp) && !loggedIn) && <Button className='button is-warning' onClick={logOut} text='Go Back'/>}
      {!loggedIn ?
      <section className='section' style={{padding: '150px', textAlign: 'center'}}>
        <div className='container'>
            <div className='columns is-centered'>
              <div className='column is-one-third'>
                {showLogIn || showSignUp ? 
                <div>
                  {showSignUp ? 
                  <div>
                    <h1 className='title is-1'>Sign Up!</h1>
                    <SignUpForm signedUp={signedUp}/>
                  </div> : 
                  <div>
                    <h1 className='title is-1'>Login!</h1>
                    <LogInForm logIn={logIn}/>
                  </div> }
                </div> : 
                <div>
                  <div className='box'>
                    <h1 className='title is-3'>New to the website? Click Sign Up.</h1>
                    <Button className='button is-info' onClick={updateShowSignUp} text='Sign Up'/>
                  </div>
                  <div className='box'>
                    <h1 className='title is-3'>Returning? Click Login.</h1>
                    <Button className='button is-info' onClick={updateShowLogIn} text='Login'/>
                  </div>
                </div>}
              </div>
            </div>
        </div>
      </section>: 
      <div>
        <div className='box'>
          <SithTranslator />
          {/* <SingleSearch /> */}
          <SignedIn user={user} logOut={logOut}/>
          <h1 className='title is-2' style={{textAlign: 'center'}}>Select all of your favorite things Star Wars!</h1>
          {theme.first.includes('black') ? 
          <Button text='Switch to the Light Side' className='button is-info is-large' onClick={async () => { await updateUserTheme(user.username, 2); setTheme(await getTheme(2)); updateUser()}}/>
          :
          <Button className='button is-danger is-large' text='Switch to the Dark Side' onClick={async () => {await updateUserTheme(user.username, 1); setTheme(await getTheme(1)); updateUser()}}/>}
        </div>
        <div className='columns is-multiline' style = {{padding: '20px'}}>
          <FavoritesSelector currentFavorite={favorites.character} list={characters} type='Character' theme={theme} updateFavorites={updateCharacter}/>
          <FavoritesSelector currentFavorite={favorites.film} list={films} type='Film' theme={theme} updateFavorites={updateFilm}/>
          <FavoritesSelector currentFavorite={favorites.starship} list={starships} type='Starship' theme={theme} updateFavorites={updateStarship}/>
          <FavoritesSelector currentFavorite={favorites.vehicle} list={vehicles} type='Vehicle' theme={theme} updateFavorites={updateVehicle}/>
          <FavoritesSelector currentFavorite={favorites.species} list={species} type='Species' theme={theme} updateFavorites={updateSpecies}/>
          <FavoritesSelector currentFavorite={favorites.planet} list={planets} type='Planet' theme={theme} updateFavorites={updatePlanet}/>
        </div>
      </div>
      
      
      
      
      
      
      }
    </div>
  );
}

export default App;
