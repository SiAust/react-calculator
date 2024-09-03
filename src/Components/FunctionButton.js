function FunctionButton({handleFunctionInput, label, id}) {
    return (
        <button
            id={id}
            className="interface-btn function-btn"
            onClick={handleFunctionInput}
            value={label}
        >
            {label}
        </button>
    )
}

export default FunctionButton;