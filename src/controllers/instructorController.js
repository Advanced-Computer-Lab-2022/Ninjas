const mongoose = require('mongoose');
const { Account } = require("../models/account");
const { Course , countryPriceDetails } = require("../models/courses");
const { InstructorToCourses } = require("../models/InstructorToCourses");
const { exerciseSchema } = require('../models/exercise');
//const { create } = require("../models/InstructorToCourses");
const { subtitleSchema, Subtitle } = require('../models/subtitle');
const DomainError = require("../error/domainError");
var subtitlesArray=[subtitleSchema];
var Totalhrs = 0;


const instructorController = {
    async getViewResult({

        username
    }) {
      try{
      const result=[]
      const courses=  await Course.find({
        
    })

    for(var i=0;i<courses.length;i++){
        for(var j=0;j<courses[i].instructors.length;j++){
            if(courses[i].instructors[j].username && courses[i].instructors[j].username==username){
               result.push(courses[i].title); 
               break;
            }
            
        }

    }
    //console.log(result);
    return result;}
    catch(err){
          console.log(err)
          throw new DomainError('error internally',500);  
    }

 },
 async getSearchResult({

    username, search, userId
}) { 

try{
  const final = [];  

  const result3=[]
  const courses=  await Course.find({
    
})
for(var i=0;i<courses.length;i++){
    for(var j=0;j<courses[i].instructors.length;j++){
        if(courses[i].instructors[j].username && courses[i].instructors[j].username==username){
           result3.push(courses[i]); 
           break;
        }
        
    }

}


  const user = await Account.findOne({ _id: userId }, { country: 1 });

    for (var i = 0; i<result3.length ; i++ ){
        if(result3[i].subject.toString().includes(search) || result3[i].title.toString().includes(search)){

            final.push(result3[i]);
            
        }
        else{

            for(var j=0; j<result3[i].instructors.length ; j++){

                if(result3[i].instructors[j].firstName.toString().includes(search) || 
                result3[i].instructors[j].lastName.toString().includes(search) ||
                result3[i].instructors[j].username.toString().includes(search)
                ){
                    final.push(result3[i])

                }

            }

        }
    

    }
let details = countryPriceDetails.get(user.country);
for (var i = 0; i < final.length; i++) {
    // price = price x factor x discount
    final[i].price = final[i].price * details.factor * ((100 - details.discount) / 100);
}
// console.log(courses);
return final;}
catch(err){
 throw new DomainError('error internally',500);  }


},
    async getFilterResult({

        username, userId , subject , minPrice , maxPrice 
    }) { 
    
    try{
        console.log(username)
        console.log(userId)
        console.log(subject)
        console.log(minPrice)
        console.log(maxPrice)

      const final = [];  

      const result3=[]
      const courses=  await Course.find({
        
    })

    for(var i=0;i<courses.length;i++){
        for(var j=0;j<courses[i].instructors.length;j++){
            if(courses[i].instructors[j].username && courses[i].instructors[j].username==username){
               result3.push(courses[i]); 
               break;
            }
            
        }

    }
    
    
      const user = await Account.findOne({ _id: userId }, { country: 1 });

        for (var i = 0; i<result3.length ; i++ ){
            if(result3[i].subject.toString().includes(subject) || (result3[i].price >= minPrice && result3[i].price <= maxPrice)){
                final.push(result3[i]);
                
            }
           
        
    
        }
        

    let details = countryPriceDetails.get(user.country);
    for (var i = 0; i < final.length; i++) {
        // price = price x factor x discount
        final[i].price = final[i].price * details.factor * ((100 - details.discount) / 100);
    }
   // console.log(courses);
    return final;}
    catch(err){
     throw new DomainError('error internally',500);  }


},



async addsubtitle (subArray){ 
for (var i =0; i<subArray.length; i++) {


    const sub = new Subtitle({
        text : subArray[i].text,
        hours : subArray[i].hours
    }) 
    await sub.save()
   subtitlesArray.push (sub);
}
   console.log(subtitlesArray)
    return subtitlesArray 

},

async calculateHours (subArray){ 
    for (var i =0; i<subArray.length; i++) {

    Totalhrs += subArray[i].hours;
    }
    return Totalhrs

},



async createcourse ({instructorId, subject , title, price , summary , subtitles}) {
    const thisInstructor = await Account.findOne({_id: instructorId})
   // console.log(thisInstructor)
    try {
    Totalhrs = 0;
    const subtitlesArray = [];
    const myArray = subtitles.split(",");
    for(var i=0; i<myArray.length;i++){
        var s = new Subtitle({
            text : myArray[i].split(":")[0].toString(),
            hours : parseInt(myArray[i].split(":")[1])
        })
       //s.save();
        subtitlesArray.push(s);
    }
    
    const Newcourse =  new Course({
        subject : subject,
        price : price,
        subtitles : subtitlesArray , ///should it be empty array as exercises --1....
        summary : summary,
        title : title,
        totalHours:10,
        totalHours : await this.calculateHours(subtitlesArray),  ///--1 if so how total hours will be calculated....
        exercises : [],
        instructors:[thisInstructor]
    })
    
    Newcourse.save();
    //return Newcourse
    } catch(err) {
        console.log(err)
        if (err._message && err._message == 'Course validation failed'  ){   throw new DomainError('validation Error',400);}
        throw new DomainError('error internally',500);  
   

    }


}
}


    module.exports = instructorController;
