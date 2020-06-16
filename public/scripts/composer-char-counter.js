$(document).ready(() => {
  // Make sure DOM has loaded before trying to select HTML elements and adding event listener
  let textArea = document.querySelector('.tweet-text-area');
  const counter = document.querySelector('.counter');
  textArea.addEventListener('keyup', function() {
    const numChars = 140 - this.value.length;
    counter.innerHTML = numChars;
    if (numChars < 0) {
      counter.classList.add('under-zero');
    } else {
      counter.classList.remove('under-zero');
    }
  });
});

