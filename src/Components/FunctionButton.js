function FunctionButton({symbol, id}) {
    return (
        <button id={id} className="interface-btn">
            <span>{symbol}</span>
        </button>
    )
}

export default FunctionButton;