# cs465-fullstack
# Project Overview

Travlr Getaways is a full stack web application developed during my CS 465 course. The project includes a customer-facing travel website and an administrative single-page application (SPA). Administrators can log in and manage travel packages using a database.

# Architecture

The project used Express, HTML, JavaScript, and Angular to develop the frontend. Express and HTML were used to display the customer-facing website, while Angular was used to create the administrative SPA. The SPA provides a more interactive experience because users can navigate and manage travel packages without reloading the entire page.

MongoDB was used for the backend because it is a NoSQL database that stores information in flexible documents. This made it easier to manage travel packages and connect the database with the application's API.

# Functionality

JSON is a data format used to exchange information, while JavaScript is a programming language used to create application functionality. JSON connects the frontend and backend by allowing the API to send and receive travel package information.

Throughout the project, I refactored code to improve organization and functionality. For example, I separated database operations into REST API endpoints and created reusable Angular components for displaying and managing trips. Reusable components reduce duplicate code, make maintenance easier, and improve consistency throughout the application.

# Testing

I tested the application using the browser, Postman, and API requests. The GET method retrieves travel packages, POST adds new packages, PUT updates existing packages, and DELETE removes packages. Each method uses an API endpoint to communicate with the database.

Adding authentication made testing more challenging because protected endpoints required a valid login token. I tested the login functionality and verified that authorized administrators could access the features needed to manage travel packages.

# Reflection

This course helped me improve my understanding of full stack web development and how different technologies work together. I gained experience using JavaScript, Express, Angular, MongoDB, REST APIs, and authentication.

I also improved my debugging, testing, and problem-solving skills. Completing this project gave me more confidence in developing web applications and prepared me for my goal of becoming a software developer.
