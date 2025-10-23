import React from "react";
import "./css/AddTodo.css";

// value = todo, onChange = setTodo, onSubmit = handleAdd
const AddTodo = ({ value, onChange, onSubmit }) => {
	return (
		<input
			className="addTodo border border-violet-100 focus:bg-violet-100 focus-within:outline-violet-400 rounded-2xl w-full px-3 py-1 text-violet-800 font-[600]"
			type="text"
			name="addTodo"
			value={value}
			onChange={(e) =>
				onChange(() => {
					return e.target.value;
				})
			}
			title="Add a Task"
		/>
	);
};

export default AddTodo;
