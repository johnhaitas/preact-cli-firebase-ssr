import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'unistore/preact';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';

class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render({ history }) {
		return (
			<div id="app">
				<Header />
				<Router history={history} onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}

const ProvidedApp = ({ store, ...props }) => (
	<Provider store={store}>
		<App {...props} />
	</Provider>
);

export default ProvidedApp;
