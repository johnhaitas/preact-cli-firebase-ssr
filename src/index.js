import './style';
import App from './components/app';

import createHistory from 'history/createBrowserHistory';

const getProps = () => {
		const history = createHistory();
		// other things you might do here ...
		// * initialize a client-side unistore or redux store
		//   * can receive an initial state written into `<head>` in server render
		return { history };
	},
	props = getProps(),
	ClientEntry = () => (<App {...props} />);

export default ClientEntry;
