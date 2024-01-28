# Tech-Blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Project Description
Tech-Blog is a blog for Tech enthusiasts (Web developers, Cybersecurity Analysts, Software Engineers e.t.c) to post articles, share their thoughts and opinions on everything Tech! It allows Tech enthusiasts to sign-up or login (for existing users) and post technology-related articles. Users will be able to comment on articles posted by other users. The blog also provides users with news and information from other Tech websites via the NewsAPI.

I was motivated to build this project because of my interest in Information Technology. I want to keep abreast with the latest technology innovations, news and information. 

The project was developed based on the MERN stack framework using several Code libraries and packages. The front-end was developed using *React*, including the *React-Router*. The backend was developed using *GraphQL* with a *Node.js* and *Express.js* server. For the database, the project utilized *MongoDB* and the *Mongoose ODM*. Other packages utilized include `bcrypt`, `JWT`, `dotenv`, `jsonwebtoken`, `apollo-server-express` e.t.c. CSS was based mostly plain vanilla CSS, with icons provided by *Bootstrap Icons*.


## Link to Webpage
Click [here](https://calm-bastion-19341-fad56c37f2e7.herokuapp.com/) to view the application
## Table of Contents
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Usage](#usage)
- [License](#license)
- [Tests](#tests)

## User Story

```
As a budding IT enthusiast,
I want to share opinions on all things Information Technology with fellow enthusiasts
So that I can build a huge followership and community of tech lovers,

I want to post articles on various aspects of Information Technology
So that other users can read these articles and share their thoughts.

```

## Acceptance Criteria
```
WHEN I open the web application,
THEN the home page should display a Navigation bar which includes a "Header" with menu options "Home", "Login" and "Signup"

WHEN I click on "Login" or "Signup",
THEN I am taken to separate routes that display a login form or Signup form

WHEN I login as an existing user or Signup as a first-time user,
THEN I am taken to the home page, with the "Logout" and "Dashboard" menu options displayed in the navbar.

WHEN I click on the title of an article, 
THEN the article is displayed with accompanying comments from other users including a comment form.

WHEN I complete the comment form,
THEN my comment is displayed together with other comments by other users.

WHEN I click on the "Dashboard" menu option,
THEN I am taken to my own dashboard with a form to create a new article and the list of my own articles.

WHEN I complete the form to create a new article, 
THEN this article is displayed on the application's home page and my dashboard page.

WHEN I am not logged in and I click on the title of an article,
THEN I am prompted to log in to read the article
```


## Usage
First time users have access to the home page to view the latest articles but will need to sign-up to read the articles. Upon login, users are directed to the Home Page with the latest articles displayed on the home page, including the author, headline and date the article was posted. 

![FF-Homepage](./server/Assets/Homepage.png)

You can login:

![FF-Login](./server/Assets/Login.png)

And post your article...

![FF-Profile](./server/Assets/Dashboard.png)


## Credits
Web app developed by Kanayochi Ifediora, with support from Bootcamp Instructors, Tutors and Youtube videos

## License
This project is licensed under the MIT license.

## Questions
Any questions? please contact me via e-mail at anayoifediora@live.com

- [Github username](https://github.com/anayoifediora)
- [Project Github Repo](https://github.com/anayoifediora/Tech-Blog)