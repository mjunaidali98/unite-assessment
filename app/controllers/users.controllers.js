const users = require("../models/users.models");
const Joi = require("Joi");
const bcrypt = require('bcrypt');

const create = (req, res) => {
    const schema = Joi.object({
        "first_name": Joi.string().required(),
        "last_name": Joi.string().required(),
        "email": Joi.string().required(),
        "password": Joi.string().required(),

    })



    const { error } = schema.validate(req.body)
    if (error) return res.sendStatus(500)
    let user = Object.assign({}, req.body);

    users.addNewUser(user, (err, id) => {
        if (err) return res.sendStatus(500);


        return res.status(201).send({ user })
    })

}
module.exports = {
    create: create

}