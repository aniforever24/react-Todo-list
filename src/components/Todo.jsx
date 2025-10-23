import React, { useState, useRef, useEffect } from "react";
import Btn from "./Btn";
import "./css/Todo.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const Todo = ({ val, id, handleDelete, showFinished }) => {
	const [isChecked, setIsChecked] = useState(() => {
		let lsTodos = JSON.parse(localStorage.getItem("todos"));
		let thisTodo = [];
		if (lsTodos) {
			thisTodo = lsTodos.filter((todo) => {
				return todo.id === id;
			});
			if (thisTodo[0].isChecked != null) return thisTodo[0].isChecked;
			return false;
		}
	});
	const [canEdit, setCanEdit] = useState(false);
	const [value, setValue] = useState(val);
	const refTodo = useRef(null);
	const style = {
		top: "8px",
	};

	const handleEdit = (Id) => {
		if (refTodo.current) {
			setValue(value.trim());
			refTodo.current.focus();
		}
		if (value.trim() !== "") setCanEdit(!canEdit);
	};

	const handleInput = (el) => {
		el.style.height = "auto";
		el.style.height = el.scrollHeight + "px";
	};

	useEffect(() => {
		handleInput(refTodo.current);
		const todos = JSON.parse(localStorage.getItem("todos"));
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.todo = value;
				todo.isChecked = isChecked;
			}
			return todo;
		});
		localStorage.setItem("todos", JSON.stringify(newTodos));
	}, [value, isChecked]);

	useEffect(() => {
		if (canEdit) {
			refTodo.current.focus();
		}
	}, [canEdit]);

	return (
		<div
			className={
				"todo flex items-baseline justify-start gap-2 select-none" +
				(showFinished || !isChecked ? "" : !canEdit ? " hidden" : "")
			}
		>
			<input
				type="checkbox"
				name="checkTodo"
				id="checkTodo"
				checked={isChecked}
				onChange={(e) => {
					setIsChecked(!isChecked);
				}}
			/>
			<textarea
				ref={refTodo}
				rows="1"
				className={
					"focus:bg-violet-100 focus-within:outline-violet-400 rounded-2xl w-full px-2 py-0 font-normal bg-transparent relative -top-[0.1rem] overflow-hidden min-h-[30px] resize-none text-justify" +
					(isChecked && !canEdit ? " line-through" : "") +
					(canEdit ? " bg-violet-100" : "")
				}
				type="text"
				name="todo"
				id={id}
				value={value}
				disabled={!canEdit}
				onChange={(e) => {
					setValue(() => e.target.value);
				}}
				onInput={(e) => {
					const el = e.target;
					handleInput(el);
				}}
			/>
			<Btn
				btnText={
					canEdit ? (
						<TiTick style={{ color: "snow", fontSize: "16" }} />
					) : (
						<CiEdit style={{ color: "snow", fontSize: "16" }} />
					)
				}
				title={canEdit ? "Done" : "Edit"}
				onClick={() => handleEdit(id)}
				style={style}
			/>
			<Btn
				btnText={<MdDelete style={{ color: "snow", fontSize: "16" }} />}
				title="Delete"
				onClick={() => handleDelete(id)}
				style={style}
			/>
		</div>
	);
};

export default Todo;
