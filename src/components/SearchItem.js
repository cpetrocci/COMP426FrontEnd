import React from 'react'
import { useState } from 'react'

const SearchItem = ({ match, onClick }) => {
    const [stylePadding, setStylePadding] = useState('1px');
    const [styleBorder, setStyleBorder] = useState('');


    return (
        <div key={match} style={{paddingLeft: stylePadding, borderColor: 'white', border: styleBorder}} 
        onMouseEnter={() => {setStylePadding('10px'); setStyleBorder('inset')}}
        onMouseLeave={() => {setStylePadding('1px'); setStyleBorder('')}}
        onClick={() => onClick(match)}>{match}</div>
    )
}

export default SearchItem
