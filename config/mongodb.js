import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017/'

let client;

export const connectToMongoDB = () => {
    MongoClient.connect(url).
        then(clientInstance => {
            client = clientInstance
            console.log('MongoDB is Connected')
        })
        .catch(err => console.log('err', err))
}

export const Collection = () => {
    const db = client.db('CSV-uploads');
    const collection = db.collection('files')
    return collection;
}
