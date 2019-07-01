# GA-SEI-PROJECT-03

![image](https://user-images.githubusercontent.com/47919053/60426600-e2225a00-9bec-11e9-88f1-3946013dd52b.png)

# Timeframe
7 days

# Technologies used
* React
* Webpack
* MongoDB/Mongoose
* Express
* Ajax
* JavaScript (ES6)
* HTML5
* Bulma (CSS framework)
* SCSS
* GitHub
* React Select
* ReactMapBox-GL
* OpenCageData - location lookup

## Cabin Fever - React project

The brief was to build a full-stack application with a React front-end and noSQL database. The application had to include data schema and a RESTful api framework.

The application is deployed via Git on Heroku and can be found here: [Cabin Fever](https://cabin-fever.herokuapp.com).


### App overview
At project initiation, we soon agreed that we would like to work with MapBox, a service which we had not covered during the course at General Assembly. From this came the idea to emulate Google Maps, but to add Cabins on the UK's southern coast.

Our aim was to deliver an app that allowed a user to register, log in, add new cabins, and message existing cabin owners to book availablity. The model was similar to SpareRoom. There are two views available when searching for a cabin. 

1. Map View
![image](https://user-images.githubusercontent.com/47919053/60427936-b05ec280-9bef-11e9-86a4-2c64cbedc209.png)

2. List View.
![image](https://user-images.githubusercontent.com/47919053/60428585-0c761680-9bf1-11e9-96d5-68ad28b18f3c.png)


Clicking on a cabin provides information including the location, images and even a function to message the cabin owner.

![image](https://user-images.githubusercontent.com/47919053/60428788-96be7a80-9bf1-11e9-975b-94ad07a5a569.png)


#### The Code

The delivery of the cabins was incredibly fun because the data from the API was created by ourselves. The Cabin Model and Schema looked like so:

![image](https://user-images.githubusercontent.com/47919053/60429253-9d99bd00-9bf2-11e9-9dc7-0a1cdfb040c3.png)


### Future enhancements
* Upgrading the API to allow searches by size, location, price.
* Adding failed search notifications.
