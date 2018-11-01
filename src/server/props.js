import createHistory from 'history/createMemoryHistory';
import createStore from 'unistore';

// Using async/await Promise.resolve to show you could do something asynchronous here - like an API request
export default (baseState = {}) => async (request, response) => {
	const url = request.url || request.path || '/',
		history = createHistory({ initialEntries: [url] }),
		initialState = {
			...JSON.parse(JSON.stringify(baseState)), // don't mutate the `baseState`
			count: 0
		},
		store = createStore(initialState);
	// other things you might do here:
	// * asynchronously fetch data
	// * pre-populate a unistore or redux store before render
	// * check user authorization
	return { history, store };
};
