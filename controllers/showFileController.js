const File = require('../models/files')

class showFileController {
    async showFile(req, res, next) {
        try {
            const file = await File.findOne({ uuid: req.params.uuid });
            if (!file) {
                return res.render('download/index', { error: "Link has been expired" });
            }
            const row = {
                uuid: file.uuid,
                fileName: file.filename,
                fileSize: file.size,
                downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
            }
            return res.render('download', {
                row:row
            })
        } catch (err) {
            return res.render('download/index', { error: "Something Wents Wrong" });
        }
    }
}

module.exports = new showFileController;