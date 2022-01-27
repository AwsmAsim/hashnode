const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId
let databaseName = 'library'
MongoClient.connect('mongodb://127.0.0.1:27017', (error, client)=>{
    if(error){
        throw Error('Could not connedted to database. \nError:' + error.message);
    }
    console.log('Connected to database.')
    const db = client.db(databaseName);
   // Insert Single document
    var item = {
    "name": "Asim", 
    "joining_year" : 2020
    }
    db.collection('members').insertOne(item, 
    (error, result) => {
        if(error){
            throw Error('An error occured.');
        }
        console.log('Data inserted !')
        console.log(result);
        }
    );

    // INSERT MANY

    var items = [
        {
            "name": "Asim", 
            "joining_year" : 2020
        },
        {
            "name" : "Fahad",
            "joining_year" : 2020
        }
        ]
    
        db.collection('members').insertMany(items, 
            (error, result) => {
                if(error){
                    throw Error('An error occured.');
                }
                console.log('Data inserted !')
                console.log(result);
            }
        );

    // Read Single document
    var filter = {
        "name": "Asim"
        }
    
        db.collection('members').findOne(filter, 
            (error, result)=>{
                if(error){
                    throw Error('An error occured');
                }
                console.log('Data retrieved');
                console.log(result);
            }
        );

    // Read Multiple documents
    var filter = {
        "name" : "Asim"
    }

    db.collection('members').find(filter).toArray(
        (error, result)=>{
            if(error){
                throw Error('An error occured');
            }
            console.log('Data retrieved');
            console.log(result);
        }
    );
    // Update one document
    var filter = {
        "_id": ObjectId("61f1696acf85fd10c9317eff")
    }

    var updatedValue = {
        "name" : "Owais"
    }

    const updatedPromise = db.collection('members').updateOne(filter,
        {
            $set: updatedValue
        }
    );

    updatedPromise
    .then((result)=> {console.log(result.ops);}) // Prints the updated value if succesfull
    .catch((error) => {throw Error('There occured an error');}); // Execution Failed

    // retrieve all the documents 
    db.collection('members').find({}).toArray((error, result)=>{
        console.log(result)
    })

    // Update Multiple documents
    var filter = {
        "joining_year" : 2020
    }

    var updatedValue = {
        "joining_year" : 2019
    }

    const updatedPromise = db.collection('members').updateMany(filter,
        {
            $set: updatedValue
        }
    );

    updatedPromise
    .then((result)=> {console.log(result);}) // Prints the updated value if succesfull
    .catch((error) => {throw Error('There occured an error');}); // Execution Failed

    var filter = {
        "name" : "Asim"
    }
    db.collection('members').deleteOne(filter)
    .then((result)=>{
        console.log('Deletion Successful !');
        console.log(result);
    })
    .catch((error) => {
        throw Error('There occured an error');
    });

    // retrieve all the documents 
    db.collection('members').find({}).toArray((error, result)=>{
        console.log(result)
    })


    // Delete single document
    var filter = {
        "name" : "Asim"
    }
    db.collection('members').deleteOne(filter)
    .then((result)=>{
        console.log('Deletion Successful !');
        console.log(result);
    })
    .catch((error) => {
        throw Error('There occured an error');
    });

    // retrieve all the documents 
    db.collection('members').find({}).toArray((error, result)=>{
        console.log(result)
    });

    // Delete Multiple documents
    var filter = {
        "joining_date" : 2021
    }

    db.collection('members').deleteMany(filter)

    // retrieve all the documents 
    db.collection('members').find({}).toArray((error, result)=>{
        console.log(result)
    })

})