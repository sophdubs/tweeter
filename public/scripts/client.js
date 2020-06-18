// Create a tweet article with the data from the input tweet object
const createTweetElement = tweetObj => {
  return `<article class="tweet">
  <header>
    <span>
      <img src="${tweetObj.user.avatars}" class="avatar">
      <span>${tweetObj.user.name}</span>
    </span>
    <span class="username">${tweetObj.user.handle}</span>
  </header>
  <main>
    <p>${escape(tweetObj.content.text)}</p>
  </main>
  <footer>
    <span>${moment(tweetObj.created_at).fromNow()}</span>
    <span><i class="fa fa-flag" aria-hidden="true"></i><i class="fa fa-retweet" aria-hidden="true"></i><i class="fa fa-heart" aria-hidden="true"></i></span>
  </footer>
</article>`;
};

// Escape the string to avoid XSS attacks
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Takes in an array of tweets and prepends them all to the tweet section container
const renderTweets = tweetObjArr => {
  const section = $('.tweet-section');
  // Make sure to empty the container before prepending all the tweets to avoid duplicates
  section.empty();
  tweetObjArr.forEach(tweetObj => {
    section.prepend(tweetObj);
  })
};

// Makes ajax GET request to fetch the existing tweets from the 'database'
const loadTweets = function() {
  $.ajax('/tweets', { type: 'GET' })
    .then((data) => {
      // Map each tweetObject to a template literal html article
      const tweetObjArray = data.map( tweet => createTweetElement(tweet));
      // Add them to the html
      renderTweets(tweetObjArray);
    })
    .catch(() => {
      console.log('An error occured while trying to fetch the tweets');
    })
};

// Make sure DOM has loaded before trying to select HTML elements and adding event listener
$(document).ready(() => {
  // Gabbing the DOM elements that will be used in the event handlers
  const textArea = $('.tweet-text-area');
  const counter = $('.counter');
  const form = $('form');
  const errorDiv = $('.error-div');
  const compose = $('.compose');
  const tweetForm = $('.new-tweet');
  const scrollBtn = $('.back-to-top');
  
  // triggers an ajax fetch on page load to display tweets
  loadTweets();

  // Event handler for keyup in text area. 
  // Updates the character count
  // Adds class 'under-zero' whe more than 140 chars are typed, which triggers a style change in the css
  textArea.on('keyup', function() {
    const numChars = 140 - this.value.length;
    counter.html(numChars);
    if (numChars < 0) {
      counter.addClass('under-zero');
    } else {
      counter.removeClass('under-zero');
    }
  });

  // Event handler for new-tweet form submission
  form.on('submit', function(event) {
    // Prevent default form submission
    event.preventDefault();
    // Form submission validation: textarea value cannot have 0 or over 140 chars
    if (!textArea.val().length || textArea.val().length > 140) {
      errorDiv.empty();
      errorDiv.append(`<p><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ${$('#tweet-text').val().length > 140 ? 'Error: Please spect the 140 character limit' : 'Error: Tweet can not be empty'} <i class="fa fa-exclamation-triangle" aria-hidden="true"></i></p>`)
      errorDiv.slideDown('slow');
      return;
    } else {
      errorDiv.slideUp('slow');
      errorDiv.empty();
    };
    // serialize the data before sending it to server
    const serializedTweet = $(this).serialize();
    // makse the ajax post request with serialized data
    $.ajax('/tweets', { type: 'POST', data: serializedTweet })
      .then(() => {
        // Reset counter to 0. 
        // Reset text area to empty
        // Reload tweets which now includes our new tweet.
        counter.html(140);
        textArea.val('');
        loadTweets();
      })
      .catch(() => {
        // Log error to console if error occurs during post request
        console.log('An error occured while attempting to post the new tweet');
      });
  });

  // Event handler for the compose new tweet button
  compose.on('click', function(event) {
    // If new-tweet form is hidden, show it, else hide it
    if (tweetForm.css('display') === 'none') {
      tweetForm.slideDown('slow');
      textArea.focus();
    } else {
      tweetForm.slideUp('slow');
    }
  });

  // Event handler for scroll
  $(document).on('scroll', (event) => {
    // If we are at top of the window, hide the 'back to top' button
    // Else, show it.
    if ($(window).scrollTop() === 0) {
      scrollBtn.css('display', 'none');
    } else {
      scrollBtn.css('display', 'block');
    }
  });

  // Event handler for click on 'back to top button'
  scrollBtn.on('click', () => {
    $(window).scrollTop(0);
  });
  
});