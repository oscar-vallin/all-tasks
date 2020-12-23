
module.exports = app => {
    app.get('/api', (req,res) => {
        res.json({name: "My name is oscar"})
    })
}