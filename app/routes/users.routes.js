const users = require("../controllers/users.controllers");


module.exports = function (app) {
    app.route('/users')
        .post(users.create);

}