// Load and manage the stories
let stories = []; // Global variable to hold all stories
// Ensure the page refreshes when the PWA is launched

/*
if (window.matchMedia('(display-mode: standalone)').matches) {
	window.addEventListener('pageshow', (event) => {
		if (event.persisted) {
			window.location.reload();
		}
	});
}
*/

// Fetch the stories from the JSON file
function getDayOfYear(date = new Date()) {
  // Start of the year for the given date
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  
  // Calculate the difference in milliseconds and convert to days
  const diff = date - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  
  // Return the day of the year
  return Math.floor(diff / oneDay);
}

fetch('stories.json')
  .then(response => response.json())
  .then(data => {
    stories = data; // Save stories to the global variable
    displayStory(getTodayStory()); // Display today's story on load
  });

if (window.matchMedia('(display-mode: standalone)').matches) {
    window.addEventListener('DOMContentLoaded', () => {
		displayStory(getTodayStory()); // Replace with your story-fetching logic
    });
}

// Function to get today's story based on the date
function getTodayStory() {
  const today = getDayOfYear();
  return stories[today % stories.length];
}

// Function to display a story
function displayStory(story) {
  const titleDiv = document.getElementById('story-title');
  const textDiv = document.getElementById('story-text');

  titleDiv.textContent = story.title;
  textDiv.innerHTML = formatStory(story.story);
}

// Function to format story text (convert \n to <br> and \n\n to <p>)
function formatStory(text) {
  return text
    .split('\n\n') // Split paragraphs
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`) // Convert line breaks
    .join('');
}

// Event listener for the "New Story" button
document.getElementById('new-story-btn').addEventListener('click', () => {
  if (stories.length === 0) return; // Ensure stories are loaded

  // Randomly select a story
  const randomIndex = Math.floor(Math.random() * stories.length);
  const randomStory = stories[randomIndex];

  // Display the random story
  displayStory(randomStory);
});
