// Here we target the neccessary elements
const input = document.querySelector("#query");
const searchBtn = document.querySelector("#searchBtn");
const movies = document.querySelector("#movies");
const loading = document.querySelector("#loading");
const mainHeading = document.querySelector("#main-heading");

// fetch data from the server using fetch API, here i'm using async and await to fetch data
const retrieveData = async (movieName) => {
  try {
    loading.style.display = "block"; // to display the loading msg during the data retrieval
    movies.textContent = ""; // to clear the previous movies list
    const response = await fetch(
      `https://www.omdbapi.com/?s=${movieName}&apikey=ab8e8f87`,
      { mode: "cors" },
    );
    const data = await response.json(); // this is where details of the movies are stored

    loading.style.display = "none"; // to hide the loading msg after the data retrieval
    if (data.Response === "True") {
      // if response is true it returns the data else display the error
      return data;
    } else {
      displayError(data.Error);
    }
  } catch (error) {
    displayError("No Internet Connection");
  }
};

// this is where data is retrieved and displayed on the page (using search button)
searchBtn.addEventListener("click", async () => {
  if (input.value.trim() === "") return;
  const data = await retrieveData(input.value);
  if (data) {
    display(data);
  }
  input.value = "";
});

// this is where data is retrieved and displayed on the page (usign Enter button on the keyboard)
input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    if (input.value.trim() === "") return;
    const data = await retrieveData(input.value);
    if (data) {
      display(data);
    }
    input.value = "";
  }
});

// in this function the data is converted into html elements and append it to the dom
const display = (data) => {
  movies.textContent = "";
  mainHeading.style.display = "block";

  data.Search.forEach((movie) => {
    const movieContainer = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("p");
    const year = document.createElement("p");

    if (movie.Poster === "N/A") {
      // if poster is empty means it will have a default placeholder image
      image.src =
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdmllfGVufDB8fDB8fHww";
    } else {
      // actual image url
      image.src = movie.Poster;
    }
    image.onerror = () => {
      // if poster isn't empty but it return 404 error or other errors, this function will handle the error
      image.src =
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdmllfGVufDB8fDB8fHww";
    };
    image.alt = movie.Title;
    image.classList.add("movie-poster");
    title.textContent = `Title: ${movie.Title}`;
    title.classList.add("movie-title");
    year.textContent = `Release Year: ${movie.Year}`;
    year.id = "movie-year";
    year.classList.add("movie-year");

    movieContainer.appendChild(image);
    movieContainer.appendChild(title);
    movieContainer.appendChild(year);
    movieContainer.classList.add("movie-container");
    movieContainer.id = movie.imdbID;

    movies.appendChild(movieContainer);
  });
};

// this function is used to display the error msg
const displayError = (msg) => {
  movies.textContent = "";
  const notFound = document.createElement("h2");
  notFound.textContent = msg;
  notFound.id = "not-found";
  mainHeading.style.display = "none";

  movies.appendChild(notFound);
};

/* ----------- for detailed movie details --------------- */

const dialog = document.querySelector("dialog");

//this is where the detailed description of movie is retrieved using fetch api
const retrieveDetailedData = async (movieId) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${movieId}&apikey=ab8e8f87`,
      { mode: "cors" },
    );
    const data = await response.json();

    if (data.Response === "True") {
      // if response is true it returns the data else display the error
      return data;
    } else {
      displayError(data.Error);
    }
  } catch (error) {
    displayError("No Internet Connection");
  }
};

// this function is used to display the more detailed movie card
const movieDisplay = (movie) => {
  const movieCard = document.createElement("div");
  const movieInfo = document.createElement("div");
  const image = document.createElement("img");
  const title = document.createElement("div");
  const year = document.createElement("div");
  const director = document.createElement("div");
  const genre = document.createElement("div");
  const plot = document.createElement("div");
  const runtime = document.createElement("div");
  const ratings = document.createElement("div");
  const language = document.createElement("div");
  const closeBtn = document.createElement("button");

  if (movie.Poster === "N/A") {
    // if poster is empty means it will have a default placeholder image
    image.src =
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdmllfGVufDB8fDB8fHww";
  } else {
    // actual image url
    image.src = movie.Poster;
  }
  image.onerror = () => {
    // if poster isn't empty but it return 404 error or other errors, this function will handle the error
    image.src =
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdmllfGVufDB8fDB8fHww";
  };

  movieCard.classList.add("movie-card");
  movieInfo.classList.add("movie-info");
  image.alt = movie.Title;
  image.classList.add("dialog-img");
  title.textContent = `Title: ${movie.Title}`;
  title.classList.add("dialog-title");
  year.textContent = `Release Year: ${movie.Year}`;
  year.classList.add("dialog-year");
  director.textContent = `Director: ${movie.Director}`;
  director.classList.add("dialog-director");
  genre.textContent = `Genre: ${movie.Genre}`;
  genre.classList.add("dialog-genre");
  plot.textContent = `Plot: ${movie.Plot}`;
  plot.classList.add("dialog-plot");
  runtime.textContent = `Runtime: ${movie.Runtime}`;
  runtime.classList.add("dialog-runtime");
  ratings.textContent = `Ratings: ${movie.imdbRating}/10`;
  ratings.classList.add("dialog-ratings");
  language.textContent = `languages: ${movie.Language}`;
  language.classList.add("dialog-language");
  closeBtn.textContent = "x";
  closeBtn.classList.add("dialog-closeBtn");
  closeBtn.addEventListener("click", () => {
    dialog.close();
    movieCard.textContent = "";
  });

  movieCard.appendChild(image);
  movieInfo.appendChild(title);
  movieInfo.appendChild(year);
  movieInfo.appendChild(director);
  movieInfo.appendChild(genre);
  movieInfo.appendChild(plot);
  movieInfo.appendChild(language);
  movieInfo.appendChild(runtime);
  movieInfo.appendChild(ratings);
  movieCard.appendChild(movieInfo);
  movieCard.appendChild(closeBtn);

  dialog.appendChild(movieCard);
};

movies.addEventListener("click", async (e) => {
  const card = e.target.closest(".movie-container"); // this line uses event deligation to retrieve the information of the parent element even when we click on child elements
  if (!card || !movies.contains(card)) {
    return;
  }

  const data = await retrieveDetailedData(card.id);
  if (data) {
    movieDisplay(data);
    dialog.showModal(); // this will open the dialog box and show the details of the movie
  }
});
