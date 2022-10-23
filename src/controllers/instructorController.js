const mongoose = require('mongoose');
const { Account } = require("../models/account");
const { Course} = require("../models/courses");
const { InstructorToCourses } = require("../models/InstructorToCourses");
//const { db } = require("../models/question");
const instructorController = {
    async getViewResult({

        username
    }) { 
      const result=[]
      const courses=  await Course.find({
        
    })
    for(var i=0;i<courses.length;i++){
        for(var j=0;j<courses[i].instructors.length;j++){
            if(courses[i].instructors[j].username==username){
               result.push(courses[i].title); 
               break;
            }
            
        }

    }
    console.log(result);
    return{result};
   
    },

    async getViewResult2({

        username
    }) { 
      const result2=[]
      const courses=  await Course.find({
        
    })
    for(var i=0;i<courses.length;i++){
        for(var j=0;j<courses[i].instructors.length;j++){
            if(courses[i].instructors[j].username==username){
               result2.push(courses[i]); 
               break;
            }
            
        }

    }
    console.log(result2);
    return{result2};
   
    },



    async getSearchResult({

        username, userId , title , subject , instructor , minPrice , maxPrice 
    }) { 

      const result3 = this.getViewResult2(username)

      const user = await Account.findOne({ _id: userId }, { country: 1 });


      const courses = 
      (subject == null && title == null && instructor == null &&   minPrice == null && maxPrice == null)?
        await result3.find() :
        await result3.find({
        '$or': [
            { subject: { '$regex': "/^" + subject + "/", '$options': 'i' } },
            
            { title: { '$regex': "/^" + title + "/", '$options': 'i' } },
            
            {
                instructors: {
                    $elemMatch: { firstName: "/^" + instructor + "/" }
                }
            },
            { price: { $gte: minPrice, $lte: maxPrice } }
        ]
    });


    let details = countryPriceDetails.get(user.country);
    for (var i = 0; i < courses.length; i++) {
        // price = price x factor x discount
        courses[i].price = courses[i].price * details.factor * ((100 - details.discount) / 100);
    }
   // console.log(courses);
    return {courses,currency:details.currency};

      




     
   
    console.log(result3);
    return{result3};




}
}

    module.exports = instructorController;
