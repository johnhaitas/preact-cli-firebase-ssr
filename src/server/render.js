import { h } from 'preact';
import render from 'preact-render-to-string';

const windowVarScript = (name, value) => `<script>window.${name}=${JSON.stringify(value)}</script>`;

export const rendererGenerator = (template, Root) => {
	const headTag = '<head>',
		bodyTag = '<body>';
	return props => {
		const { store } = props,
			app = render(h(Root, props)),
			head = windowVarScript('__STORE_STATE', store.getState()),
			// things you might do with `head` here ...
			// * use Helmet for page title and/or OpenGraph https://github.com/nfl/react-helmet#server-usage
			// * write the unistore or redux store state after render
			//   * prepopulate client store in src/index.js getProps() function
			renderedTemplate = template
				.replace(headTag, headTag + head)
				.replace(bodyTag, bodyTag + app);
		return renderedTemplate;
	};
};
