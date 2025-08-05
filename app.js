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

searchBtn.addEventListener("click", async () => {
  // this is where data is retrieved and displayed on the page (using search button)
  if (input.value.trim() === "") return;
  const data = await retrieveData(input.value);
  if (data) {
    display(data);
  }
});

input.addEventListener("keydown", async (e) => {
  // this is where data is retrieved and displayed on the page (usign Enter button on the keyboard)
  if (e.key === "Enter") {
    if (input.value.trim() === "") return;
    const data = await retrieveData(input.value);
    if (data) {
      display(data);
    }
  }
});

const display = (data) => {
  // in this function the data is converted into html elements and append it to the dom
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
    image.id = "movie-poster";
    title.textContent = `Title: ${movie.Title}`;
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
  const notFound = document.createElement("h2");
  notFound.textContent = msg;
  notFound.id = "not-found";
  mainHeading.style.display = "none";

  movies.appendChild(notFound);
};
