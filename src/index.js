import './style';
import App from './components/app';

import createHistory from 'history/createBrowserHistory';
import createStore from 'unistore';
import devtools from 'unistore/devtools';

const getProps = () => {
		const history = createHistory(),
			initialState = window.__STORE_STATE || {},
			store = process.env.NODE_ENV === 'production' ?  createStore(initialState) : devtools(createStore(initialState));
		// other things you might do here ...
		// * initialize something via a client-side configuration on the `window` object
		return { history, store };
	},
	props = getProps(),
	ClientEntry = () => (<App {...props} />);

export default ClientEntry;
