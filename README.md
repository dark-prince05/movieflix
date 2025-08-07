# movieflix

A simple web app that lets you search for movies using the [OMDb API](http://www.omdbapi.com/).  
Built with HTML, CSS, and JavaScript

Live Preview: https://dark-prince05.github.io/movieflix/

# Overview

## OMDb Endpoints used

- **Search Endpoint**:
  `https://www.omdbapi.com/?s={SEARCH_TERM}&apikey={YOUR_API_KEY}`  
   Used to fetch a list of movies based on the user's search input.  
  This provides basic information like the movie title, release year, poster, and IMDb ID.

- **Detailed Endpoint**:
  `https://www.omdbapi.com/?i={IMDB_ID}&apikey={YOUR_API_KEY}`  
  Used to fetch detailed information about a selected movie using its IMDb ID.  
  This includes genre, director, plot, rating, language, and runtime — all shown in a separate dialog box when a movie card is clicked.

## Setup

### 1.Clone this repo

git clone https://github.com/dark-prince05/movieflix.git  
cd movieflix

### 2.Get your API key OMDb API

Sign up for a free key at http://www.omdbapi.com/apikey.aspx

### 3.Insert your API key

In the `app.js` file, find these lines:

const response = await fetch(  
&nbsp;&nbsp;&nbsp;`https://www.omdbapi.com/?s=${movieName}&apikey=YOUR_API_KEY_HERE`,  
&nbsp;&nbsp;&nbsp;{ mode: "cors" }  
);

const response = await fetch(  
&nbsp;&nbsp;&nbsp;`https://www.omdbapi.com/?i=${movieId}&apikey=YOUR_API_KEY_HERE`,  
&nbsp;&nbsp;&nbsp;{ mode: "cors" }  
);

Replace YOUR_API_KEY_HERE with the key you get from http://www.omdbapi.com/apikey.aspx

### 4.Open the app

You can simply open index.html in your browser.  
Or use a simple Live Server extension in VS Code for best results.

## Usage

1.Type a movie title into the input field.  
2.Click the Search button or press Enter.  
3.A list of matching movies will appear as cards showing:

- Poster (with fallback image if not available)
- Title
- Release Year

4.Click on any movie card to open a pop-up showing:

- Poster (with fallback image if not available)
- Title
- Release Year
- Director
- Genre
- Plot Summary
- Language
- Runtime
- IMDb Rating
  If there are any errors (no results, bad input, internet issues), an appropriate message will be shown instead of breaking the app.

## Challenges

**Missing Poster Images**

- Some movie results had "Poster": "N/A" or returned broken URLs.
- Fixed by using a default placeholder image from Unsplash.
- Also added image.onerror() handling to catch and replace any broken image links.

**Empty Searches**

- Users could hit "Search" without typing anything.
- Handled this with a check to prevent blank inputs from triggering fetch requests.

**API or Network Errors**

- Bad API key or no internet? That would normally break the app.
- Wrapped the fetch calls in a try-catch block and showed custom error messages like “No Internet Connection” or the one returned by OMDb.
