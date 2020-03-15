const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const app = express();
const db = require('./db')
// console.log(db.getReviews)
port = 5000

app.use(express.static(path.join(__dirname, '../client/public')))




app.get('/', (req, res) => {
    res.send('HELLO FROM SQUAWK!!!')
})

app.get('/restaurants/:restaurantId', (req, res) => {
    
    let restaurant = req.params.restaurantId
    
    let start = parseInt(req.query.start)
    let sort = req.query.sort_by
    let search = req.query.q
    db.getReviews(restaurant, start, sort, search, (err, results) => {
        if (err) {
            res.sendStatus(401)
        } else {
            console.log(results)
        }
    })
    
    
})

app.listen(port, () => console.log(`SQUAWK listening on port ${port}!`))