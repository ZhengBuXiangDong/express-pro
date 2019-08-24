var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'guestbook'
});

const getConnection = () => {
    return new Promise((res, rej) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                // not connected!
                rej(err)
                throw err;
            } else {
                // Use the connection
                res(connection);
            }
        });
    });
}

const query = (connection, sql, params) => {
    return new Promise((res, rej) => {
        connection.query(sql, [params ? params : ''], function (error, results, fields) {
            console.log(results);
            // When done with the connection, release it.
            connection.release();
            // Handle error after the release.
            if (error) {
                rej(error)
                throw error;
            } else {
                res(results);
            }
        });
    });
}

const query2 = (connection, sql, params, options) => {
    return new Promise((res, rej) => {
        let param = params ? params : '';
        let option = options ? options : '';
        connection.query(sql, [param, option], function (error, results, fields) {
            console.log(results);
            // When done with the connection, release it.
            connection.release();
            // Handle error after the release.
            if (error) {
                rej(error)
                throw error;
            } else {
                res(results);
            }
        });
    });
}


// 增
const insert = async (table, params) => {
    const connection = await getConnection();
    const result = await query(connection, `insert into ${table} set ?`, params);

}

// 删除
const del = async (table, params) => {
    const connection = await getConnection();
    if (params) {
        const result = await query(connection, `DELETE FROM ${table} WHERE ?`, params);
    } else {
        const result = await query(connection, `DELETE FROM ${table}`, null);
    }

}

//改 
const updata = async (table, params, options) => {
    const connection = await getConnection();
    if (options) {
        const result = await query2(connection, `UPDATE ${table} SET ? where ?`, params, options);
    } else {
        const result = await query2(connection, `UPDATE ${table} SET ?`, params, null);
    }
}

// 查 
const find = async (table, params, callback) => {
    const connection = await getConnection();
    if (params) {
        const result = await query(connection, `select * from ${table} where ?`, params);
        callback(result);
    } else {
        const result = await query(connection, `select * from ${table}`, null);
        callback(result);
    }

}



// 导出
module.exports = {
    find,
    insert,
    del,
    updata
};