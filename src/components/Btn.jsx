import React from "react";

// onClick = handleAdd
const Btn = ({ btnText, title, onClick, style }) => {
	return (
		<button
			className="bg-violet-900 text-white text-sm px-3 py-1 rounded-2xl relative"
			onClick={(e) => onClick(e)}
			style={style}
		>
			{btnText}
			<span className="tooltip-text">{title}</span>
		</button>
	);
};

export default Btn;
