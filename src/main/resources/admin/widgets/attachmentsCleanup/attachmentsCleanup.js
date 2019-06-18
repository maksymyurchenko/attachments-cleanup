var thymeleaf = require('/lib/thymeleaf');
var portalLib = require('/lib/xp/portal');
var contentLib = require('/lib/xp/content');

exports.get = handleGet;

function handleGet(req) {

    function renderView() {
		var view = resolve('attachmentsCleanup.html');
		var model = createModel();
		var body = thymeleaf.render(view, model);
		return {
			body: body,
			contentType: 'text/html'
		};
	}

    function createModel(){
		var content = contentLib.get({key: req.params.contentId});
		var attachments = [];
		for(var index in content.attachments) { 
			if (content.attachments.hasOwnProperty(index)) {
				attachments.push(content.attachments[index]);
			}
		}

		return {
			serviceUrl: portalLib.serviceUrl({ service: 'attachmentCleanup' }),
			attachments: forceArray(attachments),
			id: content._path
		};
    }

    function forceArray(data) {
		if (!Array.isArray(data)) {
			data = [data];
		}
		return data;
	};

    return renderView();
};