module.exports = field => {
    return function(next) {
        this.popualate(field)
        next()
    }
}