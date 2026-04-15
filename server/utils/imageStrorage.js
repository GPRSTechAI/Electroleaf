var ImageKit = require("imagekit");
var fs = require('fs').promises;

var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLICKEY,
    privateKey: process.env.IMAGEKIT_PRIVATEKEY,
    urlEndpoint: process.env.IMAGEKIT_URLENDPOINT
});

exports.upload = async (file, filename, folder = "", removeFile) => {
    if (removeFile) {
        imagekit.deleteFile(removeFile)
    }
    const response = await imagekit.upload({
        file: file.buffer, //required
        fileName: filename,   //required
        useUniqueFileName: true,
        folder: process.env.CLIENT_ID + "/" + folder,
        extensions: [
            {
                name: "google-auto-tagging",
                maxTags: 5,
                minConfidence: 95
            }
        ]
    })
    return response;
}

exports.remove = (fileId) => {
    return imagekit.deleteFile(fileId)
}

exports.get = (filename) => {
    return imagekit.url({
        path: process.env.CLIENT_ID + "/" + filename,
        urlEndpoint: process.env.IMAGEKIT_URLENDPOINT,
        transformation: [{
            "height": "300",
            "width": "300"
        }],
        transformationPosition: "query"
    });
}