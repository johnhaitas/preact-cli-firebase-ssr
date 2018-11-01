export default (getProps, render) => (request, response) => {
	getProps(request, response)
		.then(props => {
			if (response.finished === true) {
				return;
			}
			const renderedTemplate = render(props);
			response.setHeader('Content-Type', 'text/html');
			response.send(renderedTemplate);
		})
		.catch(error => {
			console.error(`Error rendering page for ${request.url}`, error);
			response.setHeader('Content-Type', 'text/plain');
			response.status(500).send('Error');
		});
};
