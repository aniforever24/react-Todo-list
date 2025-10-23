import React, { useState, useEffect } from "react";
import "./App.css";
import "./Fonts.css";
import Navbar from "./components/Navbar";
import AddTodo from "./components/AddTodo";
import Btn from "./components/Btn";
import Todo from "./components/Todo";
import { FaSave } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

function App() {
	/* const [todos, setTodos] = useState(() => {
		if (localStorage.getItem("todos")) {
			const todos = JSON.parse(localStorage.getItem("todos"));
			return todos;
			} else return [];
			}); */

	// todos - an array of object contains all todo list and its id
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState("");
	const [showFinished, setShowFinished] = useState(false);

	useEffect(() => {
		// console.log('showFinished: ', showFinished)
	}, [showFinished]);

	const handleAdd = () => {
		if (todo && todo.trim() !== "")
			setTodos((prevTodos) => {
				const newTodo = { todo, id: uuidv4() };
				localStorage.setItem("todos", JSON.stringify([...prevTodos, newTodo]));
				return [...prevTodos, newTodo];
			});
		setTodo("");
	};

	const handleDelete = (todoId) => {
		const index = todos.findIndex((todo) => {
			return todo.id === todoId;
		});
		// store a shallow copy of todos in newTodos
		let newTodos = [...todos];
		// delete todo object element at index 1 in newTodos
		newTodos.splice(index, 1);
		// update todos state
		setTodos(() => {
			localStorage.setItem("todos", JSON.stringify(newTodos));
			if (newTodos.length === 0) localStorage.clear();
			return newTodos;
		});
	};

	useEffect(() => {
		if (localStorage.getItem("todos"))
			setTodos(JSON.parse(localStorage.getItem("todos")));
	}, []);

	return (
		<>
			<Navbar />
			<motion.main
				className="border md:w-[600px] w-[90vw] h-[80vh] px-5 py-5 my-3 select-none  font-[inter] mx-auto shadow-lg bg-[#fff4ff] overflow-hidden"
				initial={{ opacity: 0, scale: 0 }}
				animate={{
					opacity: 1,
					scale: 1,
					transition: {
						duration: 1,
					},
				}}
			>
				<h1 className="font-bold text-center text-xl mb-5">
					iTask - Manage your todos at one place
				</h1>
				<div className="addTodo m-auto w-full">
					<h2 className="text-left text-lg font-bold my-3">Add a Todo</h2>
					<div className="flex items-center gap-2 w-full">
						<AddTodo value={todo} onChange={setTodo} onSubmit={handleAdd} />
						<Btn
							btnText={<FaSave style={{ color: "snow", fontSize: "20" }} />}
							title="Save"
							onClick={handleAdd}
						/>
					</div>
				</div>
				<div className="finished flex items-center justify-start gap-2 my-3">
					<input
						className=""
						type="checkbox"
						name="finished"
						id="finished"
						checked={showFinished}
						onChange={(e) => setShowFinished(!showFinished)}
					/>
					<label
						className={!showFinished ? "font-semibold" : "font-bold"}
						htmlFor="finished"
					>
						Show Finished
					</label>
				</div>
				<div className="boorderline mx-auto w-[90%] h-[1px] bg-gray-200 "></div>

				<div className="todosContainer my-3 w-full overflow-y-auto overflow-x-hidden px-2 relative">
					<h2 className="font-bold text-lg mb-2 sticky top-0 backdrop-blur-md z-10 w-1/2">Your Todos</h2>
					<div className="todos flex flex-col gap-0 justify-start w-full">
						{todos.length === 0 ? (
							<span className="mx-3 my-2">No Task to Show!</span>
						) : (
							todos.map((item) => {
								return (
									<Todo
										key={item.id}
										val={item.todo}
										id={item.id}
										handleDelete={handleDelete}
										showFinished={showFinished}
									/>
								);
							})
						)}
					</div>
				</div>
			</motion.main>
		</>
	);
}

export default App;
