var contentLib = require('/lib/xp/content');

exports.post = function( req ) {
    var params = req.params;
    contentLib.removeAttachment({key: params.cid, name: params.name});
};