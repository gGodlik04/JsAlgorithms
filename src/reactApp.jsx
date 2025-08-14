import React, { useEffect, useState, useCallback } from "react";

function getPeople(name, page = 1, options = {}) {
	return fetch(
		`https://rickandmortyapi.com/api/character?name=${name}&page=${page}`,
		options
	).then((res) => res.json());
}

const debounce = (cb, timeout) => {
	let timeoutKey = null;

	return function (...args) {
		clearTimeout(timeoutKey);

		return new Promise((resolve) => {
			timeoutKey = setTimeout(() => {
				resolve(cb(...args));
			}, timeout);
		});
	};
};

export default function App() {
	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [characterList, setCharacterList] = useState([]);
	const [characterListSearchError, setCharacterListSearchError] =
		useState(null);

	const debouncedGetPeople = useCallback(debounce(getPeople, 400), []);

	const searchPeopleByNameWithFetch = async () => {
		try {
			setIsLoading(true);
			const result = await debouncedGetPeople(search);
			console.log(result);

			if (result.error) {
				setCharacterList([]);
				setCharacterListSearchError(result.error);
			} else {
				setCharacterList(result.results);
				setCharacterListSearchError(null);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		searchPeopleByNameWithFetch();
	}, [search]);

	return (
		<div>
			<input
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			{isLoading && "Поиск"}
			{characterListSearchError && <div>{characterListSearchError}</div>}
			{characterList.length > 0 && (
				<ul>
					{characterList.map((character) => (
						<li key={character.id}>{character.name}</li>
					))}
				</ul>
			)}
		</div>
	);
}
