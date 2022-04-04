const express = require('express')
const multer = require('multer')
const cors = require('cors')

const firebase = require('./firebase')
const app = express()

const upload = multer({
    storage: multer.memoryStorage()
})

app.use(cors())

app.post('/upload', upload.single('file'), (req, res) => {
    if(!req.file) {
        res.status(400).send("Error: No files found")
    } else {

        console.log('data body', req.body.body)
        const imagefile = req.file
        const nameArquivo = Date.now() + "." + imagefile.originalname.split(".").pop();

        const file = firebase.bucket.file(nameArquivo);
        
        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })
        
        stream.on('error', (err) => {
            console.log(err)
        })
        
        stream.on('finish', async() => {
            const result = await file.makePublic()
            const imageUrl = `https://storage.googleapis.com/${result[0].bucket}/${nameArquivo}`
            res.status(200).send({ message: "File uploaded.", imageUrl: imageUrl })
        })
        
        stream.end(imagefile.buffer)

    }
})

app.listen(5000, () => {
    console.log('🚀 Server listening on port 5000')
})