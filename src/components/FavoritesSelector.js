import React from 'react'
import { useState } from 'react'
import FavoritesSelectorItem from './FavoritesSelectorItem';

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
        setMatches([]);
        setText('');
        updateFavorites(newText);

    }

    // Handles while a user is typing
    const submit = (e) => {
        let found = false;
        let res = '';

        // If the user hits enter
        if (e.keyCode === 13) {
            if (type.includes('Film')) {
                list.forEach(item => {
                    if (item.title.toLowerCase() === text.toLowerCase()) {
                        res = item.title;
                        found = true;
                    }
                })
            }
            else {
                list.forEach(item => {
                    if (item.name.toLowerCase() === text.toLowerCase()) {
                        found = true;
                        res = item.name;
                    }
                })
            }
            if (found) {
                updateFavorites(res);
                setText('');
                setMatches([]);
                return;
            }
        }
    }

    return (
          <div className='column is-2'>
            <div className='box' style={{backgroundColor: theme.second, color: theme.first === 'black' ? 'black': 'white'}}>
              <h1 className='title is-6' style={{color: theme.first === 'black' ? 'black': 'white'}}>Favorite {type}:</h1>
              <h1 className='title is-6' style={{color: theme.first === 'black' ? 'black': 'white'}}>{currentFavorite === null ? 'None': currentFavorite}</h1>
              <input style={{backgroundColor: theme.text_box, color: 'white'}} className='input' type='text' value={text}
              onChange={(e) => {setText(e.target.value); search(e.target.value)}}
              onKeyDown={(e) => submit(e)}></input>
              {matches.length === 0 ? 
              <div></div>
              :
              matches[0] === 'No Matches' ?
              <div>No Matches</div>
              :
              matches.map((match) => <FavoritesSelectorItem key={match} match={match} onClick={updateText}/>)}
            </div>
          </div>
    )
}
export default FavoritesSelector
