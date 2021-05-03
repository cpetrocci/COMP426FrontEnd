const Button = ({text, onClick, className}) => {

    return (
        <button onClick={onClick} className={className} >{text}</button>
    )
}

Button.defaultProps = {
    text: 'Button'
}

export default Button
