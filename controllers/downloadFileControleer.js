const File = require('../models/files')

class downloadFileControleer{
    async downloadFile(req,res,next){
        const file = await File.findOne({uuid: req.params.uuid})
        if(!file){
            return res.render('download/index',{
                error:'Link has been Expired'
            })
        }
        const filePath = `${__dirname}/../${file.path}`
        res.download(filePath);
    }
}

module.exports = new downloadFileControleer;