const User = require("../models/user");

//create user without email account activation
exports.signUp = (req,res)=> {
    console.log(req.body);
    const {name,email,password} = req.body;
    User.findOne({email}).exec((err,user)=>{
        if(user){
            return res.status(400).json({error: "user with this email already exists."});
        }
        let newUser = new User({name,email,password});
        newUser.save((err,success)=>{
            if(err){
                console.log("error in signUp: ",err);
                return res.status(400),json({error:err})
            }
            res.json({
                message: "signup success!"
            })
        })
    });
};