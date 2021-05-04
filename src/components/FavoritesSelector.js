import React from 'react'
import { useState } from 'react'
import SearchItem from './SearchItem';

const FavoritesSelector = ({ currentFavorite, list, updateFavorites, type, theme}) => {
    const [text, setText] = useState('');
    const [matches, setMatches] = useState([]);

    const search = (currText) => {
        let temp = [];
        currText = currText.toLowerCase();
        if(currText === '') {
            setMatches([]);
            return;
        }
        if (type.includes('Film')) {
            list.forEach(character => {if(character.title.toLowerCase().includes(currText)){temp.push(character.title)}});
        } else {
            list.forEach(character => {if(character.name.toLowerCase().includes(currText)){temp.push(character.name)}});
        }
        if(temp.length === 0) {
            setMatches(['No Matches']);
            return;
        }
        setMatches(temp);
    }

    const updateText = (newText) => {
        setText(newText);
    }

    const submit = (e) => {
        let found = false;
        if (e.keyCode === 13) {
            matches.forEach(match => {
                if (match === text) {
                    found = true;
                }
            })
            if (found) {
                updateFavorites(text);
                setText('');
                setMatches([]);
                return;
            }
        }
    }

    return (
          <div className='column is-2'>
            <div className='box' style={{backgroundColor: theme.first, color: 'white'}}>
              <h1 className='title is-6' style={{color: 'white'}}>Favorite {type}:</h1>
              <h1 className='title is-6' style={{color: 'white'}}>{currentFavorite === null ? 'None': currentFavorite}</h1>
              <input style={{backgroundColor: theme.second, color: 'white'}} className='input' type='text' 
              placeholder={type.includes('Species') ? "Search Species'": 'Search ' + type + 's'} value={text} 
              onChange={(e) => {setText(e.target.value); search(e.target.value)}}
              onKeyDown={(e) => submit(e)}></input>
              {matches.map((match) => <SearchItem key={match} match={match} onClick={updateText}/>)}
            </div>
          </div>
    )
}
export default FavoritesSelector
