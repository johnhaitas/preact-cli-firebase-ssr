import './style';
import App from './components/app';

import createHistory from 'history/createBrowserHistory';

const getProps = () => {
		const history = createHistory();
		return { history };
	},
	props = getProps(),
	ClientEntry = () => (<App {...props} />);

export default ClientEntry;
