const User = require("../database/models/User")

exports.register = async (req, res) => {
    try {
        // const {first_name, last_name} = req.body;
        // console.log(first_name)
        // const user = await new User(req.body).save();
        res.json("req.body");
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


