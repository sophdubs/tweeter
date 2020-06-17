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
    <p>${tweetObj.content.text}</p>
  </main>
  <footer>
    <span>${tweetObj.created_at}</span>
    <span>⛳ ⤵ 💟 </span>
  </footer>
</article>`;
};

const renderTweets = tweetObjArr => {
  const section = $('.tweet-section');
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
    // 
    if (!$('#tweet-text').val().length || $('#tweet-text').val().length > 140) {
      $('#tweet-text').val().length > 140 ? alert('Too many characters') : alert('Tweet cannot be empty');
      return;
    };

    const serializedTweet = $(this).serialize();

    $.ajax('/tweets', { type: 'POST', data: serializedTweet })
      .then(() => {
        loadTweets();
        $('#tweet-text').val('');
        console.log('done');
      })
      .catch(() => {
        console.log('something went wrong..');
      });
  });
});