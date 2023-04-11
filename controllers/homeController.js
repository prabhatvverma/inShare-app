class homePageControllers{
    async homePage(req, res, next) {
        res.render('home/index')
    }
}


module.exports = new homePageControllers;