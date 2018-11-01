import App from '../components/app';
import getPropsGenerator from './props';
import { rendererGenerator } from './render';
import handlerGenerator from './handler';

export const createHandler = (template, baseState) => {
	const getProps = getPropsGenerator(baseState),
		render = rendererGenerator(template, App),
		handler = handlerGenerator(getProps, render);
	return handler;
};

const EmptyPlaceholder = () => ('');

// will pre-render with an empty placeholder ...
// this way the rendered app can be inserted immediately after the '<body>' tag
export default EmptyPlaceholder;
