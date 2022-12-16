const express = require('express');
const adminCreateAccountsController = require('../controllers/adminCreateAccountsController');
const DomainError = require('../error/domainError');
const adminRouter = express.Router();
const path = require('path');
const { Account } = require('../models/account');
const { sessionDetails } = require("../middleware/authMiddleware");
const session = sessionDetails.getSession();

const maxAge = 3 * 24 * 60 * 60;
//change this too
const createToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username, type: user.type }, process.env.TOKEN, {
        expiresIn: maxAge,
    });

    // jwt.sign creates the webtoken, bya5od el payload f object, wel secret string, wel expires in
    // we should generate a random token and store it in the env file
    // jwt.verify
};
adminRouter.get('/create', (req, res) => {
  res.sendFile(path.resolve('views/Admin.html'))
})
adminRouter.post('/create', async (req, res) => {
  try {
    const { userId, accountType, username, password, firstName, lastName, gender, country } = req.body;

    const { type } = await Account.findOne({ _id: userId }, { type: 1 }).catch((err) => { throw new DomainError("you are not an admin", 401) });

    if (type != 'ADMIN') {
      throw new DomainError("you are not an admin", 401)
    }
    const flag = await adminCreateAccountsController.adminCreateAccounts({ accountType, username, password, firstName, lastName, gender, country });
    if (!flag)
      res.status(500).send("notCreated");
    else res.status(201).send("created");

  }
  catch (err) {
    if (err instanceof DomainError) {
      res.status(err.code).send(err.message)
    } else {
      res.status(500).send({ err });
    }
  }
})

adminRouter.put('/addDiscountAdmin', async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const discount = req.body.discount;
    const discountDuration = req.body.discountDuration;

    await iadminCreateAccountsController.addDiscountAdmin({ courseId, discount, discountDuration });
    res.status(200).json("Update Succesfully");
  }
  catch (err) {
    if (err instanceof DomainError) {
      res.status(err.code).json({ code: err.code, message: err.message })
    } else {
      res.status(500).json({ err });
    }
  }



})
adminRouter.get('/viewReportedProblems', async (req, res) => {
  try {

    const reports = await adminCreateAccountsController.viewReportedProblems();
    res.status(200).json(reports);
}

catch (err) {
  if (err instanceof DomainError) {
    res.status(err.code).json({ code: err.code, message: err.message })
  } else {
    res.status(500).json({ err });
  }
}


})


adminRouter.get('/viewCorporateRequest', async (req, res) => {
  try {
    const requests=await adminCreateAccountsController.viewCorporateRequest();
    res.status(200).json(requests);

  }

  catch (err) {
    if (err instanceof DomainError) {
      res.status(err.code).json({ code: err.code, message: err.message })
    } else {
      res.status(500).json({ err });
    }
  }
  
  
  })

  adminRouter.get('/changeProgress', async (req, res) => {
    try {

      const reportId = req.body.reportId; 
      const reportstatus = req.body.reportstatus; 
      await adminCreateAccountsController.changeProgress({reportId,reportstatus});

      res.status(200).json("Update Successfully");
  
    }
  
    catch (err) {
      if (err instanceof DomainError) {
        res.status(err.code).json({ code: err.code, message: err.message })
      } else {
        res.status(500).json({ err });
      }
    }
    
    
    })









adminRouter.get('/updateWallet', async (req, res) => {
  try {

const userId = req.body.userId;

await adminCreateAccountsController.updateWallet({ userId });
res.status(200).json("Update Succesfully");
}

catch (err) {
  if (err instanceof DomainError) {
    res.status(err.code).json({ code: err.code, message: err.message })
  } else {
    res.status(500).json({ err });
  }
}


})

adminRouter.get('/acceptRefundRequest', async (req, res) => {
  try {

const session = sessionDetails.getSession(req.session.id);
const userId = session.userId;

await adminCreateAccountsController.addDiscountAdmin({ accountId });
res.status(200).json("Update Succesfully");
}

catch (err) {
  if (err instanceof DomainError) {
    res.status(err.code).json({ code: err.code, message: err.message })
  } else {
    res.status(500).json({ err });
  }
}

})

adminRouter.post('/acceptCorporateRequest', async (req, res) => {
  try {
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    await adminCreateAccountsController.acceptCorporateRequest({ userId, courseId });
    res.status(200).json("Your request is accepted");
}

catch (err) {
  if (err instanceof DomainError) {
    res.status(err.code).json({ code: err.code, message: err.message })
  } else {
    res.status(500).json({ err });
  }
}


})

module.exports = adminRouter;