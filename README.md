# Samsara Coding Problem Generator

Samsara Coding Problem Generator is a React-based web application that leverages the OpenAI API to generate random coding problems, complete with solutions and explanations. The project is divided into two main parts: the backend for API calls and the frontend for data fetching and displaying.

## Installation

Follow the instruction below to install and run the react app on your system:

1. Clone the project into your system
    ```
    git clone https://github.com/manishacharya60/samsara-coding-problems-generator.git
    ```
2. If you want to run the `backend` locally, go into the `backend` folder and create a file named `.env`
3. Add the following line in your `.env` file:
    ```
    OPENAI_API_KEY=<Your OpenAI API Key Here>
    ```
5. Then, run the following command. 
    ```
    $ node .
    ```
    By default, the backend runs on [http://localhost:8080](http://localhost:8080)
6. Then, go back to the `frontend` folder and run the following commands
    ```
    $ npm install
    ```
7. In the `fetchdata()` function update your API URL with `http://localhost:8080`
8. Finally, run the following command
    ```
    $ npm start
    ```
    By default, the frontend runs on [http://localhost:3000](http://localhost:3000)

## Features

A few features I have implemented in this project are:

1. **Tabbed Interface:** Separate tabs for questions and solutions for better organization.
2. **Comprehensive Content:** Each question includes examples, solutions in Java, explanations, and complexities.  
3. **Dynamic Generation:** Fetches new and unique coding problems on each request.
