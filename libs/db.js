const {
    ObjectId,
    MongoClient
} = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'zy';

// 开始封装
const connect = () => {
    return new Promise((res, rej) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            // assert.equal(null, err);
            if (err) {
                rej(err);
                throw err;
            } else {
                console.log("Connected successfully to server");
                // 连接数据库
                res(client);
            }
        });
    })
}


// 查
const find = (tableName, params) => {
    return new Promise(async (res, rej) => {
        let client = await connect();
        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection(tableName);
        // Find some documents
        collection.find(params).toArray(function (err, docs) {
            // assert.equal(err, null);
            if (err) {
                rej(err)
                throw err;
            } else {
                console.log("Found the following records");
                console.log(docs);
                res(docs);
            }
            // callback(docs);
        });

        // 关闭连接
        client.close();
    });
}

// 增
const insert = (tableName, params) => {
    return new Promise(async (res, rej) => {
        let client = await connect();
        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection(tableName);
        // Insert some documents
        // {a : 1}, {a : 2}, {a : 3}
        collection.insertMany(params, function (err, result) {
            if (err) {
                rej(err);
                throw err;
            } else {
                console.log(`Inserted ${result.ops.length} documents into the collection`);
                res(result);
            }
        });
        // 关闭连接
        client.close();
    });
}

// 删除
const removeOne = (tableName, params) => {
    return new Promise(async (res, rej) => {
        let client = await connect();
        const db = client.db(dbName);
        const collection = db.collection(tableName);
        // Delete document where a is 3
        collection.deleteOne(params, function (err, result) {
            if (err) {
                rej(err);
                throw err;
            } else {
                // assert.equal(1, result.result.n);
                res(result);
                console.log(`Removed  1 documents into the collection`);
            }
        });
        // 关闭连接
        client.close();
    });
}

//改
const updateOne = (tableName, options, params) => {
    return new Promise(async (res, rej) => {
        let client = await connect();
        const db = client.db(dbName);
        const collection = db.collection(tableName);
        collection.updateOne(options, {
            $set: params
        }, function (err, result) {
            if (err) {
                rej(err);
                throw err;
            } else {
                res(result);
                console.log("Updated the document with the field a equal to 2");
            }
        });
    })
}

//加1或减1
const inc = (tableName, options, params) => {
    return new Promise(async (res, rej) => {
        let client = await connect();
        const db = client.db(dbName);
        const collection = db.collection(tableName);
        console.log(options);
        collection.updateOne(options, {
            $inc: params
        }, function (err, result) {
            if (err) {
                rej(err);
                throw err;
            } else {
                res(result);
                console.log("Updated the document with the field a equal to 2");
            }
        });
    })
}


module.exports = {
    connect,
    find,
    ObjectId,
    insert,
    removeOne,
    updateOne,
    inc
}