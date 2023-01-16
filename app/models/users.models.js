const db = require("../../database");
const crypto = require('crypto');


const getHas = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex');

}

const addNewUser = (user, done) => {


    const sql = `INSERT INTO users (first_name,last_name, email, password, salt) VALUES (?,?,?)`;

    const salt = crypto.randomBytes(64);
    const hash = getHas(user.password, salt);

    let values = [user.first_name, user.last_name, user.email, hash, salt.toString('hex')];

    db.run(
        sql,
        values,
        function (err) {
            if (err) return done(err, null);

            return done(null, this.lastID);

        }
    )

}


module.exports = {

    addNewUser: addNewUser,

}