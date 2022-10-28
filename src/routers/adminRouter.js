const express =require('express');
const adminCreateAccountsController = require('../controllers/adminCreateAccountsController');
const DomainError = require('../error/domainError');
const adminRouter= express.Router();
const path = require('path');

adminRouter.get('/create',(req,res)=>{
  res.sendFile(path.resolve('views/Admin.html'))
})
adminRouter.post('/create',async(req,res)=>{
  try{  const {accountType,username,password,firstName,lastName,gender,country} =req.body;
    // if (userType != 'ADMIN' ) {
    //     res.status(401).json({ message: "unauthorized user." });
    // }
   // else{
   const flag= await adminCreateAccountsController.adminCreateAccounts({accountType,username,password,firstName,lastName,gender,country});
   if (!flag)
   res.status(500).send("notCreated" );
 else  res.status(201).send( "created" );
   //   } 
     }
catch(err){
 if (err instanceof DomainError ){
    res.status(err.code).send( err.message)
  }else{
    res.status(500).send({err});}
      }
})

module.exports = adminRouter;