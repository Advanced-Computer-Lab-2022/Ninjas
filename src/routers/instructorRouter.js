const express = require("express");
const instructorController = require("../controllers/instructorController");
const instructorRouter = new express.Router();

instructorRouter.get('/view', async (req, res) => {
    const { username
    } = req.body;

    // if (userType != 'Instructor') {
    //     res.status(401).json({ message: "unauthorized user." });
    // }



    const viewResults = await
        instructorController.getViewResult({ username });
    res.status(200).json({ result: viewResults });
})

instructorRouter.get('/Searchfilter', async (req, res) => {
    const { username , userId , title , subject , instructor , minPrice , maxPrice
    } = req.body;

    const SearchResults = await
        instructorController.getSearchResult({ username, userId , title , subject , instructor , minPrice , maxPrice });
    res.status(200).json({ result: SearchResults });

})



//Do we need this....
instructorRouter.post('/createcourse', async (req, res) => {
    try{
//subtitels = [{text,hours}]
    const { instructorId, subject , title, price , summary, subtitles ,discount
    } = req.body;
    
const CreateResults = await
    instructorController.createcourse({ instructorId, subject , title, price , summary , subtitles, discount});
    res.status(200).json({ result: CreateResults });
    }
    catch(err){
        if (err instanceof DomainError ){
            res.status(err.code).json({code:err.code, message:err.message})
          }else{
            res.status(500).json({err});}

    }
 

})

module.exports = instructorRouter;