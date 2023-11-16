import { ObjectId } from 'mongodb';
import { Collection } from '../../config/mongodb.js';

//Fetching files information from MongoDB
export const getFileNames = async () => {
    try{
        const collection = Collection();
        const result = await collection.find().toArray()
        return result
    }catch(err){
        console.log('error while fetching files information from MongoDB',err);
    }
}
// uploading file Information in MongoDB
export const csvFileUpload = async (fileInfo) => {
    try{
        const collection = Collection();
        const data = {
            fileName: fileInfo.originalname,
            filePath: fileInfo.path,
            file: fileInfo.filename,
            timeStamp : Date.now()
        }
        await collection.insertOne(data)
        console.log('File Uploaded');
    }catch(err){
        console.log('error whlie uploading file Information in MongoDB',err);
    }
}
// getting file information from MongoDB
export const getFileDetails = async (id) => {
    try{
        const collection = Collection();
        const result = await collection.findOne({ _id : new ObjectId(id) })
        return result
    }catch(err){
        console.log('Error while getting file information from MongoDB',err);
    }
}