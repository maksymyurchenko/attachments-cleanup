var contentLib = require('/lib/xp/content');
var contextLib = require('/lib/xp/context');

exports.post = function( req ) {
    var params = req.params;
    runAsAdmin(function () {
        removeAttachment(params);
    });
};

function removeAttachment( params ){
    contentLib.removeAttachment({key: params.cid, name: params.name});
}

function runAsAdmin( callback ) {
    return contextLib.run({
        user: {
            login: 'su',
            userStore: 'system'
        },
        principals: ["role:system.admin"]
    }, callback);
};