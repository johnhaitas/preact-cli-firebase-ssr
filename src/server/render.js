import { h } from 'preact';
import render from 'preact-render-to-string';

export const rendererGenerator = (template, Root) => {
	const headTag = '<head>',
		bodyTag = '<body>';
	return props => {
		const app = render(h(Root, props)),
			head = '', // you could use something like Helmet here
			renderedTemplate = template
				.replace(headTag, headTag + head)
				.replace(bodyTag, bodyTag + app);
		return renderedTemplate;
	};
};
