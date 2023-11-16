import { Collection } from '../../config/mongodb.js';
import fs from 'fs'
import csvParser from 'csv-parser';
import { ObjectId } from 'mongodb';

//Fetching files information from MongoDB
export const getFileNames = async () => {
    try {
        const collection = Collection();
        const result = await collection.find().toArray()
        return result
    } catch (err) {
        console.log('error while fetching files information from MongoDB', err);
    }
}
// uploading file Information in MongoDB
export const csvFileUpload = async (fileInfo) => {
    try {
        const collection = Collection();
        // stream data
        const headers = []
        const fileData = []
        const csvStream = fs.createReadStream(fileInfo.path).pipe(csvParser())
        csvStream.on('headers', (data) => {
            data.map((header) => {
                headers.push(header);
            })
        })
            .on('data', (data) => fileData.push(data))
            .on('end', async () => resolve())
        await new Promise((resolve) => csvStream.on('end', resolve));
        const data = {
            fileName: fileInfo.originalname,
            filePath: fileInfo.path,
            file: fileInfo.filename,
            headers,
            fileData,
            timeStamp: Date.now()
        }
        await collection.insertOne(data)
        console.log('File Uploaded');

    } catch (err) {
        console.log('error whlie uploading file Information in MongoDB', err);
    }
}
// getting file information from MongoDB
export const getFileDetails = async (id) => {
    try {
        const collection = Collection();
        const result = await collection.findOne({ _id: new ObjectId(id) })
        return result
    } catch (err) {
        console.log('Error while getting file information from MongoDB', err);
    }
}