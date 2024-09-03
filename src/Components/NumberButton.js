function NumberButton({handleNumberInput, symbol, id}) {
    return (
        <button
            id={id}
            className="interface-btn number-btn"
            onClick={handleNumberInput}
            value={symbol}
        >
           {symbol}
        </button>
    )
}

export default NumberButton;