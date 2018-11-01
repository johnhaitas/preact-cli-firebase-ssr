import { h, Component } from 'preact';
import { connect } from 'unistore/preact';

import style from './style';

const actions = store => ({

	updateTime: () => ({ time: Date.now() }),
	
	increment: ({ count = 0 }) => ({ count: count + 1 })
});

class Profile extends Component {

	componentWillMount() {
		const { updateTime } = this.props;
		updateTime();
	}

	// gets called when this route is navigated to
	componentDidMount() {
		const { updateTime } = this.props;
		// start a timer for the clock:
		this.timer = setInterval(updateTime, 1000);
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ user, time, count, increment }) {
		return (
			<div class={style.profile}>
				<h1>Profile: {user}</h1>
				<p>This is the user profile for a user named { user }.</p>

				<div>Current time: {new Date(time).toLocaleString()}</div>

				<p>
					<button onClick={increment}>Click Me</button>
					{' '}
					Clicked {count} times.
				</p>
			</div>
		);
	}
}

const ConnectedProfile = connect(['time', 'count'], actions)(Profile);

export default ConnectedProfile;
