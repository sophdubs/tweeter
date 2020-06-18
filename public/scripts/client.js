const createTweetElement = tweetObj => {
  return `<article class="tweet">
  <header>
    <span>
      <img src="${tweetObj.user.avatars}">
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

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = tweetObjArr => {
  const section = $('.tweet-section');
  section.empty();
  tweetObjArr.forEach(tweetObj => {
    section.prepend(tweetObj);
  })
};

const loadTweets = function() {
  $.ajax('/tweets', { type: 'GET' })
    .then((data) => {
      const tweetObjArray = data.map( tweet => createTweetElement(tweet));
      renderTweets(tweetObjArray);
    })
    .catch(() => {
      console.log('an error occured');
    })
};

$(document).ready(() => {
  
  loadTweets();

  $('form').on('submit', function(event) {
    event.preventDefault();
   
    if (!$('#tweet-text').val().length || $('#tweet-text').val().length > 140) {
      $('.error-div').empty();
      $('.error-div').append(`<p><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ${$('#tweet-text').val().length > 140 ? 'Error: Please spect the 140 character limit' : 'Error: Tweet can not be empty'} <i class="fa fa-exclamation-triangle" aria-hidden="true"></i></p>`)
      $('.error-div').slideDown('slow');
      return;
    } else {
      $('.error-div').slideUp('slow');
      $('.error-div').empty();
    };

    const serializedTweet = $(this).serialize();

    $.ajax('/tweets', { type: 'POST', data: serializedTweet })
      .then(() => {
        $('.counter').html(140);
        loadTweets();
        $('#tweet-text').val('');
      })
      .catch(() => {
        console.log('something went wrong..');
      });
  });

  $('.compose').on('click', function(event) {
    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').slideDown('slow');
      $('#tweet-text').focus();
    } else {
      $('.new-tweet').slideUp('slow');
    }
  });

  $(document).on('scroll', (event) => {
    if ($(window).scrollTop() === 0) {
      $('.back-to-top').css('display', 'none');
    } else {
      $('.back-to-top').css('display', 'block');
    }
  });

  $('.back-to-top').on('click', () => {
    $(window).scrollTop(0);
  });
  
});