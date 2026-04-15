const SensorImage = require('../services/sensorImageServices');

const uploadImage = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No file uploade' })
    }

    const targetFile = req.files.file;

    // Checking File Size (Max Size - 1MB)
    if (targetFile.size > 1048576) {

        // Deleting Temporary File
        fs.unlinkSync(targetFile.tempFilePath);
        return res.status(413).send("File is too Large");
    }

    const { sensor, time } = req.body;
    SensorImage.uploadImage(sensor, time)
        .then(({ _id }) => {
            targetFile.mv(`${process.cwd()}/public/uploads/${_id}.jpeg`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json(err)
                }
                res.json({ fileName: `${_id}.jpeg`, filePath: `/public/uploads/${_id}.jpeg` })
            })
        })
        .catch(console.log);
}

const getSensorImages = (req, res) => {
    const { sensorId } = req.params;
    SensorImage.getSensorImages(sensorId)
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
};


module.exports = {
    uploadImage,
    getSensorImages
}