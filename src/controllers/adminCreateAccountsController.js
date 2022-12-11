const DomainError = require("../error/domainError");
const { Account } = require("../models/account");
const { Course } = require("../models/courses");
const { Report } = require("../models/report");
const { Refund } = require("../models/refundRequest");
const { Request} = require("../models/requestAccess");
const { request } = require("express");

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
    
   async viewReportedProblems({ accountId})  {

      try {
         const thisAccount = await Account.findOne({ _id: accountId })
         return thisAccount.reports
     
     } catch (err) {
         if (err._message && err._message == 'Account validation failed') { throw new DomainError('validation Error', 400); }
         throw new DomainError('error internally', 500);}


     },


     async changeProgress({ reportId, reportstatus})  {

      try {
         const thisReport = await Report.findOne({ _id: reportId }).catch(() => {
            throw new DomainError("Wrong Id", 400)
         });
         const accounts= await Account.find();

         await Report.updateOne({_id:reportId}, {progress:reportstatus})

         for(var i=0; i<accounts.length;i++){
           for(var j=0;j< accounts[i].reports.length ; j++){
            if(accounts[i].reports[j].id== reportId){///////////////////////////////////////check//////////////////////////
               await Account.updateOne({_id:accounts[i].id}, {reports:accounts[i].reports[j]})

            }   
         }
         }
       
     
     } catch (err) {
         if (err._message && err._message == 'Report validation failed') { throw new DomainError('validation Error', 400); }
         throw new DomainError('error internally', 500);}

     },

      async updateWallet(userId){ //refunded courses

         let newWallet = 0;
        try{
            const theUser = await Account.findOne({_id: userId}).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });;
         
            if(theUser.type == 'INDIVIDUAL TRAINEE'){
             for(var i=0; i<theUser.refundedCourses.length; i++){
                 newWallet = theUser.wallet + (0.5* theUser.refundedCourses[i].price); 
             }
             await Account.updateOne({_id:userId}, {wallet: newWallet })
 
             
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



 async viewCorporateRequest(){
   let newRec = [];
 
   try{
     
      const Requests = await Request.find();

    for(var i=0; i<Requests.length; i++){
      const theUser = await Account.findOne({_id: Requests[i].accountId}).catch(() => {
         throw new DomainError("Wrong Id", 400)
     });;
      if(theUser.type == 'CORPORATE TRAINEE'){ 
         newRec.push(Requests[i]);
         
  }}
return newRec;



}
  catch(err){
      throw new DomainError('error internally', 500);


  }

  },

}
module.exports = adminCreateAccountsController;