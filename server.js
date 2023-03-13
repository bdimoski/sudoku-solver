const PORT = 8888;
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())

app.post('/solve', (req, res) => {
    //console.log('request:', req.body.input)
    const options = {
        method: 'POST',
        url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
        },
        data: {
            input: req.body.input
        }
    };

    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.error(error)
    })
})

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
