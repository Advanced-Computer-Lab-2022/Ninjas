const DomainError = require("../error/domainError");
const { Account } = require("../models/account");
const { Course } = require("../models/courses");
const  Report  = require("../models/report");
const { Refund } = require("../models/refundRequest");
const RequestAccess = require("../models/requestAccess");
const {  } = require("../models/refundRequest");

//const { request } = require("express");

const adminCreateAccountsController =
{
   async adminCreateAccounts({ userType, accountType, username, password, firstName, lastName, gender, country }) {
      try {
         const notUnique = await Account.findOne({ username });

         if (!notUnique) {
            const saved = await Account.create({ username: username, password: password, firstName: firstName, lastName: lastName, gender: gender, country: country, type: accountType });

            return true;
         }
         throw new DomainError("username is not unique", 400);
      }
      catch (err) {
         if (err instanceof DomainError) { throw err; }
         if (err._message && err._message == 'Account validation failed') { throw new DomainError('validation Error', 400); }
         throw new DomainError('error internally', 500);

      }
   },
    
   async viewReportedProblems()  {

      try {
         const Reports = await Report.find();
         return Reports;
     
     } catch (err) {
         if (err._message && err._message == 'Account validation failed') { throw new DomainError('validation Error', 400); }
         throw new DomainError('error internally', 500);}

     },


     async changeProgress({ reportId, reportstatus})  {

      try {
         const thisReport = await Report.findOne({ _id: reportId }).catch(() => {
            throw new DomainError("Wrong Id", 400)
         });

         await Report.updateOne({_id:reportId}, {progress:reportstatus})
       
     
     } catch (err) {
         if (err._message && err._message == 'Report validation failed') { throw new DomainError('validation Error', 400); }
         throw new DomainError('error internally', 500);}

     },












      async updateWallet({userId}){ //refunded courses

         let newWallet = 0;
         let temp = [];
      //   newWallet = theUser.wallet + (0.5* theUser.refundedCourses[i].price); 


        try{
            const theUser = await Account.findOne({_id: userId}).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });;
            console.log(theUser);
         
            if(theUser.type == 'INDIVIDUAL_TRAINEE'){
             for(var i=0; i<theUser.refundedCourses.length; i++){
                const theCourse = await Course.findOne({_id: theUser.refundedCourses[i]});
                console.log(theCourse);
                temp.push(theCourse);

             }
             for(var j=0; j<temp.length; j++){
                newWallet = theUser.wallet + (0.5* temp[j].price); 
             }
             await Account.updateOne({_id:userId}, {wallet: newWallet });
             await Account.updateOne({_id:userId}, {refundedCourses: []});

             
            }
        }
        catch(err){
            throw new DomainError('error internally', 500);
 
 
        }

 
    },



    async viewRefundRequest(){ //refunded courses

     
     try{
         const thisRefundRequest = await Refund.find();
         return thisRefundRequest;
      
        
     }
     catch(err){
         throw new DomainError('error internally', 500);


     }
   },


     async acceptRefundRequest(refundRequestid){ 

     
      try{
         const theRefund = await Refund.findOne({_id: refundRequestid}).catch(() => {
            throw new DomainError("Wrong Id", 400)
        });;
        const theCourse = await Course.findOne({_id: theRefund.courseId});
        await Account.updateOne({_id:theRefund.accountId}, {$push: { refundedCourses: theCourse }} )
        
        this.updateWallet(theRefund.accountId);
      }
      catch(err){
          throw new DomainError('error internally', 500);
 
 
      }
   },
   async addDiscountAdmin({

      courseId, discount, discountDuration
  }) {
      try {
          if(courseId=="" || discount=="" || discountDuration==""){
              throw new DomainError("All fields must be filled", 400)
          }
          const user = await Course.findOne({ _id: courseId }).catch(() => {
              throw new DomainError("Wrong Id", 400)
          });

          if(!(discountDuration>0 && discountDuration<=12)){
              throw new DomainError("Discount Duration must be within 0 to 12 months", 400)
          }

          if(courseId.discount==0){
            throw new DomainError("Discount is set by instructor", 400)
          }

         else{
          await Course.updateOne({ _id: courseId }, { discount: discount });
          await Course.updateOne({ _id: courseId }, { discountDuration: discountDuration });
         }



      }
      catch (err) {
          if (err instanceof DomainError) throw err;
          else
          throw new DomainError('error internally', 500);
    



 }},



 async viewCorporateRequest(userId){
 
   try{
      
      const Requests = await RequestAccess.find();

    for(var i=0; i<Requests.length; i++){
      const theUser = await Account.findOne({_id: Requests[i].accountId}).catch(() => {
         throw new DomainError("Wrong Id", 400)
     });;
      if(theUser.type == 'CORPORATE_TRAINEE'){ 
         newRec.push(Requests[i]);
         
  }}
     return newRec;



}
  catch(err){
       console.log(err);
      throw new DomainError('error internally', 500);


  }

  },
  async acceptCorporateRequest({userId,courseId}){
 
    
    try{
        const thisCourse = await Course.findOne({_id: userId});
        const thisUser = await Account.findOne({_id: courseId});
        ////////////////////////////////////////////////////
     
       
    }
    catch(err){
        throw new DomainError('error internally', 500);


    }
 
   },








}
module.exports = adminCreateAccountsController;