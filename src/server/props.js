import createHistory from 'history/createMemoryHistory';

// Using async/await Promise.resolve to show you could do something asynchronous here - like an API request
export default () => async (request, response) => {
	const url = request.url || request.path || '/',
		history = createHistory({ initialEntries: [url] });
	return { history };
};
