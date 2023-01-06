![Black   White Minimalist Business Logo](https://user-images.githubusercontent.com/110330655/210157029-9f9f14b2-fba4-441e-b7bc-bff0ab79f78f.png)

Courses Planet is an online learning system that aims to fulfill the educational needs of learners around the globe by connecting them to several skilled instructors who are able to teach a variety of courses. The creators of the website aim to fulfill the requirements of all instructors and trainees in one combined system.

## Motivation

Since the start of COVID19 crisis, a significant spike in demand of online learning platforms has been generated. As a result, the countless benefits of online learning have been observed (efficient learning, management flexibility, easy accessibility, etc.).
Online learning websites indeed allow the future generations to access the best education possible around the globe. Based on this fact, the developers of this project decided to implement the idea, for the sake of the future.

## Build Status

On the 2nd of January 2023, the project will be completed and **not** deployed. Most if not all of the errors are handled in the code; users should not worry about anything going wrong on their part. In the unlikely event, if a problem occurs, feel free to file a ticket and the bug shall be fixed as soon as possible.

## Code Style

This project uses standard JavaScript code style. [ESLint](https://eslint.org/) can be a huge aid in following the standard format.

## Screenshots
### The homepage from the individual trainee's perspective
![image](https://user-images.githubusercontent.com/110330655/210178248-c1cbc478-1400-4395-a368-717ffefd1e49.png)

### The course page from the trainees' perspective
![image](https://user-images.githubusercontent.com/110330655/210178256-c9315d27-0350-4015-b80e-b103a88e2af3.png)

### Watching a subtitle video inside the course page
![image](https://user-images.githubusercontent.com/110330655/210178283-b74cee19-eeb7-447f-940d-ebf79af5e739.png)

### The instructors' side menu
![image](https://user-images.githubusercontent.com/110330655/210178301-c4e6d822-96d9-4528-8337-f8d32f467bcf.png)

## The admins' dashboard (homepage)
![image](https://user-images.githubusercontent.com/110330655/210178222-03a99e9e-e550-4d40-8170-8c379f4aa774.png)

## Tech/Framework used

- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) 
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Features

1. Write notes while watching video :writing_hand: <br />
    Why use a pen and a paper when you can type down your notes and download them as a PDF file? In Courses Planet, you can drop down lines of code while watching the video at the same time! It's completely up to you to choose whether you want to download the notes or not afterwards.

2. Pay using a credit card OR your wallet :credit_card: :dollar: <br />
  Do you want to use your course refund to register in another course? We got you covered! Our system allows the trainees to pay for course registeration using their credit cards or the balance in their wallet.

3. Edit or delete their rating on a specific course or instructor :star: :star: :star: <br />
  In case you change your mind after rating a course/instructor, the website permits you to edit your rating or delete it if needed.

4. Retake a failed exercise :memo: <br />
  Life is full of second chances. If you failed an exercise, Courses Planet will allow you to retake it over and over again, until your grade is over 50% of the total grade of that exercise. Don't worry, we won't tell anyone. :slightly_smiling_face:

5. View the grade of a previously solved exercise :books: <br />
  You can always come back later to recheck your latest grade in an exercise you have solved in the past. Just go to the course page, open the subtitle, and the grade will show up for you.

6. See the total number of enrolled students in a course at this very moment :busts_in_silhouette: <br />
  Wondering how popular the course is? Go to its page to see the number of enrolled students.

7. Instructors can see the average grade scored in their course exercises :chart_with_upwards_trend: <br />
  Sometimes instructors want to know whether the exercise they added to a subtitle is too hard, or way too easy. To help them decide, we always display the average grade scored in an exercise.

8. Exercise grades are realistic :page_facing_up: :negative_squared_cross_mark: <br />
  A common problem in myriads of online learning systems is that trainees can retake an exam or resubmit an exercise solution after seeing the correct answers. This results in the average grades of the exercise being unrealistic. We prevent this issue by not allowing a trainee to re-solve an exercise if they have already seen its correct answer.

9. Ease of use and flexibility :sparkles: <br />
      You do not have to navigate between the pages alot.
      - The video view panel is inside the course page, and the notes box is also with it, so there will be no need to navigate anywhere. Just stay focused on watching the video! :blush:
      - The subtitles panel is scrollable so you won't worry about scrolling down and up the whole page to find different subtitles. 
      - You can check the available balance in your wallet anywhere and everywhere, since it's in the side menu.
      - In case you got lost somewhere in the website, click the home button and you will be redirected to the home page! :house:
      - EXCLUSIVELY: The admin can select MULTIPLE courses and set their promotion at once.
      - You can also change your country at any time you want. :crossed_flags:

10. Security :closed_lock_with_key: <br />
    - Our system obligates the users to set a password of 6+ characters while signing up. In case you forget your password, we ask for your **username**, and send you an email with the link to reset it. There is no other way.
    - Your credit card details are **NEVER** saved in our database, in order to ensure your privacy and safety.

11. Certificates of course completion are both emailed and downloadable from the website! :medal_sports: <br />
  This is to allow the trainees to re-download their certificates in case they suddenly lost access to them.

## Code Example

### How the code of the project works
![image](https://user-images.githubusercontent.com/110330655/210180071-33bd791e-c8c2-4347-b83b-b8a97e0f6a51.png)

## An example of the code
#### Our backend follows the model-router-controller `MRC` pattern.

This is how a user can get all the course details using it's ID in the database.
- The model (Course schema)

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { accountSchema } = require('./account');
const { exerciseSchema } = require('./exercise');
const { ratingSchema } = require('./rating');
const { subtitleSchema } = require('./subtitle');
//these imported models will be used in the schema

const coursesSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    price: {
        type: Number,
        required: true
    },
    totalHours: {
        type: Number,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    instructors: {
        type: [accountSchema],
        default: []

    },
    subtitles: {
        type: [subtitleSchema],
        default: []

    },
    exercises: {
        type: [exerciseSchema]
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    reviews: {
        type: [ratingSchema],
        default: []
    },
    startDate:{
        type: Date,
        required: false
    },
    discountDuration:{
        type: Date,
        required: false
    },
    videoLink:{
        type:String,
        required:true
    },
    students: {
        type: [Schema.Types.ObjectId],
        required: false

    },
    certificate: {
        type: String,
        default: 'generalCertificate.pdf'
    },
    promoted: {
        type: String,
        enum: ['Promoted', 'Not Promoted'],
        required: false
    }
})

```

- The router
```js
userRouter.get('/course/:id', async (req, res) => {
    try {

        const session = sessionDetails.getSession(req.session.id);
        //the current user session. If this session is not available then the user is not logged in
        //therefore they should not be allowed to view any details
        if (!session) {
            return res.status(400).json({ message:"you did not login" });
        }

        //we get the course ID provided in the request parameters
        const courseId = req.params.id;
        const { userId, type: userType } = session;

        //according to the user type, we display specific course details 
        const course = await userController.getCourse({ courseId, userType, userId });

        //we return the status OK and the whole course object to the frontend to deal with it
        res.status(200).json(course);
    } catch (error) {
        //this catches any errors that are thrown during compile time, and returns them in the response data to prevent system breakdowns.
        res.status(error.code).json({ message: error.message });
    }
})
```

- The controller

```js
async getCourse({ courseId, userType, userId }) {
    try {
        let course;
        let curr;

        //we find the user's country to know the currency that should be displayed in the frontend page
        const { country } = await Account.findOne({ _id: userId }, { country:1 })

        //corporate trainees should not be able to see the price
        if (userType == 'CORPORATE_TRAINEE') {
            course = await Course.findOne({ _id: courseId }, { price: 0 });
        }
        else {
            course = await Course.findOne({ _id: courseId });
            curr = countryPriceDetails.get(country);
        }

        //if there was no courses found in the database with this ID, we tell the frontend application that they may have entered the ID incorrectly.
        if (course === null) {
            throw new DomainError("Course not found.", 400);
        }

        //if there is currently a discount that should've been expired
        if (course.discountDuration && Date.now() > course.discountDuration) { 
            //update the local course object
            course.discountDuration = null;
            course.discount = 0;

            //update the value in the DB
            await Course.updateOne({ _id: courseId }, { discountDuration: null, discount:0 });
        }

        const response = { course }

        //append the currency, to be displayed if needed
        //the factor is the amount of money needed of this currency type to get 1 USD. This will be used later in the course price calculations
        if (curr) {
            response.currency = curr.currency;
            response.factor = curr.factor;
        }
        else {
            response.currency = "";
            response.factor = 1;
        }
        //return the response to the router to send it to the frontend
        return response;
    } catch(error) {
        //catches any compile time errors to prevent system breakdown
        //internal errors indicate a server-side issue
        if (error instanceof DomainError) throw error;
        else
        throw new DomainError("internal error", 500);
    }
}

```

- The frontend page
The code to this page is relatively huge due to the countless details of the course. We will be showing here a snippet of the frontend page code.
you can check out `CoursePage.js for full details`

```js
const CoursePage = () => {

    //endpoint code
    const { id: courseId } = useParams();
    const [currency, setCurrency] = useState("");
    const [factor, setFactor] = useState(0);
    const [price, setPrice] = useState(0);
    const [userProgress, setProgress] = useState(0);
    const[EXgrades,setEXgrades]=useState(null)
    const [course, setCourses] = useState(async () => {
        await axios.get(`http://localhost:8000/course/${courseId}`)
            .then(res => {
                console.log(res.data)
                setCourses(res.data.course);
                setCurrency(res.data.currency);
                setFactor(res.data.factor);
                setEXgrades(res.data.Exgrades);
            })
            .catch((error) => {
                console.log(error)
                if (error.response.data.message === "you did not login")
                    window.location.href = '/';
            })
    })

    return (
      //.... some elements are here
                         <div>
                                  <Paper
                                sx={{
                                    position: 'relative',
                                    color: '#000',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right',
                                    backgroundImage: `url(${img})`,
                                    backgroundSize: '20%',

                                }}
                            >
                                <Typography component="h1" variant="h3" color="inherit">
                                    Subject: {course.subject}
                                </Typography>
                                <Typography variant="h4" color="inherit">
                                    Title: {course.title}
                                </Typography>
                                <Rating defaultValue={course.rating} precision={0.1} readOnly />
                                <Typography variant="h6"> <WatchLaterOutlinedIcon /> Total Hours: {course.totalHours} </Typography>
                                <Typography variant="h6"> <GroupsOutlinedIcon />  Number of Students: {course.students.length} </Typography>
                                <Typography variant="h6"> <BoyOutlinedIcon />
                                    Taught by {course.instructors[0].firstName} {course.instructors[0].lastName}
                                    <br></br>
                                    //........some buttons for rating this instructor
                                </Typography>
                            </Paper>

                            //..the rest of the code goes here
                        </div>
    )
}
```


## Installation

### Prerequisites
Please make sure to download and install [nodeJS](https://nodejs.org/en/download/) on your personal device.
Afterwards, run this command in your Visual Studio Code terminal to install the latest version of npm

```sh
$ npm install npm@latest -g
```

1. Clone the repo
```sh
$ git clone https://github.com/Advanced-Computer-Lab-2022/Ninjas
```
This can also be done using Visual Studio Code's command palette 
  - View &rarr; Command Palette (or click Ctrl+Shift+P) then choose `Git: Clone`
  - Paste the repo URL provided in the previous command into the text field then click enter

2. Install NPM Packages in the backend directory

```sh
$ cd src
$ npm install
```

3. Install NPM Packages in the frontend directory
```sh
$ cd frontend
$ npm install
```

4. Create an environment file `.env` in the root of the backend directory `src/` and declare a variable with the MongoDB URI you wish to use. Declare a variable for the port number and the secret token as well.

Here is an example:
```
mongoURI = 'mongodb+srv://YOURDATABASENAME:YOURDATABASEPASSWORD@THERESTOFTHELINK'
PORT = 8000
TOKEN = 'ABCDEFGHIJKLMNOPQRSTUVWKYZ'
``` 
  - Please do not set the port to 3000 as the frontend project uses this port number. 

## API References

### We have used Axios to integrate between backend and frontend as well as Nodemailer for sending emails

#### Get all Refund Requests

```http
  GET /admin/viewRefundRequests
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| no        |          |                            |
| parameters|          | **Not Required**           |

#### Get acceptRefundRequests

```http
  GET /admin/acceptRefundRequest?refundRequestid=${reqId}
```

| Parameter | Type       | Description                          |
| :-------- | :-------   | :----------------------------------  |
| `reqId`   | `ObjectId` | **Required**. Id of request to fetch |

#### acceptRefundRequest({refundRequestid})

Takes id of refund request accepts it and remove it from refunds schema and get the remaining refund requests

#### Get all Access Courses Requests

```http
  GET /admin/viewCorporateRequest
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| no        |          |                            |
| parameters|          | **Not Required**           |


#### Get Corporate Requests after accepting or rejecting them

```http
  GET /admin/acceptCorporateRequest?requestId=${requestId}
```

| Parameter   | Type       | Description                          |
| :---------- | :--------- | :----------------------------------- |
| `requestId` | `ObjectId` | **Required**. Id of request to fetch |

#### acceptCorporateRequest({requestId})

Takes id of access course request accepts it and remove it from request schema and get the remaining access course requests and adds the corporate trainee that request course access to the course registered students

```http
  GET /admin/rejectCorporateRequest?requestId=${requestId}
```

| Parameter   | Type       | Description                          |
| :---------- | :--------- | :----------------------------------- |
| `requestId` | `ObjectId` | **Required**. Id of request to fetch |


#### rejectCorporateRequest({requestId})

Takes id of access course request rejects it and remove it from request schema and get the remaining access course requests

#### Get all Reported Problems

```http
  GET /admin/viewReportedProblems
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| no        |          |                            |
| parameters|          | **Not Required**           |

#### Get all reported problems after updating their status 

```http
  GET /admin/changeProgressP?reportId=${reportId}&progress=${progress}
```

| Parameter   | Type       | Description                                               |
| :---------- | :--------- | :-------------------------------------------------------- |
| `reportId`  |`ObjectId`  | **Required**. Id of report to fetch,                      |
| `progress`  |`string`    | **Required**. progress value to update this report status |                    
                                              

#### changeProgressP({ reportId, progress})

Takes id of reported problem changes its progress from initial to pending or resolved and get all reported problems after their status is updated to pending or resolved or left as is

#### Get all reported problems after unboxing one of the unseen reports 

```http
  GET /admin/viewUnseenProblems?reportId=${reportId}
```

| Parameter   | Type       | Description                         |
| :---------- | :--------- | :---------------------------------- |
| `reportId`  |`ObjectId`  | **Required**. Id of report to fetch |
          
                                              

#### viewUnseenProblems({reportId})

Takes id of reported problem and view its non-visible details and adds it to seen problems section and get all reported problems after this update

#### PUT create an account for (Admin, Corporate Trianee, Instructor) 

```http
  PUT /admin/create
```
PUT Request JSON Body
{
    "username": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "gender": "string",
    "type": "string",
    "corporateName": "string"
}
        

#### adminCreateAccounts({username, password, firstName, lastName, email, gender, type, corporateName})

Takes JSON body of put request and creates an account whether it is Corporate Trianee, Instructor or another admin and adds it to accounts data collection in our database mongo db

#### Get all Courses

```http
  GET /admin/getAllCoursesss
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| no        |          |                            |
| parameters|          | **Not Required**           |

#### PUT set a discount/promotion to a course(s) from a start date to an end date

```http
  PUT /admin/setPromotion
```
PUT Request JSON Body
{
    "selectedCourses": "string",
    "promotion": "Number",
    "startDate": "Date",
    "endDate": "Date"
}

### setPromotion({selectedCourses, promotion, startDate, endDate})

### POST Logout

```http
  POST /logout
```
| Parameter | Type      | Description                                          |
| :-------- | :-------- | :--------------------------------------------------- |
| `userId`  |`ObjectId` | **Required**. Id of user from user session to logout |
| `username`| `string`  | **Required**. username to from user session logout   |

### logout route in backend POST /logout has the function logic of getting username and id from session and kill this session


### PUT Create Course

```http
  PUT /createcourse
```
PUT Request JSON Body
{        
        "subject": "string",
        "price": "Number",
        "totalHours": "Number",
        "summary": "string",
        "title": "string",
        "videoLink": "string"
}

| Parameter       | Type      | Description                                          |
| :-------------- | :-------- | :--------------------------------------------------- |
| `instructorId`  |`ObjectId` | **Required**. Id of instructor from user session     |

### createcourse({subject, price, totalHours, summary, title, instructorId ,videoLink })

### PUT Add Subtitle

```http
  PUT /addSubtitle?courseId=${courseId}
```
PUT Request JSON Body
{        
        "text": "string",
        "hours": "Number",
        "title": "string",
        "link": "string",
        "description": "string"
}     

| Parameter       | Type      | Description                                                                             |
| :-------------- | :-------- | :-------------------------------------------------------------------------------------- |
| `instructorId`  |`ObjectId` | **Required**. Id of instructor from user session                                        |
| `courseId`      |`ObjectId` | **Required**. Id of created course passed in URL above to add a subtitle to this course |

### addsubtitle({instructorId, courseId, text, hours, title, videoLink, description })


### POST Create Exercise(s)

```http
  POST /createExercise
```
POST Request JSON Body
{        
   "courseId": "ObjectId",
   "subtitleId": "ObjectId", 
   "title": "string"
}  

### createExercise({ courseId ,subtitleId, title})


### POST Add Question(s)

```http
  POST /addQuestion2
```
POST Request JSON Body
{
      "questionText": "string" , 
      "mcq1": "string",
      "mcq2": "string",
      "mcq3": "string",
      "mcq4": "string",
      "correctAnswer": "string",
      "totalCredit": "Number"
}

### addQuestion2({ questionText, mcq1,mcq2,mcq3,mcq4, correctAnswer, totalCredit})


#### Get User Profile with all information about the courses they view 

```http
  GET /login?username=${username}&password=${password}
```

| Parameter   | Type     | Description                           |
| :---------- | :------- | :------------------------------------ |
| `username`  |`string`  | **Required**. username enterd by user |
| `password`  |`string`  | **Required**. password enterd by user |

#### login({ username, password })

Takes username and password of the user and finds them in accounts schema db collection in mongo and navigate user through their view of course page according to their type (Instructor, Individual Trainee, Corporate Trainee) or to the Admin page


#### Post User Profile with all information about the courses they view 

```http
  POST /signUp
```
POST Request JSON Body
{
      "username": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "password": "string",
      "gender": "string",
}

#### signUp({ username, firstName, lastName, email, password, gender })

Takes username,firstName, lastName, email, password, gender of the user and uses them to create a new record JSON object in accounts schema db collection in mongo


#### Post User Profile with all information about the courses they view 

```http
  POST /payForCourse2
```
POST Request JSON Body
{ 
    "courseId": "ObjectId",
    "cardNo": "Number"
}

| Parameter | Type      | Description                                |
| :-------- | :-------- | :----------------------------------------- |
| `userId`  |`ObjectId` | **Required**. Id of user from user session |

#### payForCourse2({userId, courseId, cardNo})

Takes course Id from above params in URL and card number supplied by user and user Id from user session and uses them to pay for a course


#### Get Search Results in Instructor Home 

```http
  GET /search?userId=${userId}&subject=${subject}&minPrice=${mintemp}&maxPrice=${maxtemp}&rating=${rating}&title=${search}&instructor=${inst}

```
| Parameter | Type      | Description                                                                           |
| :-------- | :-------- | :------------------------------------------------------------------------------------ |
| `userId`  |`ObjectId` | **Required**. Id of user from user session                                            |
| `subject` |`string`   | **Required**. subject to get all coursesthat includes this subject                    |
| `mintemp` |`Number`   | **Required**. minimum price to get courses of higher prices                           |
| `maxtemp` |`Number`   | **Required**. maximum price to get courses of less prices                             |
| `rating`  |`Number`   | **Required**. rating to get courses that has this rating                              |
| `search`  |`string`   | **Required**. search word to get courses that has this word in their title or subject |
| `inst`    |`string`   | **Required**. Instructor name that teaches the course                                 |


#### getSearchResult({ userId, subject, minPrice, maxPrice, rating, title, instructor})

Takes parameters and get set of courses that includes any of these parameters

#### Get Most Popular Courses 

```http
  GET /mostPopularCourses

```
| Parameter | Type      | Description      |
| :-------- | :-------- | :--------------- |
| no params |           | **Not Required** |


#### mostPopularCourses()

get all courses that has highest number of enrolled students

#### Post Rate a Course 

```http
  POST /rateCourse?userId=${user._id}&courseId=${course._id}
```
POST Request JSON Body
{ 
    "rating": "Number", 
    "text": "string" 
}

| Parameter | Type      | Description                                       |
| :-------- | :-------- | :------------------------------------------------ |
| `userId`  |`ObjectId` | **Required**. Id of user from user session        |
| `courseId`|`ObjectId` | **Required**. Id of course from URL Search params |

#### rateCourse({ userId, courseId, rating, text })

Takes course Id from above params in URL and user Id from session and applies this user rating to this course

#### Put Rate an Instructor 

```http
  PUT /rateInstructor?userId=${user._id}&instructorId=${course.instructors[0]._id}&ratingNumber=${rating}&ratingText=${text}
```

| Parameter       | Type      | Description                                           |
| :-------------- | :-------- | :---------------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session            |
| `instructorId`  |`ObjectId` | **Required**. Id of instructor from URL Search params |
| `ratingNumber`  |`Number`   | **Required**.                                         |
| `ratingText`    |`string`   | **Required**.                                         |


#### rateInstructor(instructorId, userId, ratingNumber, ratingText)

Takes all above parameters and submits rating to instructor

#### Get Delete Rating for Instructor 

```http
  GET /didRateInstructor?userId=${user._id}&instructorId=${course.instructors[0]._id}&deleteR=${didRateDelete}

```

| Parameter       | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `userId`        |`ObjectId` | **Required**. Id of user from user session              |
| `instructorId`  |`ObjectId` | **Required**. Id of instructor from URL Search params   |
| `deleteR`       |`Boolean`  | **Required**. whether user rated this instructor or not |


#### didRatedInst (instructorId , userId ,deleteR)

Takes all above parameters and makes sure that user is deleting a rating for an instructor they already rated

#### Get Information about the selected course 

```http
  GET /course/${courseId}

```

| Parameter       | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `userId`        |`ObjectId` | **Required**. Id of user from user session              |
| `courseId`      |`ObjectId` | **Required**. Id of instructor from URL Search params   |


#### getCourse({ courseId, userType, userId })

Takes all above parameters and gets all course information to open course page

#### Get Information about current user

```http
  GET /currentUser

```

| Parameter       | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `userId`        |`ObjectId` | **Required**. Id of user from user session              |


#### getUserData({ userId })

Takes above parameters and gets all user information that may be needed to be used later


#### Get Requested Course Access

```http
  GET /checkRequestedAccess?userId=${user._id}&courseId=${course._id}

```

| Parameter       | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `userId`        |`ObjectId` | **Required**. Id of user from user session              |
| `courseId`      |`ObjectId` | **Required**. Id of course from URL search params       |


#### checkRequestedAccess({ userId, courseId })



#### Post Request Course Access

```http
  POST /requestAccess?userId=${user._id}&courseId=${course._id}

```

| Parameter       | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `userId`        |`ObjectId` | **Required**. Id of user from user session              |
| `courseId`      |`ObjectId` | **Required**. Id of course from URL search params       |

#### requestAccess(userId, courseId);


#### Post Delete course rating

```http
  POST /deleteCourseRating?userId=${user._id}&courseId=${course._id}

```

| Parameter       | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `userId`        |`ObjectId` | **Required**. Id of user from user session              |
| `courseId`      |`ObjectId` | **Required**. Id of course from URL search params       |

#### deleteCourseRating({ userId, courseId })


#### Post Report Course

```http
  POST /reportCourse?userId=${user._id}&courseId=${course._id}&problem=${problem}&description=${RD}

```

| Parameter       | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `userId`        |`ObjectId` | **Required**. Id of user from user session              |
| `courseId`      |`ObjectId` | **Required**. Id of course from URL search params       |
| `problem`       |`string`   | **Required**. problem type                              |
| `RD`            |`string`   | **Required**. problem description                       |

#### ReportCourse( userId,courseId,problem,description)


#### Get Report Course

```http
  GET /viewExerciseGrade?exersiseId=${exerciseId}&userId=${user._id}

```

| Parameter       | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `userId`        |`ObjectId` | **Required**. Id of user from user session              |
| `exerciseId`    |`ObjectId` | **Required**. Id of exercise                            |

#### viewExersiseGrade(exersiseId, userId)


#### Get Refund Requests

```http
  GET /requestedTheRefund?userId=${user._id}&courseId=${course._id}

```

| Parameter       | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `userId`        |`ObjectId` | **Required**. Id of user from user session              |
| `courseId`      |`ObjectId` | **Required**. Id of course                              |

#### checkRequestedRefund({ userId, courseId })


#### Post Refund Requests

```http
  POST /requestRefund?courseId=${course._id}

```

| Parameter       | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `userId`        |`ObjectId` | **Required**. Id of user from user session              |
| `courseId`      |`ObjectId` | **Required**. Id of course                              |

#### requestRefund({ userId,courseId})


#### Get view video

```http
  GET /viewVideo?subtitleId=${subtitleId}&courseId=${courseId}
```

| Parameter       | Type      | Description                  |
| :-------------- | :-------- | :--------------------------- |
| `subtitleId`,   |`ObjectId` | **Required**. Id of subtitle |
| `courseId`      |`ObjectId` | **Required**. Id of course   |

#### viewVideo(courseId, subtitleId, userId)


#### Get average exercise grade

```http
  GET /averageExerciseGrade?courseId=${courseId}
```

| Parameter       | Type      | Description                  |
| :-------------- | :-------- | :--------------------------- |
| `courseId`      |`ObjectId` | **Required**. Id of course   |

#### averageExerciseGrade({ courseId })


#### Put pay for course from wallet

```http
  PUT /payForCourse
```
PUT Request JSON Body

{
    "courseId": "ObjectId",
    "coursePrice": "Number",
    "instId": "ObjectId"
}

#### payForCourse({userId, courseId, coursePrice})


#### Get exercise history

```http
  GET /exerciseHistory?courseId=${courseId}&userId=${user._id}
```

| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `courseId`      |`ObjectId` | **Required**. Id of course                   |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |


#### exerciseHistory({ userId, courseId })


#### Post reset password

```http
  POST /resetPassword/${userId}
```
POST Request JSON Body

{
    "password": "string"
}

| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |

#### resetPassword({ userId, password })


#### Post forgot password

```http
  POST /forgotPassword
```
POST Request JSON Body

{
    "username": "string"
}

#### forgotMyPassword({ username })


#### Get solve exercise

```http
  GET /solveExercise?userId=${userId}&courseId=${courseId}&exerciseId=${exerciseId}&subtitleId=${subtitleId}
```

| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `courseId`      |`ObjectId` | **Required**. Id of course                   |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |
| `exerciseId`    |`ObjectId` | **Required**. Id of exrcise                  |
| `subtitleId`    |`ObjectId` | **Required**. Id of subtitle                 |

#### solveExercise({ userId, exerciseId, courseId, subtitleId })


#### Post submit exercise

```http
  POST /submitExercise?userId=${userId}
```
POST Request JSON Body

{
    "solvedExercise": "string"
}

| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |
| `subtitleId`    |`ObjectId` | **Required**. Id of subtitle                 |

#### submitExercise({ userId, subtitleId, solvedExercise })


#### Post submit exercise

```http
  POST /submitExercise?userId=${userId}
```
POST Request JSON Body

{
    "solvedExercise": "string"
}

| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |
| `subtitleId`    |`ObjectId` | **Required**. Id of subtitle                 |

#### submitExercise({ userId, subtitleId, solvedExercise })


#### Get view correct answers

```http
  GET /viewCorrectAnswers?subtitleId=${subtitleId}&exersiseId=${exerciseId}&courseId=${courseId}
```

| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |
| `subtitleId`    |`ObjectId` | **Required**. Id of subtitle                 |
| `exerciseId`    |`ObjectId` | **Required**. Id of exercise                 |
| `courseId`      |`ObjectId` | **Required**. Id of course                   |

#### viewCorrectAnswers(exersiseId, subtitleId, courseId, userId)


#### Get view exercise grade

```http
  GET /viewExerciseGrade?exersiseId=${exerciseId}&userId=${userId}
```

| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |
| `exerciseId`    |`ObjectId` | **Required**. Id of exercise                 |

#### viewExersiseGrade(exersiseId, userId)


#### Get user by session

```http
  GET /userBySession
```
| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |

#### getUserData({ userId })


#### Put edit email

```http
  PUT /editEmail
```
PUT Request JSON Body

{
    "newEmail": "string"
}

| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |

#### editEmail({ userId, newEmail })


#### Put edit biography

```http
  PUT /editBiography
```
PUT Request JSON Body

{
   "newText": "string"
}

| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |

#### editBiography({ userId, newText })


#### Put change password

```http
  PUT /changePassword
```
PUT Request JSON Body
{
      "oldPassword": "string",
      "newPassword": "string"
}

| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |

#### changePassword({ userId, oldPassword, newPassword })


#### Post select country

```http
  POST /selectCountry
```
POST Request JSON Body
{ 
    "selectedCountry": "string" 
}

| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |

#### changeUserCountry({ userId, type, selectedCountry })


#### Get search for a course

```http
  GET /search?userId=${userId}&subject=${subject}&minPrice=${minPrice}&maxPrice=${maxPrice}&rating=${rating}&title=${title}instructor=${instructor}&totalHours=${totalHours}
```

| Parameter   | Type      | Description                                                                           |
| :---------- | :-------- | :------------------------------------------------------------------------------------ |
| `userId`    |`ObjectId` | **Required**. Id of user from user session                                            |
| `subject`   |`string`   | **Required**. subject to get all coursesthat includes this subject                    |
| `minPrice`  |`Number`   | **Required**. minimum price to get courses of higher prices                           |
| `maxPrice`  |`Number`   | **Required**. maximum price to get courses of less prices                             |
| `rating`    |`Number`   | **Required**. rating to get courses that has this rating                              |
| `title`     |`string`   | **Required**. search word to get courses that has this word in their title or subject |
| `instructor`|`string`   | **Required**. Instructor name that teaches the course                                 |
| `totalHours`|`Number`   | **Required**. Number of course total hours                                            |

#### getSearchResult({ userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours})



#### Get user by session

```http
  GET /viewEnrolledCourses
```
| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |

#### viewEnrolledCourses({userId})


#### Get currency of user based on their country

```http
  GET /myCurrency?country=${user.country}
```
| Parameter       | Type      | Description                                                                      |
| :-------------- | :-------- | :------------------------------------------------------------------------------- |
| `country`       |`string`   | **Required**. from countryPriceDetails schema based on user id from user session |




#### Get owed money of instructor

```http
  GET /owedMoney
```
| Parameter       | Type      | Description                                  |
| :-------------- | :-------- | :------------------------------------------- |
| `userId`        |`ObjectId` | **Required**. Id of user from user session   |

### owedMoney({ userId })



#### Get update a user(Trainee/ Instructor) wallet after a refund

```http
  GET /updateWallet
```
GET Request JSON Body
{ 
    "userId": "ObjectId",
    "instructorId": "ObjectId"
}
### updateWallet({userId, instructorId})



1. Here are all backend routes that were used

GET `localhost:8000/signUpError` 

GET `localhost:8000/search`

GET `localhost:8000/viewAllCourses`

GET `localhost:8000/user/:id`

GET `localhost:8000/userBySession`

GET `localhost:8000/viewAndFilterCourses`

GET `localhost:8000/viewExerciseGrade`

GET `localhost:8000/viewCorrectAnswers`

GET `localhost:8000/viewVideo`

GET `localhost:8000/viewEnrolledCourses`

GET `localhost:8000/solveExercise`

GET `localhost:8000/viewWallet`

GET `localhost:8000/viewReportedProblems`

GET `localhost:8000/viewProgress`

GET `localhost:8000/mostPopularCourses`

GET `localhost:8000/course/:id`

GET `localhost:8000/currentUser`

GET `localhost:8000/viewMyReports`

GET `localhost:8000/requestedTheRefund`

GET `localhost:8000/exerciseHistory`

GET `localhost:8000/myCurrency`

GET `localhost:8000/checkRequestedAccess`

GET `localhost:8000/`

GET `localhost:8000/viewInstReview`

GET `localhost:8000/getCourseRatings`

GET `localhost:8000/getCourseSubtitles`

GET `localhost:8000/view`

GET `localhost:8000/viewPage`

GET `localhost:8000/createCo`

GET `localhost:8000/SearchInst`

GET `localhost:8000/filter`

GET `localhost:8000/instructor/:id`

GET `localhost:8000/didRateInstructor`

GET `localhost:8000/viewSubtitleEx`

GET `localhost:8000/viewSubtitleVid`

GET `localhost:8000/viewMyDetails`

GET `localhost:8000/owedMoney`

GET `localhost:8000/averageExerciseGrade`

GET `localhost:8000/admin/viewReportedProblems`

GET `localhost:8000/admin/viewUnseenProblems`

GET `localhost:8000/admin/viewCorporateRequest`

GET `localhost:8000/admin/changeProgress`

GET `localhost:8000/admin/changeProgressP`

GET `localhost:8000/admin/updateWallet`

GET `localhost:8000/admin/acceptRefundRequest`

GET `localhost:8000/admin/acceptCorporateRequest`

GET `localhost:8000/admin/rejectCorporateRequest`

GET `localhost:8000/admin/getAllCoursesss`

GET `localhost:8000/admin/getAllCoursesss2`

GET `localhost:8000/admin/viewRefundRequests`


POST `localhost:8000/signUp`

POST `localhost:8000/forgotPassword`

POST `localhost:8000/resetPassword/:id`

POST `localhost:8000/logout`

POST `localhost:8000/selectCountry`

POST `localhost:8000/rateCourse`

POST `localhost:8000/submitExercise`

POST `localhost:8000/payForCourse2`

POST `localhost:8000/followUp`

POST `localhost:8000/acceptPolicy`

POST `localhost:8000/requestRefund`

POST `localhost:8000/reportCourse`

POST `localhost:8000/followUp`

POST `localhost:8000/deleteCourseRating`

POST `localhost:8000/requestAccess`

POST `localhost:8000/addQuestion2`

POST `localhost:8000/createExercise`

POST `localhost:8000/addVideo`

POST `localhost:8000/addVideoCourse`

POST `localhost:8000/acceptContract`


PUT `localhost:8000/payForCourse`

PUT `localhost:8000/createcourse`

PUT `localhost:8000/changePassword`

PUT `localhost:8000/editEmail`

PUT `localhost:8000/editBiography`

PUT `localhost:8000/addDiscount`

PUT `localhost:8000/addSubtitle`

PUT `localhost:8000/addExercise`

PUT `localhost:8000/addAnotherQuestion`

PUT `localhost:8000/rateInstructor`

PUT `localhost:8000/admin/create`

PUT `localhost:8000/admin/addDiscountAdmin`

PUT `localhost:8000/admin/setPromotion`


we use axios and the type of the route whether it is get, post or put and embed the above route examples as follows 
```js

const response = await axios.get(`http://localhost:8000/admin/acceptRefundRequest?refundRequestid=${reqId}`)
    .catch(err=>console.log(err))

```
Actually the parameter passed between braises and a $ sign is the parameter that will be used by the backend function called in the router the Admin Router in particular where /acceptRefundRequest identifies which function route in the admin router is used and inside this specific route the corresponding function that is defined in the admin controller is called with ${requestId} passed as a parameter to this function and so the response that was mentioned before is the outpit of the backend function amd it has either a successfull status of 200 indicating a successfull returned output or an error or in other words failing status of 500 indicating error

Here are code examples

In frontend .js files (for example AdminRefundRequests,js)
```js

const handleClose = async () => {
    console.log(reqId);
    const response = await axios.get(`http://localhost:8000/admin/acceptRefundRequest?refundRequestid=${reqId}`)
    .catch(err=>console.log(err))

    if (response.status === 200)
    {
      window.location.href='/AdminRefundRequests';
    }
    setOpen(false);
  };

```
In Backend Router(Admin Router)

```js

adminRouter.get('/acceptRefundRequest', async (req, res) => {
  try {

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

```
In admin Controller (here's the backend function)

```js

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

```

### Here is a code example of the above Backend routes in the `App.js` file in the src folder that runs using port 8000
```js

const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require("./routers/userRouter");
const bodyParser = require("body-parser");
const adminRouter = require("./routers/adminRouter");
const instructorRouter = require("./routers/instructorRouter");
const path = require('path');
const mongoURI = process.env.mongoURI;
const app = express();
var sess = null ;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var cors = require('cors');
const { requireAuth, sessionDetails } = require("./middleware/authMiddleware");
const router = require("./routers/logsign");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const userController = require("./controllers/userController");

app.use(express.json());
app.use(cookieParser());
  //time is in SECONDS
  const maxAge = 30 * 24 * 60 * 60;

app.use(session({
  secret: process.env.TOKEN,
  resave: false,
  httpOnly: false,
  cookie: {
    maxAge: maxAge * 1000
  },
  saveUninitialized: false,
}))


app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);
const port = process.env.PORT || "8000";
//login and signup do not require an authenticated user

app.get('/login', async (req, res) => {
  try {
      //should be changed in the evaluation

      console.log( 'entered');
      const { username, password } = req.query;
      const { user, token } = await userController.login({ username, password });

      //if this user is logged in, do not log them in again.
      // if (sessionDetails.checkUserExistence(username))
      // return res.status(400).json({ message: 'you are already logged in. Please log out of the other browser first'});

      //we will update our session in the middleware
      sessionDetails.setSession(req.session);
      sessionDetails.sessionUserID(user._id);
      sessionDetails.sessionUserType(user.type);
      sessionDetails.sessionUsername(username);

      sessionDetails.pushSession();

      //unique identifier for key-value table of cookies
      const key = username+'jwt';
      res.cookie(key, token, { httpOnly: false, secure: false, maxAge: maxAge * 1000 });
  

      res.status(200).json(user);
  }
  catch (error) {
      res.status(error.code).json({message :error.message});
  }
})

app.use('/', router);


app.use('/', requireAuth, userRouter);
// if you see the /, go use the userRouter to acess routes that controls functionalities that could be done in trainee(individual or corporate) pages

app.use('/admin', requireAuth, adminRouter);
// if you see the /, go use the userRouter to acess routes that controls functionalities that could be done in admin pages

app.use('/', requireAuth, instructorRouter);
//if you see the /, go use the instructorRouter to acess routes that controls functionalities that could be done in instructor pages


mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB is now connected!")
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    })
  })
  .catch(err => console.log(err));

  module.exports = {app , sess };

```



2. Here are all frontend routes that were used

### To be more percise these are the frontend routes that appear at the top of the pages when website actually runs and at sometimes we add some ids to these routes that will be needed in getting other pages or some new information like this example

```js
const handleClose = async () => {
    window.location.href=`/InstructorCreateEx2?courseId=${courseId}&subtitleId=${subtitleId}`; //proceed to create exercise
    setOpen(false);
  };
````
we have created a course and a subtitle and we want to pass their ids to another page whose frontend route is 
`localhost:3000/InstructorCreateEx2` so those ids are added to the route so that they can be inputted as parameters to the backend function that will create an exercise in the subtitle of this course



```js
localhost:3000/InstructorCreateEx2

localhost:3000/viewCorrectAnswers

localhost:3000/searchInstructor

localhost:3000/InstructorCreate

localhost:3000/InstructorSubtitle

localhost:3000/

localhost:3000/signup

localhost:3000/temp

localhost:3000/terms

localhost:3000/iHome

localhost:3000/tHome

localhost:3000/exercise

localhost:3000/settings

localhost:3000/settingsT

localhost:3000/ratings

localhost:3000/enrolled

localhost:3000/myReports

localhost:3000/home

localhost:3000/changePassword

localhost:3000/admin

localhost:3000/AdminViewReports

localhost:3000/AdminAccessCourse

localhost:3000/AdminAddUser

localhost:3000/AdminSetPromo

localhost:3000/AdminRefundRequests

localhost:3000/viewVideo

localhost:3000/rateInstructor

localhost:3000/viewExerciseGrade

localhost:3000/editEmail

localhost:3000/editBiography

localhost:3000/addDiscount                                                                  

localhost:3000/viewInstReview                   

localhost:3000/view

localhost:3000/getCourseRatings

localhost:3000/subtitlePage

localhost:3000/addVideoCourse

localhost:3000/addVideoSubtitle

localhost:3000/terms

localhost:3000/viewMyProfile

localhost:3000/instructor

localhost:3000/changeCountry

localhost:3000/trainee

localhost:3000/forgotPassword

localhost:3000/viewInstructorCourses

localhost:3000/traineeSearch

localhost:3000/payment

localhost:3000/checkout

localhost:3000/solveExercise

localhost:3000/resetPassword/:id

localhost:3000/mostPopularCourses

localhost:3000/course/:id

```

### Here is a code example of the above frontend routes in the `App.js` file in the frontend folder that runs using port 3000
```js

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/InstructorCrEx2' element={<InstructorCrEx2/>}></Route>
      <Route path='/InstructorCrEx' element={<InstructorCrEx/>}></Route>
      <Route path='/InstructorCreateEx2' element={<InstructorCreateEx2/>}></Route>

      <Route path='/viewCorrectAnswers' element={<ViewCorrectAnswer/>}></Route>
      <Route path='/searchInstructor' element={<SearchInstructor/>}></Route>
      <Route path='/InstructorCreate' element={<InstructorCreate/>}></Route>
      <Route path='/InstructorSubtitle' element={<InstructorSubtitle/>}></Route>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/temp' element= {<Temp/>} > </Route>
      <Route path='/terms' element= {<TermsGuest/>} >  </Route>
      <Route path='/iHome' element= {<InstructorHome/>} >  </Route>
      <Route path='/tHome' element= {<TraineeHome/>} > </Route>
      <Route path='/exercise' element= {<CreateExercise/>} > </Route>
      <Route path='/settings' element= {<Settings/>} > </Route>
      <Route path='/settingsT' element= {<Settings/>} > </Route>
      <Route path='/ratings' element={<Ratings/>}></Route>
      <Route path='/enrolled' element={<TraineeCourse/>}></Route>
      <Route path='/myReports' element={<MyReport/>}></Route>
        <Route path='/home' element= {<Home/>} >
        </Route>
        <Route path='/changePassword' element= {<ChangePassword/>} >
        </Route>
        <Route path='/admin' element= {<Admin/>} >
        </Route>
        <Route path='/AdminViewReports' element= {<AdminViewReports/>} >
        </Route>
        <Route path='/AdminAccessCourse' element= {<AdminAccessCourse/>} >
        </Route>
        <Route path='/AdminAddUser' element= {<AdminAddUser/>} >
        </Route>
        <Route path='/AdminSetPromo' element= {<AdminSetPromo/>} >
        </Route>
        
        
        <Route path='/AdminRefundRequests' element= {<AdminRefundRequests/>} >
        </Route>
        <Route path='/viewVideo' element= {<ViewVideo/>} >
        </Route>
        <Route path='/rateInstructor' element= {<RateInstructor/>} >
        </Route>
        <Route path='/viewExerciseGrade' element= {<ViewExerciseGrade/>} >
        </Route>
        <Route path='/editEmail' element= {<EditEmail/>} >
        </Route>
        <Route path='/editBiography' element= {<EditBiography/>} >
        </Route>
        <Route path='/addDiscount' element= {<AddDiscount/>} >
        </Route>
        <Route path='/viewInstReview' element= {<ViewInstRating/>} >
        </Route>
        <Route path='/view' element= {<ViewAllCourses/>} >
        </Route>
        <Route path='/getCourseRatings' element= {<ViewCourseRatings/>} >
        </Route>
        <Route path='/subtitlePage' element= {<SubtitlePage/>} >
        </Route>
        <Route path='/addVideoCourse' element= {<AddVideoCourse/>} >
        </Route>
        <Route path='/addVideoSubtitle' element= {<AddVideoSubtitle/>} >
        </Route>
        <Route path='/terms' element= {<Terms/>} >
        </Route>
        <Route path='/viewMyProfile' element= {<InstructorProfile/>} >
        </Route>
        <Route path="/instructor"
        element={<InstructorPage/>}/>
        <Route path="/changeCountry"
        element={<ChangeCountry/>}/>
        <Route path="/trainee"
        element={<TraineePage/>}/>
        <Route path="/forgotPassword"
        element={<ForgotPasswordPage/>}/>
        <Route path="/viewInstructorCourses"
        element={<InstructorCourses/>}/>
        <Route path="/traineeSearch"
        element={<TraineeSearch/>}/>
        <Route path="/payment"
        element={<Payment/>}/>
        <Route path="/checkout"
        element={<Checkout2/>}/>
        <Route path="/solveExercise" element={<SolveExercise/>}/>
      <Route path="/resetPassword/:id" element={<ResetPasswordPage/>}/>
      <Route path="/mostPopularCourses" element={<MostPopular/>}/>
      <Route path="/course/:id" element={<CoursePage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

``` 


## How to Use?

After setting up the application, use two terminals to run the server using the following steps

1. Direct the first terminal to the root of the backend directory, then run the command `nodemon app`
```sh
$ cd src
$ nodemon app

MongoDB is now connected!
Listening to requests on http://localhost:8000
```

2. Direct the second terminal to the root of the frontend directory, then run the command `npm start`
```sh
$ cd frontend
$ npm start


> frontend@0.1.0 start
> react-scripts start

Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.104:3000
```

Now you can access the website at `http://localhost:3000`

## Contribute

#### Bug Reports & Feature Requests
Please open an issue ticket to report any bugs or file feature requests.

#### Developing

Contributing developments are more than welcome! :tada:
Here are the guidelines to this type of contribution

1. Fork the Project
2. Create your Feature Branch `git checkout -b feature/AmazingFeature`
3. Commit your Changes `git commit -m 'Add some AmazingFeature'`
4. Push to the Branch `git push origin feature/AmazingFeature`
5. Open a Pull Request and wait until one of the admins approve and merge it.

## Credits
This software uses several open source packages. This includes, but is not limited to:

- [Material UI](https://mui.com/)
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [NPM](https://www.npmjs.com/)
- [Mongoose](https://mongoosejs.com/)
- Emojis are mostly taken from [here](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md#face-hand)
- [Markdown Badges](https://github.com/Ileriayo/markdown-badges)

## License
>You can check out the full license [here](https://github.com/Advanced-Computer-Lab-2022/Ninjas/blob/main/src/LICENSE.TXT)

This project is licensed under the terms of the **GNU General Public License**.
#### **NINJAS ACL © ALL COPYRIGHTS RESERVED**
