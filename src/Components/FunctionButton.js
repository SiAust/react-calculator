function FunctionButton({handleInput, label, id}) {
    return (
        <button
            id={id}
            className="interface-btn function-btn"
            onClick={handleInput}
            value={label}
            aria-label={`${id.charAt(0).toUpperCase() + id.slice(1)} button`}
        >
            {label}
        </button>
    )
}

export default FunctionButton;