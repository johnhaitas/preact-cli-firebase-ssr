import App, { AppPlaceholder } from '../components/app';
import getPropsGenerator from './props';
import { rendererGenerator } from './render';
import handlerGenerator from './handler';

export const createHandler = template => {
	const getProps = getPropsGenerator(),
		render = rendererGenerator(template, App),
		handler = handlerGenerator(getProps, render);
	return handler;
};

// will pre-render with a placeholder
export default AppPlaceholder;
