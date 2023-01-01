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
