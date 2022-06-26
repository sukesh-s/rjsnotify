import React from 'react';
import './App.css';
import Notification, { notify } from 'rjsnotify';

function App() {
	const topRight = () => {
		notify({ message: 'Hello world', placement: 'TOP_RIGHT' });
	};
	const topLeft = () => {
		notify({ message: 'Hello world', placement: 'TOP_LEFT', type: 'info' });
	};
	const bottomLeft = () => {
		notify({ message: 'Hello world', placement: 'BOTTOM_LEFT', type: 'info' });
	};
	const bottomRight = () => {
		notify({ message: 'Hello world', placement: 'BOTTOM_RIGHT', type: 'info' });
	};
	return (
		<div className="App">
			<Notification />
			<button onClick={topRight}>Top-Right</button>
			<button onClick={topLeft}>Top-Left</button>
			<button onClick={bottomLeft}>Bottom-Left</button>
			<button onClick={bottomRight}>Bottom-Right</button>
		</div>
	);
}

export default App;
