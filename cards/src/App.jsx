import "./App.css";
import { useState } from "react";

function App() {
	const [boards, setBoards] = useState([
		{
			id: 1,
			title: "Board 1",
			items: [
				{ id: 1, title: "task 1" },
				{ id: 2, title: "task 2" },
				{ id: 3, title: "task 3" },
			],
		},
		{
			id: 2,
			title: "Board 2",
			items: [
				{ id: 4, title: "task 4" },
				{ id: 5, title: "task 5" },
				{ id: 6, title: "task 6" },
			],
		},
		{
			id: 3,
			title: "Board 3",
			items: [
				{ id: 7, title: "task 7" },
				{ id: 8, title: "task 8" },
				{ id: 9, title: "task 9" },
			],
		},
	]);
	const [currentBoard, setCurrentBoard] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);

	const dragStartHandler = (e, board, item) => {
		setCurrentBoard(board);
		setCurrentItem(item);
	};

	const dragOverHandler = (e) => {
		e.preventDefault();
		if (e.target.className == "item") {
			e.target.style.boxShadow = "0 4px 3px gray";
		}
	};

	const dragLeaveHandler = (e) => {
		e.target.style.boxShadow = "none";
	};

	const dragEndHandler = (e) => {
		e.target.style.boxShadow = "none";
	};

	const dropHandler = (e, board, item) => {
		e.preventDefault();
		e.target.style.boxShadow = "none";
		const currentIndex = currentBoard.items.indexOf(currentItem);
		currentBoard.items.splice(currentIndex, 1);
		const dropIndex = board.items.indexOf(item);
		board.items.splice(dropIndex + 1, 0, currentItem);
		setBoards(
			boards.map((b) => {
				if (b.id === boards.id) {
					return board;
				}
				if (b.id === currentBoard.id) {
					return currentBoard;
				}
				return b;
			})
		);
	};

	const dropCardHandler = (e, board) => {
		board.items.push(currentItem);
		const currentIndex = currentBoard.items.indexOf(currentItem);
		currentBoard.items.splice(currentIndex, 1);
		setBoards(
			boards.map((b) => {
				if (b.id === boards.id) {
					return board;
				}
				if (b.id === currentBoard.id) {
					return currentBoard;
				}
				return b;
			})
		);
	};

	return (
		<div className="app">
			{boards.map((board) => {
				return (
					<div
						key={board.title}
						className="board"
						onDragOver={(e) => dragOverHandler(e)}
						onDrop={(e) => dropCardHandler(e, board)}
					>
						<div className="board__title">{board.title}</div>
						{board.items.map((item) => {
							return (
								<div
									key={item.title}
									className="item"
									draggable={true}
									onDragStart={(e) => dragStartHandler(e, board, item)}
									onDragOver={(e) => dragOverHandler(e)}
									onDragLeave={(e) => dragLeaveHandler(e)}
									onDragEnd={(e) => dragEndHandler(e)}
									onDrop={(e) => dropHandler(e, board, item)}
								>
									{item.title}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}

export default App;
