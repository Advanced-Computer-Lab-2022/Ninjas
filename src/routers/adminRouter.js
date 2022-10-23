const express =require('express');
const adminCreateAccountsController = require('../controllers/adminCreateAccountsController');
const DomainError = require('../error/domainError');
const adminRouter= express.Router();

adminRouter.post('/create',async(req,res)=>{
  try{  const {userType,accountType,username,password,firstName,lastName,gender,country} =req.body;
    if (userType != 'ADMIN' ) {
        res.status(401).json({ message: "unauthorized user." });
    }
    else{
   const flag= await adminCreateAccountsController.adminCreateAccounts({accountType,username,password,firstName,lastName,gender,country});
   if (!flag)
   res.status(500).json({ message: "notCreated" });
 else  res.status(201).json({ message: "created" });
      }  }
catch(err){
 if (err instanceof DomainError ){
    res.status(err.code).json({code:err.code, message:err.message})
  }else{
    res.status(500).json({err});}
      }
})

module.exports = adminRouter;