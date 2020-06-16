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


// What tweetObjects data looks like:
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(() => {
  
  const tweetObjArr = data.map( tweet => createTweetElement(tweet));
  renderTweets(tweetObjArr);

});