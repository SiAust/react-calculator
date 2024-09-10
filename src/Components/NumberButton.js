function NumberButton({handleInput, symbol, id}) {
    return (
        <button
            id={id}
            tabIndex={symbol}
            className="interface-btn number-btn"
            onClick={handleInput}
            value={symbol}
            aria-label={`${id === "decimal" ? "Decimal" : `Number ${id}`} button`}
        >
           {symbol}
        </button>
    )
}

export default NumberButton;