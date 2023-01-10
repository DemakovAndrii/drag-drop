import "./App.css";
import { useState } from "react";

function App() {
	const [drag, setDrag] = useState(false);

	const dragStartHandler = (e) => {
		e.preventDefault();
		setDrag(true);
	};

	const dragLeaveHandler = (e) => {
		e.preventDefault();
		setDrag(false);
	};
	const dropHandler = (e) => {
		e.preventDefault();
		let files = [...e.dataTransfer.files];
		console.log(files);
		setDrag(false);
	};

	return (
		<div className="app">
			{drag ? (
				<div
					className="drop-area"
					onDragStart={(e) => dragStartHandler(e)}
					onDragLeave={(e) => dragLeaveHandler(e)}
					onDragOver={(e) => dragStartHandler(e)}
					onDrop={(e) => dropHandler(e)}
				>
					drop here
				</div>
			) : (
				<div
					onDragStart={(e) => dragStartHandler(e)}
					onDragLeave={(e) => dragLeaveHandler(e)}
					onDragOver={(e) => dragStartHandler(e)}
				>
					move here
				</div>
			)}
		</div>
	);
}

export default App;
