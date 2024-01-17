const router = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')
//middlewares
const verifyToken = require('../helpers/check-token')
const getUserByToken = require('../helpers/get-user-by-token')
//get an user
router.get('/:id', verifyToken, async(req,res)=>{
    const id = req.params.id
    //verify user
    try{
        const user = await User.findOne({_id:id}, {password:0})
        res.json({error:null,user})
    }catch(err){
        return res.status(400).json({error:'Usuário não existe!'})
    }
    
})
//update an user
router.put('/', verifyToken, async (req,res)=>{
    const token = req.header('auth-token')
    const user = await getUserByToken(token)
    const userReqId = req.body.id
    const password = req.body.password
    const confirmpassword= req.body.confirmpassword

    const userId = user._id.toString()
    //check if use is iqual token user id
    if(userId != userReqId){
        res.status(401).json({error: 'Acesso negado!'})
    }
    //create an user object
    const updateData = {
        name: req.body.name,
        email: req.body.email
    }
})

module.exports = router