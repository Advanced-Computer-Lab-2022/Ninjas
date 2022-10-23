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
   
    
        
        
    
        
        

        


    }}

    module.exports = instructorController;
