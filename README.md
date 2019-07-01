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


### Development process

Three endpoints were chosen:

* Filter by ingredient: https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
* Search by name: https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
* Random cocktail: https://www.thecocktaildb.com/api/json/v1/1/random.php

The main page is rendered from four components ```Home.js```, ```NavBar.js```, ```RandomCocktail.js``` and ```CocktailIndex.js```.

Choosing from the radio buttons (ingredient or name) sets a search variable which was appended to the api call. A ternary operator allowed us to refactor the code to a simple statement and ```scrollIntoView``` was used on submit to maximise the number of results on the page:

```
handleSubmit(e) {
  e.preventDefault()
  const endpoint = this.state.filter === 'ingredient' ? 'filter.php?i' : 'search.php?s'

  axios.get(`https://www.thecocktaildb.com/api/json/v1/1/${endpoint}=${this.state.search.searchInput}`)
    .then(res => this.setState({ data: res.data }))
    .then(() => this.searchResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}
```

#### Cocktail detail page

The delivery of the ingredients was a challenge because the data from the API was unstructured with many empty or null values, and the drinks and measures separated in to different key: value pairs.

This was resolved by filtering the response data:

```
getData(){
  axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php', {
    params: {
      i: this.props.match.params.id
    }
  })
    .then(res => {
      const data = res.data.drinks[0]

      const drinks = Object.keys(data)
        .filter(key => key.match(/ingredient/i))
        .filter(key => !!data[key] || data[key] === ' ')
        .map(key => data[key].trim())

      const measures = Object.keys(data)
        .filter(key => key.match(/measure/i))
        .filter(key => !!data[key] || data[key] === ' ')
        .map(key => data[key].trim())

      const ingredients = drinks.map((drink, index) => {
        return { drink: drinks[index], measure: measures[index] }
      })

      const cocktail = {
        image: data.strDrinkThumb,
        name: data.strDrink,
        instructions: data.strInstructions,
        glass: data.strGlass,
        alcoholic: data.strAlcoholic,
        category: data.strCategory,
        id: data.idDrink,
        ingredients
      }

      this.setState({ cocktail })
    })
}
```

##### Similar cocktails

The similar cocktails component was created by randomly choosing an ingredient from the cocktail on show and using this ingredient to make another API call.

```
getData(){
  const randomIngredient = this.props.ingredients[Math.floor(Math.random() * this.props.ingredients.length)]

  axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php', {
    params: {
      i: randomIngredient.drink
    }
