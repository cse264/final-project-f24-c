[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=17273407&assignment_repo_type=AssignmentRepo)
# CSE264 Project 4: Building a React Application with Open Triva Database!
## Due: Monday, Dec 2, 2023 at 11:59 PM
## Add your full name and Lehigh email address to this README!

In this assignment, you will use React to create a Trivia Game application using the Open Trivia Database[https://opentdb.com/].  You will be using the Material UI Component Library[https://mui.com/] that implements Google's Material Design.  Feel free to use any component and icons which will you develop a fun and interactive trivia application!

All the code and packages you need is in this Github Classroom repo.  Do not install any other packages.

### Open Trivia Database
The Open Trivia Database is an open sourced database with an API layer on top.  Since this is an open API, the API may response with a 429 error indicatoring 'Too Many Requests'.  These will reset in a moment or two.

All information regarding the API, including endpoint and response overview can be found on the API documentation page[https://opentdb.com/api_config.php]

### React Application
The React Application should fulfull the following User Requirements:

* Basic App Structure
    * Create a home screen with options to select a category and difficulty level (easy, medium, hard).
    * Add a "Start Quiz"/"Get Questions" button to initiate the quiz after selecting options.
* Quiz Functionality
    * Fetch questions based on the selected category and difficulty level using the Trivia API.
    * Display each question with four multiple-choice answers or True/False selection. 
    * Ensure that the answers are randomized (Do not always have the first selection as the correct answer)
    * Users should be able to select one answer per question.
    * Questions should either be displayed on the page OR Include a "Next" button to move to the next question after answering.
    * Once answered, indicate whether the questionw as answered correctly or not
* Scoring System
    * Keep track of correct answers to calculate the user's score.
    * At the end of the quiz, display the total score and the percentage of correct answers.
* Result Summary Screen
    * Provide a summary page at the end of the quiz showing:
        * Total score out of total questions.
        * Percentage of correct answers.
    * Offer a "Retry Quiz"/"Restart Quiz" button.
    * Users should be able to restart another quiz without reloading the page
* Additional Requirements
    * Additional styling or animations for better user experience.


### Install and Run
You must have node.js running on your machine. Once you have cloned this project you can run `npm install` to install all the packages for this project. Then running `npm run start` will run the dev version of this code, which will run this project on localhost:3000

### Grading
* **70 Points** - React Application statsifys all the User Requirements listed above.  There are no bugs during renderings, quiz execution, or quiz restart. 
* **15 Points** - React Application is visually appealing.
* **10 Points - Create a 5 minute video and include a link to it in this README that covers and explains how your code works. 
* **5 Points** - Backend and Frontend code is well commented and easy to read/follow.

* If code doesn't run/compile you can get no more than a 65. But please write comments and a README to explain what you were trying to do. 
