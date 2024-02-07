// Part 1: Numbers Facts

async function favoriteNumberFact(num) {
  let res = await axios.get(`http://numbersapi.com/${num}?json`);
  console.log(res.data.text);
}

favoriteNumberFact(9);

async function getMultipleNumberFacts(n1, n2, n3) {
  let baseURL = "http://numbersapi.com";
  let numberFacts = await Promise.all([
    axios.get(`${baseURL}/${n1}?json`),
    axios.get(`${baseURL}/${n2}?json`),
    axios.get(`${baseURL}/${n3}?json`),
  ]);

  console.log(numberFacts[0].data.text);
  console.log(numberFacts[1].data.text);
  console.log(numberFacts[2].data.text);
}

getMultipleNumberFacts(4, 21, 121);

async function getFourFacts(num) {
  let baseURL = "http://numbersapi.com";
  let numberFacts = await Promise.all([
    axios.get(`${baseURL}/${num}?json`),
    axios.get(`${baseURL}/${num}?json`),
    axios.get(`${baseURL}/${num}?json`),
    axios.get(`${baseURL}/${num}?json`),
  ]);

  console.log(numberFacts[0].data.text);
  console.log(numberFacts[1].data.text);
  console.log(numberFacts[2].data.text);
  console.log(numberFacts[3].data.text);
}

getFourFacts(14);

// Part 2: Deck of Cards

async function drawNewCard() {
  const response = await axios.get(
    "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
  );
  console.log(
    `${response.data.cards[0].value} of ${response.data.cards[0].suit}`
  );
  console.log(response)
}

drawNewCard();

async function drawTwoCards() {
    const c1 = await axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1");
    let deck_id = (c1.data.deck_id)
    const c2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );

    console.log(`${c1.data.cards[0].value} of ${c1.data.cards[0].suit}`);
    console.log(`${c2.data.cards[0].value} of ${c2.data.cards[0].suit}`);
}

drawTwoCards()


async function setup() {
    let baseURL = "https://deckofcardsapi.com/api/deck"
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
    $btn.show().on('click', async function() {
      let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
      let cardSrc = cardData.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
  }
  setup();