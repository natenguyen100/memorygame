document.addEventListener("DOMContentLoaded", function() {
 const card = document.querySelectorAll('.card');
  const front = document.querySelectorAll('.front');
  const container = document.querySelector('.card-container');
  const score = document.querySelector('.score span');
  const reloadButton = document.querySelector('.restart');


  document.querySelector('.start').addEventListener('click', function () {
    document.querySelector('.screen').style.display = 'none';
    document.querySelector('.game-screen').style.display = 'block';
    restartGame();
  });

  reloadButton.addEventListener('click', function () {
    location.reload();
  });

  function shuffleCards() {
    card.forEach(function(c) {
      const num = [...Array(card.length).keys()];
      const random = Math.floor(Math.random() * card.length);
      c.style.order = num[random];
    });
  }

  function clicking() {
    for (let i = 0; i < card.length; i++) {
      front[i].classList.add('show', 'flipped');

      setInterval(function() {
        front[i].classList.remove('show');
      }, 2000);

      card[i].addEventListener('click', () => {
        front[i].classList.add('flip');
        const flippedCard = document.querySelectorAll('.flip');

        if (flippedCard.length == 2) {
          container.style.pointerEvents = 'none';

          setInterval(function() {
            container.style.pointerEvents = 'all';
          }, 1000);

          match(flippedCard[0], flippedCard[1]);
        }
      });
    }
  }

  function match(cardOne, cardTwo) {
    if (cardOne.dataset.index === cardTwo.dataset.index) {
        score.innerHTML = parseInt(score.innerHTML) + 1;

        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');

        cardOne.classList.add('match');
        cardTwo.classList.add('match');

        if (parseInt(score.innerHTML) === 8) {
            setTimeout(function() {
                alert("You Won!");
            }, 500);
        }

        if (document.querySelectorAll('.match').length === card.length) {
            setTimeout(function() {
                restartGame();
            }, 1000);
        }
    } else {
        setTimeout(function() {
            cardOne.classList.remove('flip');
            cardTwo.classList.remove('flip');
        }, 500);
    }
}

  shuffleCards();
  clicking();
});
