import { csvFileUpload, getFileNames, getFileDetails } from "../models/csvUpload.model.js";

export default class FileUploadController {
    // Home Page
    async homePage(req, res) {
        try {
            const files = await getFileNames()
            return res.render('home', { title: 'CSV File Upload', files })
        } catch (err) {
            console.log('Error in csvFileUploadPage function', err);
        }
    }
    // File upload Function
    async csvUpload(req, res) {
        try {
            const data = req.file
            if (data.mimetype !== 'text/csv') {
                return res.status(400)
            }
            await csvFileUpload(data)
            return res.redirect('/')
        } catch (err) {
            console.log('Error in the csvUpload function', err);
        }
    }
    // For File Details 
    async fileOpen(req, res) {
        try {
            const fileInfo = await getFileDetails(req.params.id)
            return res.render('fileDetails', { title: 'File Details', fileData: fileInfo.fileData, headers: fileInfo.headers, fileName: fileInfo.fileName, id: req.params.id })
        } catch (err) {
            console.log('Error getting in fileOpen function', err);
        }
    }
}