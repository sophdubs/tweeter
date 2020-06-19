# Tweeter Project

Tweeter is a simple, responsive, single-page AJAX-based Twitter clone. 

## Final Product

## Dependencies
- Node
- Express
- Body-parser
- Chance
- md5
- moment


## Getting Started
1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm start` command. The 

## Project Stack
- HTML, CSS, JS, jQuery and AJAX on the client-side
- Node, Express and a local object database on the server-side

## Cusomizations
- Form toggle button(STRETCH GOAL): Dom manipulation feature which, on the click of a button, slides the form down when it is not shown and slides it back up when it is shown. 
- Scroll-to-top button(STRETCH GOAL): I built a button which shows up on the bottom right corner when the user scrolls down the page. On click, the page srcolls back to the top and the scroll button disappears. If the user scrolls up without the use of the button, it will dissapear as well.
- SASS(STRETCH GOAL): I used SASS as a CSS preprocessor which enabled me to create variables for my colors and fonts, use nesting in my stylesheets to remove redundant code, and compile all my CSS into a single file.
- Like/Flag/Retweet(PERSONAL GOAL): I made the icons in the tweet footer a bit more interactive by adding event listeners and changing the color once the user click on the heart, flag or retweet. That way, the user can at least see which tweets he/she liked, flagges or retweeted. 

## Known Issues
- All the tweet data is stored in a local object. Therefore, data is non-persistant. Every time the server is restarted, all tweets are wiped clean except for the two that are hard coded in. 
- The feature I implemented with the like/flag/retweet is also non persistant. When the page is refreshed, the icons will no longer be colored. 
