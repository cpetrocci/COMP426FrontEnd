import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const SithTranslator = ({ theme }) => {
    const [text, setText] = useState('');
    const [translated, setTranslated] = useState(false);
    const [translation, setTranslation] = useState('');

    const onClick = async (e) => {
        if (e.keyCode === 13 && text !== '') {
            setTranslated(true);

        const options = {
        method: 'GET',
        url: 'https://gungan.p.rapidapi.com/sith.json',
        params: {text: text},
        headers: {
            'x-rapidapi-key': '93ad29f8d4msha20aa9dc191e6a0p13cd76jsn1982245e2d3c',
            'x-rapidapi-host': 'sith.p.rapidapi.com'
        }
        };

        axios.request(options).then(function (response) {
            setTranslation(response.data.contents.translated);
        }).catch(function (error) {
            console.error(error);
        });

        }
    }
    return (
        <div className='box' style={{backgroundColor: theme.first}}>
            <h1 className='title is-4' style={{color: theme.text_color}}>Translate from English to Sith!</h1>
            <input style={{backgroundColor: theme.text_box, color: 'white'}} onKeyDown={async (e) => await onClick(e)} className='input' type='text' value={text} onChange={(e) => setText(e.target.value)} ></input>
            {translated && <p style={{color: theme.text_color}}>{translation}</p>}
        </div>
    )
}

export default SithTranslator
