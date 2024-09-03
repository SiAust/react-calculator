function NumberButton({handleNumberInput, symbol, id}) {
    return (
        <button
            id={id}
            tabIndex={symbol}
            className="interface-btn number-btn"
            onClick={handleNumberInput}
            value={symbol}
            aria-label={`${id === "decimal" ? "Decimal" : `Number ${id}`} button`}
        >
           {symbol}
        </button>
    )
}

export default NumberButton;