import React from "react";

class Count extends React.Component {
	state = { count: 0 };

	onIncrement = () => {
		if (this.state.count >= 5) return;
		this.setState((s) => {
			return {
				count: ++s.count,
			};
		});
	};

	render() {
		return (
			<>
				<div>Count: {this.state.count}</div>
				<button onClick={this.onIncrement}>increment</button>
			</>
		);
	}
}

export default Count;

////////////////////  2

import React from "react";

class Count extends React.Component {
	state = { count: 0, intervalId: null };

	componentDidMount() {
		const id = setInterval(() => {
			this.setState((s) => {
				return { ...s, count: ++s.count };
			});
		}, 1000);

		this.setState({ intervalId: id });
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.count >= 5) clearInterval(this.state.intervalId);
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	render() {
		return (
			<>
				<div>Count: {this.state.count}</div>
			</>
		);
	}
}

export default Count;

//////// second variant

import React from "react";

class Count extends React.Component {
	state = { count: 0, intervalId: null };

	start = () => {
		if (this.state.count >= 5) {
			this.stop();
			return;
		}

		const id = setTimeout(() => {
			this.setState((s) => {
				return { count: s.count + 1 };
			}, this.start);
		}, 1000);

		this.setState({ intervalId: id });
	};

	stop = () => {
		clearTimeout(this.state.intervalId);
	};

	componentDidMount() {
		this.start();
	}

	render() {
		return (
			<>
				<div>Count: {this.state.count}</div>
			</>
		);
	}
}

export default Count;

////////////////////  3

import React from "react";

class Count extends React.Component {
	state = {
		data: {
			name: "root",
			children: [
				{ name: "a", children: [] },
				{ name: "b", children: [{ name: "b1", children: [] }] },
			],
		},
	};

	renameNode = (name, newName) => {
		const recursiveRenameNode = (node, newNode) => {
			if (node.name === name) {
				newNode.name = newName;
			} else {
				newNode.name = node.name;
			}

			newNode.children = node.children.map((child) =>
				recursiveRenameNode(child, {})
			);

			return newNode;
		};

		this.setState({ data: recursiveRenameNode(this.state.data, {}) });
	};

	componentDidMount() {
		this.renameNode("b1", "test");
	}

	render() {
		return (
			<>
				<div>Count: {this.state.count}</div>
				<button onClick={() => console.log(this.state.data)}>dsadasdas</button>
			</>
		);
	}
}

export default Count;
