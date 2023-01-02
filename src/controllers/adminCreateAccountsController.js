const DomainError = require("../error/domainError");
const { Account } = require("../models/account");
const { Course } = require("../models/courses");
const  Report  = require("../models/report");
const  RefundRequest  = require("../models/refundRequest");
const RequestAccess = require("../models/requestAccess");
const {  } = require("../models/refundRequest");
const { DesktopTimePicker } = require("@mui/x-date-pickers");

//const { request } = require("express");

const adminCreateAccountsController =
{
   async adminCreateAccounts({ username, password, firstName, lastName, email, gender, type }) {
      try {
           const salt = await bcrypt.genSalt();
           const hashedPassword = await bcrypt.hash(password, salt);
           console.log(hashedPassword);
           console.log(hashedPassword);
        const notUnique = await Account.findOne({ username });
        console.log(notUnique)

         if (!notUnique) {
            const saved = await Account.create(
                { username: username, password: hashedPassword, firstName: firstName, 
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
        let resReport4 = []; //resolved

         const Reports = await Report.find();
         for(var i=0; i<Reports.length ; i++){
            if(Reports[i].seen == true){
                if(Reports[i].progress == 'RESOLVED'){
                    
                    const theUser = await Account.findOne({_id: Reports[i].accountId});
                    const theCourse = await Course.findOne({_id: Reports[i].courseId});
                    //console.log(theCourse);
                    //console.log(theUser.email);
                    const u = theUser.email;
                    const c = theCourse.title;
                    const p = Reports[i].problem;
                    const pr = 'RESOLVED';
                    const rid = Reports[i]._id;

                    console.log({u, c,p , pr, rid});
                    resReport3.push({u,c,p,pr, rid});
                    console.log("1111111111111");
                    console.log(resReport3);
                }
                else{
                    if(Reports[i].followUp == false){
                    const theUser = await Account.findOne({_id: Reports[i].accountId});
                    const theCourse = await Course.findOne({_id: Reports[i].courseId});
                    const uname = theUser.email;
                    const cname = theCourse.title;
                    const prob = Reports[i].problem;
                    const prog = Reports[i].progress;
                    const des = Reports[i].problemDescription;
                    const rid = Reports[i]._id;


                    resReport1.push({uname, cname, prob, prog, des, rid});

                    console.log("222222222222222");
                    console.log(resReport1);

                
                }
                    else{
                        const theUser = await Account.findOne({_id: Reports[i].accountId});
                        const theCourse = await Course.findOne({_id: Reports[i].courseId});
                        const uname = theUser.email;
                        const cname = theCourse.title;
                        const prob = Reports[i].problem;
                        const des = Reports[i].problemDescription;
                        const rid = Reports[i]._id;
                        resReport4.push({uname, cname, prob, des, rid});

                    console.log("3333333333333");    
                    console.log(resReport4)
                    }

                    }
                }

            else{

                if(Reports[i].followUp == false){

                const theUser = await Account.findOne({_id: Reports[i].accountId});
                const theCourse = await Course.findOne({_id: Reports[i].courseId});
                const uname = theUser.email;
                const cname = theCourse.title;
                const rid = Reports[i]._id;

                console.log(uname)
                console.log(cname)
                resReport2.push({uname, cname, rid});
            
                console.log("444444444444");
                console.log(resReport2);
            }

                else{
                    const theUser = await Account.findOne({_id: Reports[i].accountId});
                    const theCourse = await Course.findOne({_id: Reports[i].courseId});
                    const uname = theUser.email;
                    const cname = theCourse.title;
                    const rid = Reports[i]._id;
    
                    console.log(uname)
                    console.log(cname)
                    resReport4.push({uname, cname, prob, des, rid});

                    console.log("55555555555555");
                    console.log(resReport4);

                }
            }
         }
         resReport.push(resReport1);
         resReport.push(resReport2);
         resReport.push(resReport3);
         resReport.push(resReport4);


         return resReport;


     
     } catch (err) {
         if (err._message && err._message == 'Account validation failed') { 
            
            throw new DomainError('validation Error', 400); }

            console.log(err);
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










      async updateWallet({userId, instructorId}){ //refunded courses

         let newWallet = 0;
         let newWallet2 = 0;

         let temp = [];
      //   newWallet = theUser.wallet + (0.5* theUser.refundedCourses[i].price); 


        try{
            const theUser = await Account.findOne({_id: userId}).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });;
            const theInstructor = await Account.findOne({_id: instructorId}).catch(() => {
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
                newWallet = newWallet + (0.5* temp[j].price);
 
             }
             let newWallet11 = theUser.wallet + newWallet;
             let newWallet22 = theInstructor.wallet - newWallet;

             await Account.updateOne({_id:userId}, {wallet: newWallet11 });
             await Account.updateOne({_id:instructorId}, {wallet: newWallet22 });
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
            let c = [];
            const theCourses = await Course.find();
            let p = 0;
            for(var z =0; z<theCourses.length ; z++){
                const t = theCourses[z].title;
                const s = theCourses[z].subject;
                if(theCourses[z].promoted == 'Promoted' && theCourses[z].startDate < Date.now() && theCourses[z].discountDuration < Date.now()){
                    p = theCourses[z].price - theCourses[z].price*theCourses[z].discount ;        
                }
                else{
                    p = theCourses[z].price ; 
                }
                const prom = theCourses[z].promoted
            //return theCourses;
            c.push({t,s,p,prom})

        }
        return c; 
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
        } catch(err){
            throw new DomainError('error internally', 500);
 
        }
        },      

      async getAllCoursesss2(){ //All courses

     
        try{
            let c = [];
            const theCourses = await Course.find();
            for(var j=0; j<theCourses.length; j++){
                c.push(theCourses[i]._id);

            }
            return c;
                 
        }
        catch(err){
            throw new DomainError('error internally', 500);
 
        }
      },
   
      async setPromotion({selectedCourses, promotion, startDay, endDay, startMonth, endMonth ,startYear, endYear}){ //All courses
        //discountDuration end date
        //startDate
        let stDate="";
        let endate="";
        console.log(startMonth)
        let c = [];

        if ( parseInt(startMonth) < 10)
        startMonth = "0"+startMonth;
        if ( parseInt(endMonth) < 10)
        endMonth = "0"+endMonth;
        if ( parseInt(startDay) < 10)
        startDay = "0"+startDay;
        if ( parseInt(endDay) < 10)
        endDay = "0"+endDay;
        
        console.log(startMonth);
        console.log(endMonth);

        stDate = startYear + "-" + startMonth + "-"+ startDay;
        endate = endYear + "-" + endMonth + "-"+ endDay;

        let startDate1 = new Date(startYear,startMonth,startDay,8,00,00,000)
        let endDate1 = new Date(endYear,endMonth,endDay,8,00,00,000)

console.log(startDate1);
console.log(endDate1);


        if(startDate1 < endDate1){
            if(promotion > 0){
                for(var j=0; j<selectedCourses ; j++){
                    if(selectedCourses[j].promoted == 'Not Promoted' ){
                        let title = selectedCourses[j].title;
                        let subject = selectedCourses[j].subject;
                        let price = selectedCourses[j].price - selectedCourses[j].price * (promotion/100);
                        let prom = 'Promoted';

                        c.push({title, subject, price, prom});

                    }
                    else{
                        if(selectedCourses[j].startDate > startDate1 && selectedCourses[j].startDate < endDate1 ){
                            //throw new doman error already promoted
                            throw new DomainError("Course is already promoted", 400)
                        }
                    

                    }
                }
                return c;
            }
             else{
                 //you can not promote by -ve number
                 throw new DomainError("Promotion can not be negative number", 400)

              }
        }
        else{
            //wrong dates
            throw new DomainError("Wrong dates", 400)

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
        const instructorId = theCourse.instructors[0]._id;
        await Account.updateOne({_id:theRefund.accountId}, {$push: { refundedCourses: theCourse }});
        await RefundRequest.remove({_id: refundRequestid});
        this.updateWallet({userId: theRefund.accountId, instructorId});
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
        const cname = theCourse.title;
        const company = Requests[i].corporateName;

        
         newRec.push({uname, cname, company});
         
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

   async rejectCorporateRequest({requestId}){
 
    
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
       // await Course.updateOne({_id: thisCourse.id}, {$push: { students : thisUser.id }});
        await RequestAccess.remove({_id: requestId});
        return this.viewCorporateRequest();

     
       
    }
    catch(err){
        throw new DomainError('error internally', 500);


    }
 
   },








}
module.exports = adminCreateAccountsController;