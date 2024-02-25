<div align="center">

  <h1>Recipe Manager</h1>
  
  <p>
    A Recipe Manager web application with backend in Node.js and frontend in React.js 
  </p>
  
  
<!-- Badges -->
<p>
  <a href="https://github.com/keli214/recipe-manager/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/keli214/recipe-manager" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/keli214/recipe-manager" alt="last update" />
  </a>
  <a href="https://github.com/keli214/recipe-manager/network/members">
    <img src="https://img.shields.io/github/forks/keli214/recipe-manager" alt="forks" />
  </a>
  <a href="https://github.com/keli214/recipe-manager/stargazers">
    <img src="https://img.shields.io/github/stars/keli214/recipe-manager" alt="stars" />
  </a>
  <a href="https://github.com/keli214/recipe-manager/issues/">
    <img src="https://img.shields.io/github/issues/keli214/recipe-manager" alt="open issues" />
  </a>
  <a href="https://github.com/keli214/recipe-manager/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/keli214/recipe-manager.svg" alt="license" />
  </a>
</p>
   
<h4>
    <a href="https://github.com/keli214/recipe-manager/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/keli214/recipe-manager">Documentation</a>
  <span> · </span>
    <a href="https://github.com/keli214/recipe-manager/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/keli214/recipe-manager/issues/">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [:notebook\_with\_decorative\_cover: Table of Contents](#notebook_with_decorative_cover-table-of-contents)
  - [:star2: About the Project](#star2-about-the-project)
    - [:camera: Screenshots](#camera-screenshots)
    - [:space\_invader: Tech Stack](#space_invader-tech-stack)
    - [:dart: Features](#dart-features)
    - [:key: Environment Variables](#key-environment-variables)
    - [:running: Run Locally](#running-run-locally)
    - [:triangular\_flag\_on\_post: Run with Docker](#triangular_flag_on_post-run-with-docker)
  - [:compass: Roadmap](#compass-roadmap)
  - [:warning: License](#warning-license)
  - [:handshake: Contact](#handshake-contact)
  - [:gem: Acknowledgements](#gem-acknowledgements)

  

<!-- About the Project -->
## :star2: About the Project
A a responsive, dynamic singe-page website that provides everything you need to effectively store and edit recipes.

<!-- Screenshots -->
### :camera: Screenshots

<div align="center"> 
  <img src="/frontend/src/images/screenshot.png" alt="screenshot" />
</div>


<!-- TechStack -->
### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://html.com/html5/">HTML 5</a></li>
    <li><a href="https://www.w3.org/Style/CSS/">CSS</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://nodejs.org/">Node.js</a></li>
    <li><a href="https://expressjs.com/">Express.js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

<details>
<summary>DevOps</summary>
  <ul>
    <li><a href="https://www.docker.com/">Docker</a></li>
  </ul>
</details>

<!-- Features -->
### :dart: Features

- Search for Recipes
  - apply filters to search results
    - cusine type 
    - diet
    - intolerance 
    - meal type
- Store Recipes in Cookbook
  - seperate recipes by cookbooks
  - edit saved recipes
  - ingredients shopping checklist 

<!-- Env Variables -->
### :key: Environment Variables

To run this project, you will need to add the following environment variables to your backend/config.json file and .env file respectively

`mongodb.connectionString` `SPOONACULAR_API_KEY`

<!-- Run Locally -->
### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/keli214/recipe-manager.git
```

Go to the project directory

```bash
  cd recipe-manager
```

Install dependencies

```bash
  cd backend
  npm install
  cd frontend
  npm install
```

Start the backend server

```bash
  cd backend
  npm start
```

Start the frontend client

```bash
  cd frontend
  npm start
```


<!-- Run with Docker -->
### :triangular_flag_on_post: Run with Docker

build docker images

```bash
  docker-compose build
```

Run container and services

```bash
  docker-compose up
```

Use following paths

```bash
  Backend server : localhost:5000/
  User Frontend : localhost:3000/ 
```


<!-- Roadmap -->
## :compass: Roadmap

* [x] Implement filters for search 
* [ ] Implement a API proxy for Spoonacular API

<!-- License -->
## :warning: License

Distributed under the no License. 


<!-- Contact -->
## :handshake: Contact

Keli Wang - [@linkedin_handle](https://www.linkedin.com/in/keliw21452/) - keli21452@gmail.com

Project Link: [https://github.com/keli214/recipe-manager](https://github.com/keli214/recipe-manager)


<!-- Acknowledgments -->
## :gem: Acknowledgements

Use this section to mention useful resources and libraries that you have used in your projects.

 - [Spoonacular](https://spoonacular.com/)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)

