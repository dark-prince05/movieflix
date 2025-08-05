// Here we target the neccessary elements
const input = document.querySelector("#query");
const searchBtn = document.querySelector("#searchBtn");
const movies = document.querySelector("#movies");

// fetch data from the server using fetch API, here i'm using async and await to fetch data
const retrieveData = async (movieName) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${movieName}&apikey=ab8e8f87`,
      { mode: "cors" },
    );
    const data = await response.json(); // this is where details of the movies are stored

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

searchBtn.addEventListener("click", async () => {
  // this is where data is retrieved and displayed on the page
  const data = await retrieveData(input.value);
  if (data) {
    display(data);
  }
});

const display = (data) => {
  // in this function the data is converted into html elements and append it to the dom
  movies.textContent = "";

  data.Search.forEach((movie) => {
    const movieContainer = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("p");
    const year = document.createElement("p");

    if (movie.Poster === "N/A") {
      image.src =
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdmllfGVufDB8fDB8fHww";
    } else {
      image.src = movie.Poster;
    }
    image.alt = movie.Title;
    image.id = "movie-poster";
    title.textContent = `Name: ${movie.Title}`;
    title.id = "movie-title";
    year.textContent = `Release Year: ${movie.Year}`;
    year.id = "movie-year";

    movieContainer.appendChild(image);
    movieContainer.appendChild(title);
    movieContainer.appendChild(year);
    movieContainer.id = "movie-container";

    movies.appendChild(movieContainer);
  });
};

const displayError = (msg) => {
  // this function is used to display the error msg
  movies.textContent = "";
  const notFound = document.createElement("p");
  notFound.textContent = msg;

  movies.appendChild(notFound);
};
