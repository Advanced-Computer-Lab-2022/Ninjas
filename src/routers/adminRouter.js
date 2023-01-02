const express = require('express');
const adminCreateAccountsController = require('../controllers/adminCreateAccountsController');
const DomainError = require('../error/domainError');
const adminRouter = express.Router();
const path = require('path');
const { Account } = require('../models/account');
const { sessionDetails } = require("../middleware/authMiddleware");
const { setPromotion } = require('../controllers/adminCreateAccountsController');
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
adminRouter.put('/create', async (req, res) => {
  try {

 const session = sessionDetails.getSession(req.session.id);
 const userId = session.userId;
 console.log(userId);
    const {username, password, firstName, lastName, email, gender, type, corporateName } = req.body;

    const theUser  = await Account.findOne({ _id: userId }).catch((err) => { throw new DomainError("Wrong ID", 401) });
    console.log(theUser);

    if (theUser.type != 'ADMIN') {
      console.log(theUser.type);
      
      throw new DomainError("you are not an admin", 401)
      
    }
    
    const flag = await adminCreateAccountsController.adminCreateAccounts({ username, password, firstName, lastName, email, gender, type, corporateName});
    if (!flag)
      res.status(500).send("notCreated");
    else res.status(200).send()

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

adminRouter.get('/viewUnseenProblems', async (req, res) => {
  try {

    const reportId = req.query.reportId;
    const reports = await adminCreateAccountsController.viewUnseenProblems({reportId});
    return res.status(200).json(reports);
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
      const progress = req.body.progress; 
      const res = await adminCreateAccountsController.changeProgress({reportId,progress});
      res.status(200).json(res);
  
    }
  
    catch (err) {
      if (err instanceof DomainError) {
        res.status(err.code).json({ code: err.code, message: err.message })
      } else {
        res.status(500).json({ err });
      }
    }
    
    
    })

    adminRouter.get('/changeProgressP', async (req, res) => {
      try {
  
        const reportId = req.query.reportId; 
        const progress = req.query.progress; 
        const results = await adminCreateAccountsController.changeProgressP({reportId,progress});
  
        res.status(200).json(results);
    
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

// const session = sessionDetails.getSession(req.session.id);
// const userId = session.userId;
const refundRequestid  = req.query.refundRequestid;
console.log("reee ", req.query);

const results = await adminCreateAccountsController.acceptRefundRequest({ refundRequestid });
console.log("hiii");
res.status(200).json(results);
}

catch (err) {
  console.log(err)
  if (err instanceof DomainError) {
    res.status(err.code).json({ code: err.code, message: err.message })
  } else {
    res.status(500).json({ err });
  }
}

})

adminRouter.get('/acceptCorporateRequest', async (req, res) => {
  try {
    const requestId = req.query.requestId;
    const results = await adminCreateAccountsController.acceptCorporateRequest({ requestId });
    res.status(200).json(results);
}

catch (err) {
  if (err instanceof DomainError) {
    res.status(err.code).json({ code: err.code, message: err.message })
  } else {
    res.status(500).json({ err });
  }
}
})

adminRouter.get('/rejectCorporateRequest', async (req, res) => {
  try {
    const requestId = req.query.requestId;
    const results = await adminCreateAccountsController.rejectCorporateRequest({ requestId });
    res.status(200).json(results);
}

catch (err) {
  if (err instanceof DomainError) {
    res.status(err.code).json({ code: err.code, message: err.message })
  } else {
    res.status(500).json({ err });
  }
}
})


adminRouter.get('/getAllCoursesss', async (req, res) => {
  try {

    const courses = await adminCreateAccountsController.getAllCoursesss();
    res.status(200).json(courses);
}


catch (err) {
  if (err instanceof DomainError) {
    res.status(err.code).json({ code: err.code, message: err.message })
  } else {
    res.status(500).json({ err });
  }
}


})

adminRouter.get('/getAllCoursesss2', async (req, res) => {
  try {

    const courses = await adminCreateAccountsController.getAllCoursesss2();
    res.status(200).json(courses);
}


catch (err) {
  if (err instanceof DomainError) {
    res.status(err.code).json({ code: err.code, message: err.message })
  } else {
    res.status(500).json({ err });
  }
}


})

adminRouter.put('/setPromotion', async (req, res) => {
  try {
    const selectedCourses = req.body.selectedCourses;
    const promotion = req.body.promotion;
    const startDate = req.body.startDate;
    const startMonth = req.body.startMonth;
    const startYear = req.body.startYear;

    const endDate = req.body.endDate;
    const endMonth = req.body.endMonth;
    const endYear = req.body.endYear;

    const f = await adminCreateAccountsController.setPromotion({selectedCourses, promotion, startDate, startMonth, startYear, endDate, endMonth, endYear});
    //if(f == 0){
      res.status(200).send(f);
    //}
    //else{
     // res.status(500).send();

    //}
}

catch (err) {
  if (err instanceof DomainError) {
    res.status(err.code).json({ code: err.code, message: err.message })
  } else {
    res.status(500).json({ err });
  }
}


})

adminRouter.get('/viewRefundRequests', async (req, res) => {
  try {

    const refunds = await adminCreateAccountsController.viewRefundRequest();
    res.status(200).json(refunds);
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