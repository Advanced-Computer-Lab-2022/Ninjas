const express =require('express');
const adminCreateAccountsController = require('../controllers/adminCreateAccountsController');
const DomainError = require('../error/domainError');
const adminRouter= express.Router();
const path = require('path');
const { Account } = require('../models/account');

adminRouter.get('/create',(req,res)=>{
  res.sendFile(path.resolve('views/Admin.html'))
})
adminRouter.post('/create',async(req,res)=>{
  try{  const {userId,accountType,username,password,firstName,lastName,gender,country} =req.body;
   
   const {type} = await Account.findOne({_id:userId},{type:1}).catch((err)=>{ throw new DomainError("you are not an admin",401)});
  
   if(type != 'ADMIN'){
    throw new DomainError("you are not an admin",401)
   }
   const flag= await adminCreateAccountsController.adminCreateAccounts({accountType,username,password,firstName,lastName,gender,country});
   if (!flag)
   res.status(500).send("notCreated" );
 else  res.status(201).send( "created" );
 
     }
catch(err){
  console.log(err);
 if (err instanceof DomainError ){
    res.status(err.code).send( err.message)
  }else{
    res.status(500).send({err});}
      }
})

module.exports = adminRouter;