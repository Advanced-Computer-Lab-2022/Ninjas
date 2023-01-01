const DomainError = require("../error/domainError");
const { Account } = require("../models/account");
const { Course } = require("../models/courses");
const  Report  = require("../models/report");
const  RefundRequest  = require("../models/refundRequest");
const RequestAccess = require("../models/requestAccess");
const {  } = require("../models/refundRequest");

//const { request } = require("express");

const adminCreateAccountsController =
{
   async adminCreateAccounts({ username, password, firstName, lastName, email, gender, type }) {
      try {
         const notUnique = await Account.findOne({ username });
         console.log(notUnique)

         if (!notUnique) {
            const saved = await Account.create(
                { username: username, password: password, firstName: firstName, 
                lastName: lastName, email: email, gender: gender, type: type });

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

   async viewUnseenProblems({reportId})  {
    const theReport = await Report.findOne({_id: reportId}).catch(() => {
        throw new DomainError("Wrong Id", 400)
    });;

    await Report.updateOne({_id:reportId}, {seen: true});
    
    return this.viewReportedProblems();


   },
    
   async viewReportedProblems()  {

      try {
        let resReport = [];
        let resReport1 = []; //seen
        let resReport2 = []; //unseen
        //let cname = ""; //unseen
        //let uname = ""; //unseen
        let resReport3 = []; //resolved

         const Reports = await Report.find();
         for(var i=0; i<Reports.length ; i++){
            if(Reports[i].seen == true){
                if(Reports[i].progress == 'RESOLVED'){
                    
                    const theUser = await Account.findOne({_id: Reports[i].accountId});
                    const theCourse = await Course.findOne({_id: Reports[i].courseId});
                    console.log(theCourse);
                    console.log(theUser.email);
                    const u = theUser.email;
                    const c = theCourse.title;
                    const p = Reports[i].problem;
                    const pr = 'RESOLVED';
                    console.log({u, c,p , pr});

                    // console.log(u);
                    // console.log(c);
                    // console.log(p);
                    resReport3.push({u,c,p,pr});
                }
                else{
                    const theUser = await Account.findOne({_id: Reports[i].accountId});
                    const theCourse = await Course.findOne({_id: Reports[i].courseId});
                    const uname = theUser.email;
                    const cname = theCourse.title;
                    const prob = Reports[i].problem;
                    const prog = Reports[i].progress;


                    resReport1.push({uname, cname, prob, prog});
                }

            }
            else{

                const theUser = await Account.findOne({_id: Reports[i].accountId});
                const theCourse = await Course.findOne({_id: Reports[i].courseId});
                const uname = theUser.email;
                const cname = theCourse.title;
                console.log(uname)
                console.log(cname)
                resReport2.push({uname, cname});
            }
         }
         resReport.push(resReport1);
         resReport.push(resReport2);
         resReport.push(resReport3);


         return resReport;


     
     } catch (err) {
         if (err._message && err._message == 'Account validation failed') { throw new DomainError('validation Error', 400); }
         throw new DomainError('error internally', 500);}

     },


     async changeProgress({ reportId, progress})  {//resolved

      try {
         const thisReport = await Report.findOne({ _id: reportId }).catch(() => {
            throw new DomainError("Wrong Id", 400)
         });

         if(thisReport.seen == true){
           await Report.updateOne({_id:reportId}, {progress:progress});
           console.log("hiii");
           
        }
        return this.viewReportedProblems();
       
     
     } catch (err) {
         if (err._message && err._message == 'Report validation failed') { throw new DomainError('validation Error', 400); }
         throw new DomainError('error internally', 500);}

     },

     async changeProgressP({ reportId, progress})  {//Pending

        try {
           const thisReport = await Report.findOne({ _id: reportId }).catch(() => {
              throw new DomainError("Wrong Id", 400)
           });
  
           if(thisReport.seen == true){
             await Report.updateOne({_id:reportId}, {progress:progress});
             
             console.log("hiii");
          }
          return this.viewReportedProblems();

         
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
            console.log(err)
            throw new DomainError('error internally', 500);
 
 
        }

 
    },


    async getAllCoursesss(){ //All courses

     
        try{
            const theCourses = await Course.find();
            return theCourses;
                 
        }
        catch(err){
            throw new DomainError('error internally', 500);
 
        }
      },
   
      async setPromotion({selectedCourses, promotion, startDate, endDate}){
        try{
             await Course.updateMany({ _id: { $in: selectedCourses }}, {
                discount: promotion,
                startDate,
                discountDuration: endDate,
                promoted: 'Promoted'
             });
        }          
        catch(err){
            throw new DomainError('error internally', 500);
 
        }
      },
   



    async viewRefundRequest(){ //refunded courses

     try{
        let result = [];
      //  let uid=0;
       // let cid =0;
        //let cname="";

         const thisRefundRequest = await RefundRequest.find();
         for(var i=0; i<thisRefundRequest.length; i++){
            const theUser = await Account.findOne({_id: thisRefundRequest[i].accountId});
            const theCourse = await Course.findOne({_id: thisRefundRequest[i].courseId});
            let uid = theUser._id;
            let cid = theCourse._id;
            let cname = theCourse.title;
            let uname = theUser.username;
            let reqId = thisRefundRequest[i]._id; 
            result.push({uid, uname, cid, cname, reqId});
            
         }
         return result;
      
        
     }
     catch(err){
         throw new DomainError('error internally', 500);


     }
   },


     async acceptRefundRequest({refundRequestid}){ 

     
      try{
       // let res = [];
         const theRefund = await RefundRequest.findOne({_id: refundRequestid}).catch(() => {
            throw new DomainError("Wrong Id", 400)
        });;
        const theCourse = await Course.findOne({_id: theRefund.courseId});
        await Account.updateOne({_id:theRefund.accountId}, {$push: { refundedCourses: theCourse }});
        await RefundRequest.remove({_id: refundRequestid});
        this.updateWallet({userId: theRefund.accountId});
        return this.viewRefundRequest();
      }
      catch(err){
        console.log(err)

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
 
   try{
      newRec = [];
      const Requests = await RequestAccess.find();

    for(var i=0; i<Requests.length; i++){
      const theUser = await Account.findOne({_id: Requests[i].accountId}).catch(() => {
         throw new DomainError("Wrong Id", 400)
     });;
      if(theUser.type == 'CORPORATE_TRAINEE'){ 
        const uname = theUser.email;
        const theCourse = await Course.findOne({_id: Requests[i].courseId});
        const cname = theCourse.title
        
         newRec.push({uname, cname});
         
  }}
     return newRec;



}
  catch(err){
       console.log(err);
      throw new DomainError('error internally', 500);


  }

  },
  async acceptCorporateRequest({requestId}){
 
    
    try{
        const theRequest = await RequestAccess.findOne({_id: requestId}).catch(() => {
            throw new DomainError("Wrong Id", 400)
        });;
        const thisCourse = await Course.findOne({_id: theRequest.courseId}).catch(() => {
             throw new DomainError("Wrong Id", 400)
          });;
         const thisUser = await Account.findOne({_id: theRequest.accountId}).catch(() => {
             throw new DomainError("Wrong Id", 400)
          });;
        await Course.updateOne({_id: thisCourse.id}, {$push: { students : thisUser.id }});
        await RequestAccess.remove({_id: requestId});
        return this.viewCorporateRequest();

     
       
    }
    catch(err){
        throw new DomainError('error internally', 500);


    }
 
   },








}
module.exports = adminCreateAccountsController;