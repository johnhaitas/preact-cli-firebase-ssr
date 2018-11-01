import './style';
import App from './components/app';

import createHistory from 'history/createBrowserHistory';
import createStore from 'unistore';

const getProps = () => {
		const history = createHistory(),
			store = createStore(window.__STORE_STATE || {});
		// other things you might do here ...
		// * initialize something via a client-side configuration on the `window` object
		return { history, store };
	},
	props = getProps(),
	ClientEntry = () => (<App {...props} />);

export default ClientEntry;
