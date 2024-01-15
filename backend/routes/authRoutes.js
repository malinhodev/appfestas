const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
//register
router.post('/register', async (req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    //check for required
    if(name == null || email == null || password == null || confirmpassword == null){
        return res.status(400).json({
            error: 'Por favor preencha todos os campos!'
        })
    }

    //check pasworsd match
    if( password != confirmpassword){
        return res.status(400).json({
            error: 'As senhas estão diferentes!'
        })
    }
    //check if use exists
    const emailExists = await User.findOne({email: email})
    if(emailExists){
        return res.status(400).json({
            error: 'email já cadastrado!'
        })
    }
    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    //push to db
    const user = new User({
        name: name,
        email: email,
        password: passwordHash
    })
    try{
        const newUser = await user.save()
        //token
        const token = jwt.sign({
            name: newUser.name,
            id: newUser._id
        },"nossosecret")
        // return token
        res.json({ error: null, msg: "Cadastrado com sucesso!", token: token, userId: newUser._id})
    }catch(error){
        res.status(400).json({error})
    }

})
//login an user
router.post('/login', async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    //check if user exists
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(400).json({
            error: 'Usuário não cadastrado!'
        })
    }
    //check if password match
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword){
        return res.status(400).json({
            error: 'Senha inválida'
        })      
    }
    //token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    },"nossosecret")
     // return token
     res.json({ error: null, msg: "Usuário autenticado!", token: token, userId: user._id})
})

module.exports = router