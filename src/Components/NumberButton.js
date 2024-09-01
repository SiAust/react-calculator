function NumberButton({digit, id}) {
    return (
        <button id={id} className="interface-btn" >
            {digit}
        </button>
    )
}

export default NumberButton;