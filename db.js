const {MongoClient, ObjectId} = require("mongodb");

async function connect(){
    if(global.db) return global.db;
    const client = new MongoClient(""); //Adicione a string de conexão do mongoDB
    await client.connect();
    global.db = client.db("workshop");
    return global.db;
}

async function findAll(){
    const db = await connect();
    return db.collection("customers").find().toArray();

}

async function insert(customer){
    const db = await connect();
    return db.collection("customers").insertOne(customer);
}

async function findOne(id){
    const db = await connect();
    const objId = new ObjectId(id);
    return db.collection("customers").findOne(objId);
}

async function update(id, customer){
    const filter = {_id: new ObjectId(id)};
    const db = await connect();
    return db.collection("customers").updateOne(filter, {$set: customer});
}

async function deleteOne(id){
    const filter = {_id: new ObjectId(id)};
    const db = await connect();
    return db.collection("customers").deleteOne(filter);
}

module.exports = {findAll, insert, findOne, update, deleteOne};
