const express =require('express');
const adminCreateAccountsController = require('../controllers/adminCreateAccountsController');
const adminRouter= express.Router();

adminRouter.post('/admin/create',async(req,res)=>{
  try{  const {userType,accountType,username,password,firstName,lastName,gender,country} =req.body;
    if (userType != 'ADMIN' || !userType) {
        res.status(401).json({ message: "unauthorized user." });
    }
   const flag= await adminCreateAccountsController.adminCreateAccounts(accountType,username,password,firstName,lastName,gender,country);
   if (!flag)
   res.status(500).json({ message: "notCreated" });
   res.status(201).json({ message: "created" });
     }
catch(err){
    res.status(500).json(err);
      }
})

module.exports = adminRouter;