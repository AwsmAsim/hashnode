const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

// IMPLEMENT WITH PROMISE ASYNC AWAIT

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'library';
var db;



var connectDB = async()=>{
    const myPromise = new Promise(async (resolve, reject) => {
        await MongoClient.connect(connectionUrl, (error, client)=>{
            if(error){
                throw Error('Cannot connect to database.');
            }
            db = client.db(databaseName);
            console.log('hello');
        });
        console.log(db);
        resolve(db);
    });
    return myPromise;
}

const insertMember = (item)=>{
    // item is a single key value pair
    db.collection('members').insertOne(item,
        (error, result) => {
            if(error){
                throw Error('An error occured.');
            }
            console.log('Data inserted !')
            console.log(result.ops);
        }
    );
}

const insertMembers = (items) => { 
    // items is an array of key value pairs
    db.collection('members').insertMany(items, 
        (error, result) => {
            if(error){
                throw Error('An error occured');
            }
            console.log('Data inserted');
            console.log(result.ops);
        }
    );
}

const readMember = (filter)=>{
    db.collection('members').findOne(filter, 
        (error, result)=>{
            if(error){
                throw Error('An error occured');
            }
            console.log('Data retrieved');
            console.log(result);
        }
    );
}

const readMembers = (filter)=>{
    db.collection('members').find(filter).toArray(
        (error, result)=>{
            if(error){
                throw Error('An error occured');
            }
            console.log('Data retrieved');
            console.log(result);
        }
    );
    
}

const updateMember = (filter, updatedValue)=>{
    // filter is a key value pair which is usually the object id of the form:
    // _id : ObjectId('')
    // updatedValue is the value to be replaced
    const updatedPromise = db.collection('members').updateOne(filter,
        {
            $set: updatedValue
        }
    );

    updatedPromise
    .then((result)=> {console.log(result);}) // Prints the updated value if succesfull
    .catch((error) => {throw Error('There occured an error');}); // Execution Failed
}

const updateMembers = (filter, updatedValue)=>{
    const updatedPromise = db.collection('members').updateMany(filter,
        {
            $set: updatedValue
        }
    );

    updatedPromise
    .then((result)=> {console.log(result);}) // Prints the updated value if succesfull
    .catch((error) => {throw Error('There occured an error');}); // Execution Failed
}

const deleteMember = ()=>{
    db.collection('members').deleteOne(filter)
    .then((result)=>{
        console.log('Deletion Successful !');
        console.log(result);
    })
    .catch((error) => {
        throw Error('There occured an error');
    });
}

const deleteMembers = ()=>{
    db.collection('members').deleteMany(filter)
}


connectDB().then((dbInstance)=>{
    console.log('Connected to database');
    // db = dbInstance;
    console.log(db)
    readMember({});
})

module.exports = {
    db,
    readMember
}