import { useState } from "react";
import "./App.css";

function App() {
	const [cardList, setCardList] = useState([
		{ id: 1, order: 1, text: "1" },
		{ id: 2, order: 2, text: "2" },
		{ id: 3, order: 3, text: "3" },
		{ id: 4, order: 4, text: "4" },
	]);
	const [curentCard, setCurentCard] = useState(null);

	const dragStartHandler = (e, card) => {
		setCurentCard(card);
	};

	const dragEndHandler = (e) => {
		e.target.style.background = "#fff";
	};

	const dragOverHandler = (e) => {
		e.preventDefault();
		e.target.style.background = "#f1f1f1";
	};

	const dropHandler = (e, card) => {
		e.preventDefault();
		setCardList(
			cardList.map((c) => {
				if (c.id === card.id) {
					return { ...c, order: curentCard.order };
				}
				if (c.id === curentCard.id) {
					return { ...c, order: card.order };
				}
				return c;
			})
		);
		e.target.style.background = "#fff";
	};

	const sortCard = (a, b) => {
		if (a.order > b.order) {
			return 1;
		} else {
			return -1;
		}
	};
	return (
		<div className="app">
			{cardList.sort(sortCard).map((card) => (
				<div
					className="card"
					key={card.text}
					onDragStart={(e) => dragStartHandler(e, card)}
					onDragLeave={(e) => dragEndHandler(e)}
					onDragEnd={(e) => dragEndHandler(e)}
					onDragOver={(e) => dragOverHandler(e)}
					onDrop={(e) => dropHandler(e, card)}
					draggable={true}
				>
					{card.text}
				</div>
			))}
		</div>
	);
}

export default App;
