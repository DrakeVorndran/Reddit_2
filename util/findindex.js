module.exports = id => {
    for(let i = 0; i < this.length; i += 1) {
        if(this[i]._id === id) {
            return i
        }
        return null
    }
}