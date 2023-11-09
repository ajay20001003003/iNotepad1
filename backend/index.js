const express = require('express')
const app = express()
const port = 5000

var cors = require('cors')


app.use(cors())
const connectdb = require('./db')
connectdb();
app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`iNoteBook backend app listening on port ${port}`)
})
