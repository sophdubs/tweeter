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
    section.append(tweetObj);
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
    const serializedTweet = $(this).serialize();
    console.log(serializedTweet);

    $.ajax('/tweets', { type: 'POST', data: serializedTweet })
      .then(() => {
        console.log('done?');
      })
      .catch(() => {
        console.log('something went wrong..');
      });
  });
});