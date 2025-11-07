import React, { useState, useEffect } from "react";

export function Root(props) {
	const [count, setCount] = useState(0);
	// const refCount =  useRef(count)

	useEffect(() => {
		// console.log(count, 'count');
		return () => {
			console.log(count);
		}; // 0ss
	}, []);

	useEffect(() => {
		console.log(count, "xuy");
	}, [count]);

	console.log(count, "count2");

	return (
		<div>
			<p
				onClick={() => {
					setCount(count + 1);
				}}
			>
				You clicked {count.value} times
			</p>
			<button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				Click me
			</button>
		</div>
	);
}

export function App() {
	const [show, setShow] = useState(true);

	return (
		<div>
			<button onClick={() => setShow(!show)}>
				{show ? "Unmount App" : "Mount App"}
			</button>
			{show && <Root />}
		</div>
	);
}

// Log to console
console.log("Hello console");
