const baseUrl = 'http://numbersapi.com/'

// sec 1 part 1
function getReq(faveNum) {
    axios.get(`${baseUrl}${faveNum}?json`)
        .then(res => {
            console.log(res.data.text)
        })
}

// sec 1 part 2
const myArr = [1, 3, 6, 8];

const numList = document.querySelector('#num-list')

function getFacts(numArr) {
    const resArr = [];
    numList.innerHTML = '';
    for (let i = 0; i < numArr.length; i++) {
        resArr.push(
            axios.get(`${baseUrl}${numArr[i]}?json`)
        );
    }
    Promise.all(resArr)
        .then(masterArr => {
            // console.log(masterArr)
            masterArr.forEach(res => {
                console.log(res.data.text)
                const li = document.createElement('li')
                li.innerText = res.data.text
                numList.append(li)
            })
        })
        .catch(err => console.log(err))
}

// sec 1 part 3
function multFacts(faveNum) {
    const resArr = [];
    numList.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        resArr.push(
            axios.get(`${baseUrl}${faveNum}?json`)
        );
    }
    Promise.all(resArr)
        .then(masterArr => {
            // console.log(masterArr)
            masterArr.forEach(res => {
                console.log(res.data.text)
                const li = document.createElement('li')
                li.innerText = res.data.text
                numList.append(li)
            })
        })
        .catch(err => console.log(err))
}

// sec 2
const cardUrl = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

const deck = {}

function shuffleDeck() {
    axios.get(cardUrl)
        .then(res => {
            deck['deck_id'] = res.data.deck_id;
            deck['remaining'] = res.data.remaining
        })
}

shuffleDeck()

function getCard(deckObj) {
    const cardList = document.querySelector('#deck-list')
    axios.get(`http://deckofcardsapi.com/api/deck/${deckObj.deck_id}/draw/?count=1`)
        .then(res => {
            const suit = res.data.cards[0].suit;
            const value = res.data.cards[0].value;
            const li = document.createElement('li')
            li.innerText = `${value} of ${suit}`
            cardList.append(li)
            const remainingPara = document.querySelector('#remaining-para');
            remainingPara.innerText = `${res.data.remaining} remaining in deck`
            if (res.data.remaining === 0) {
                cardButton.removeEventListener('click', function () {
                    getCard(deck)
                })
                remainingPara.innerText = `Deck is empty!`
            }
        })
}

const cardButton = document.querySelector('#card-button')
cardButton.addEventListener('click', function () {
    getCard(deck)

})

// further study
// ALL POKEMON!!!

const fourPokemonPromises = [];
const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/'
const pokedexList = []

// function getAllPokemon() {
//     const threeUrlRes = []
//     for (let i = 1; i < 151; i++) {
//         fourPokemonPromises.push(
//             axios.get(`${pokemonUrl}${i}`)
//         );
//     }

//     // fourPokemonPromises.push(axios.get('asasddsa'))

//     Promise.all(fourPokemonPromises)
//         .then(pokemonArr => {
//             // console.log(pokemonArr)
//             pokemonArr.forEach(pokemon => {
//                 // console.log(pokemon.data.forms[0].name)
//                 // console.log(pokemon.data.forms[0].url)
//                 const pokedexObj = {}
//                 pokedexObj['name'] = pokemon.data.forms[0].name;
//                 pokedexObj['url'] = pokemon.data.forms[0].url
//                 pokedexList.push(pokedexObj)
//             })
//         })
//         .then(() => {
//             for (let i = 0; i < 3; i++) {
//                 threeUrlRes.push(axios.get(`${pokedexList[Math.floor(Math.random() * 151) + 1].url}`))
//             }
//             Promise.all(threeUrlRes)
//                 .then(res => {
//                     console.log(res)
//                 })
//         })

//         .catch(err => console.log(err))
// }

// FS part 3
const pokemonArr = [];

function getAllPokemon() {
    const threeUrlRes = []
    const nameArr = [];
    
    for (let i = 1; i < 151; i++) {
        fourPokemonPromises.push(
            axios.get(`${pokemonUrl}${i}`)
        );
    }

    // fourPokemonPromises.push(axios.get('asasddsa'))

    Promise.all(fourPokemonPromises)
        .then(pokemonArr => {
            pokemonArr.forEach(pokemon => {
                const pokedexObj = {}
                pokedexObj['name'] = pokemon.data.forms[0].name;
                pokedexObj['url'] = pokemon.data.forms[0].url
                pokedexList.push(pokedexObj)
            })
        })
        .then(() => {
            for (let i = 0; i < 3; i++) {
                threeUrlRes.push(axios.get(`${pokedexList[Math.floor(Math.random() * 151) + 1].url}`))
            }
        })
        .then(() => {
            Promise.all(threeUrlRes)
                .then(res => {
                    for (let i = 0; i < 3; i++) {
                        nameArr.push(res[i].data.name)
                    }
                    for (let i = 0; i < nameArr.length; i++) {
                        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${nameArr[i]}`)
                        .then(res => {
                            console.log('description: ', res.data.flavor_text_entries[0].flavor_text)
                            console.log('name: ', res.data.name)
                        })
                    }
                })
        })
    

        .catch(err => console.log(err))
}


getAllPokemon()

