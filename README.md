## 🌎 About LocationGit

LocationGit allows users to search for top GitHub users by location. Results are then displayed with their respective GitHub statistics.
Users can enter a city into the search box to view the top GitHub users from that location. Note: The displayed results are based on the location provided by the users themselves on their GitHub profiles.

LocationGit interfaces with the GitHub API to fetch the top users for the specified location. The primary metric for ranking is the number of followers, but this may change in future iterations.
The app displays profile details of each ranked user, such as their profile picture, username, full name, follower count, number of public repositories, and a direct link to their GitHub profile. Due to API usage restrictions, only 10 users are displayed at a time.

## 🛠 Setup and Installation

Make sure you have Node.js and npm installed.

## Setup Your Enviroment Variables by creating .env file in your project and the following line

```
VITE_GITHUB_TOKEN = "Your Github Token Here"

```

## Install dependencies

```
npm install
```

## Run the app in development mode

```
npm run dev
```
