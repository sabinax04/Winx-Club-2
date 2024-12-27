// Game part -->
let currentQuestion = 1;
const totalQuestions = 10;
const answers = {};

function startQuiz() {
  document.getElementById("intro").style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";
  showQuestion(currentQuestion);
  document.getElementById("result").style.display = "none";
  document.querySelector(".navigation").style.display = "flex";
  togglePreviousButton();
}

function selectAnswer(questionId, fairy, button) {
  answers[questionId] = fairy;
  const buttons = document.querySelectorAll(`#${questionId} .selectButton`);
  buttons.forEach((btn) => {
    btn.style.backgroundColor = "";
  });
  button.style.backgroundColor = "#FDEEF5";
}

function showQuestion(index) {
  for (let i = 1; i <= totalQuestions; i++) {
    const question = document.getElementById(`question${i}`);
    if (question) {
      question.style.display = i === index ? "block" : "none";
    }
  }
}

function calculateResult() {
  const fairyCounts = {};

  Object.values(answers).forEach((fairy) => {
    fairyCounts[fairy] = (fairyCounts[fairy] || 0) + 1;
  });

  let resultFairy = null;
  let maxCount = 0;
  for (const [fairy, count] of Object.entries(fairyCounts)) {
    if (count > maxCount) {
      maxCount = count;
      resultFairy = fairy;
    }
  }

  const resultElement = document.getElementById("result");
  resultElement.style.display = "block";
  resultElement.textContent = `You are ${resultFairy}!`;
  resultElement.style.fontSize = "3rem";
  resultElement.style.marginTop = "4rem";

  document.querySelector(".navigation").style.display = "none";
}

function nextQuestion() {
  const currentQuestionElement = document.getElementById(
    `question${currentQuestion}`
  );
  if (currentQuestionElement) {
    currentQuestionElement.style.display = "none";
  }

  currentQuestion++;
  if (currentQuestion <= totalQuestions) {
    showQuestion(currentQuestion);
  } else {
    calculateResult();
  }

  togglePreviousButton();
}

function previousQuestion() {
  if (currentQuestion > 1) {
    const currentQuestionElement = document.getElementById(
      `question${currentQuestion}`
    );
    if (currentQuestionElement) {
      currentQuestionElement.style.display = "none";
    }

    currentQuestion--;
    showQuestion(currentQuestion);
  }

  togglePreviousButton();
}

function togglePreviousButton() {
  const previousButton = document.querySelector(
    'button[onclick="previousQuestion()"]'
  );
  if (previousButton) {
    previousButton.disabled = currentQuestion === 1;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".quiz-container").style.display = "none";
  document.querySelector(".navigation").style.display = "none";
});

// Film part -->
const API_KEY = "fb3876e4";
const searchQuery = "Winx Club";
let currentPage = 1;
let isLoading = false;

function fetchMovies() {
  if (isLoading) return;
  isLoading = true;

  const searchUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}&page=${currentPage}`;
  const loadingElement = document.getElementById("loading");

  loadingElement.style.display = "block";
  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        const movies = data.Search;
        const moviesList = document.getElementById("movies-list");

        movies.forEach((movie) => {
          const movieItem = document.createElement("div");
          movieItem.classList.add("movie-item");

          movieItem.innerHTML = `
            <img src="${
              movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"
            }" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}</p>
            <button class="get-movie-btn">Go to the movie</button>
          `;

          movieItem.style.border = ".5px solid #ec008c";
          movieItem.style.padding = "1rem";
          movieItem.style.margin = "1rem";
          movieItem.style.textAlign = "center";

          const getMovieButton = movieItem.querySelector(".get-movie-btn");
          getMovieButton.addEventListener("click", () => {
            window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank");
          });

          moviesList.appendChild(movieItem);
        });

        currentPage += 1;

        if (movies.length < 10) {
          loadingElement.textContent = "No more movies to load.";
        } else {
          isLoading = false;
        }
      } else {
        loadingElement.textContent = "No movies found.";
      }
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      loadingElement.textContent = "Failed to load movies.";
    })
    .finally(() => {
      loadingElement.style.display = "none";
    });
}

fetchMovies();

function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal() {
  var modals = document.getElementsByClassName("modal");
  for (var i = 0; i < modals.length; i++) {
    modals[i].style.display = "none";
  }
}
