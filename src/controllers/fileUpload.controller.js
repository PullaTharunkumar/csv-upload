import { csvFileUpload, getFileNames, getFileDetails } from "../models/csvUpload.model.js";
import fs from 'fs'
import csvParser from 'csv-parser';

export default class FileUploadController {
    // Home Page
    async homePage(req, res) {
        try{
            const files = await getFileNames()
            res.render('home', { title: 'CSV File Upload', files })
        }catch(err){
            console.log('Error in csvFileUploadPage function',err);
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
            const headers = []
            const fileData = []
            // stream data
            const csvStream = fs.createReadStream(fileInfo.filePath).pipe(csvParser())
            csvStream.on('headers', (data) => {
                    data.map((header) => {
                    headers.push(header);
                })
            })
                .on('data', (data) => fileData.push(data))
                .on('end', () => {
                    console.log('CSV parsing complete');
                    console.log('Headers:', headers);
                    console.log('Data:', fileData)
                    return res.render('fileDetails', { title: 'File Details', fileData, headers,fileName : fileInfo.fileName })
                })
            console.log(headers, fileData);
        } catch (err) {
            console.log('Error getting in fileOpen function', err);
        }
    }
}