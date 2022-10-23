const mongoose = require('mongoose');
const { Account } = require("../models/account");
const { Course , countryPriceDetails } = require("../models/courses");
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
    //console.log(result);
    return{result};

 },




    async getSearchResult({

        username, userId , title , subject , instructor , minPrice , maxPrice 
    }) { 

      const final = [];  

      const result3=[]
      const courses=  await Course.find({
        
    })
    for(var i=0;i<courses.length;i++){
        for(var j=0;j<courses[i].instructors.length;j++){
            if(courses[i].instructors[j].username==username){
               result3.push(courses[i]); 
               break;
            }
            
        }

    }
    
      const user = await Account.findOne({ _id: userId }, { country: 1 });

        for (var i = 0; i<result3.length ; i++ ){
            if(result3[i].subject.toString().includes(subject) || result3[i].title.toString().includes(title) || 
            (result3[i].price >= minPrice && result3[i].price <= maxPrice)){

                final.push(result3[i]);
                
            }
            else{

                for(var j=0; j<result3[i].instructors.length ; j++){

                    if(result3[i].instructors[j].firstName.toString().includes(instructor) || 
                    result3[i].instructors[j].lastName.toString().includes(instructor) ||
                    result3[i].instructors[j].username.toString().includes(instructor)
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
    return {final};


}


}

    module.exports = instructorController;
