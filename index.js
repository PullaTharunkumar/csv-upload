import express from "express"
import ejsLayouts from "express-ejs-layouts"
import FileUploadController from "./src/controllers/fileUpload.controller.js"
import multer from "multer"
import { connectToMongoDB } from "./config/mongodb.js"

const server = express()
// FileUploadController refernce
const controller = new FileUploadController()
// For File upload
const upload = multer({ dest: 'CSV-uploads/' })
// For EJS
server.set('view engine', 'ejs')
server.set('views', './src/views')
// For Static Files
server.use(express.static('asserts'))
//For Layouts
server.use(ejsLayouts)
//For Forms Data
server.use(express.urlencoded({ extended: true }));
// Routes
// Home Page Route
server.get('/', (req, res) => controller.homePage(req, res))
// File Upload Route
server.post('/', upload.single('file'), (req, res) => controller.csvUpload(req, res))
// File Details Route
server.get('/fileDetails/:id', (req, res) => controller.fileOpen(req, res))
// Server Port
server.listen(8080, () => {
    console.log('Server running on port 8000')
    connectToMongoDB()
})
