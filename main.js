const toggle = document.getElementById('toggle')
toggle.addEventListener('click', dark)
const sun = document.querySelector('#sun')
sun.addEventListener('click', light)
const body = document.querySelector('body')
const wordInput = document.querySelector('.searchbar input')
const searchbar = document.querySelector('.searchbar')
const sound = document.querySelector('#sound')
const meanings = document.querySelector('.meanings')
const secondBlock = document.querySelector('.meanings2')

function dark () {
    body.style.backgroundColor = 'black'
    toggle.style.color = 'white'
    wordInput.style.background = '#555555'
    wordInput.style.color = 'white'
    searchbar.style.boxShadow = '1px .5px white'
    body.style.color = 'white'
    sun.style.display = 'block'
    toggle.style.display = 'none'
    document.querySelector('.title i').style.color = 'white'
  } 
  function light () {
    body.style.backgroundColor = 'white'
    toggle.style.color = 'black'
    wordInput.style.background = 'lightgrey'
    wordInput.style.color = 'black'
    searchbar.style.boxShadow = '1px .5px black'
    body.style.color = 'black'
    toggle.style.display = 'block'
    sun.style.display = 'none'
    document.querySelector('.title i').style.color = 'black'
  }
  


const searchBtn = document.querySelector('.searchbar button i')
searchBtn.addEventListener('click', search)


async function search () {
  try {
    let word = document.querySelector('.searchbar input').value 
    document.querySelector('.content').style.display = 'none'
    document.querySelector('.root').style.display = 'block'
    document.querySelector('.root button').style.display = 'block'
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
     const responseJson = await response.json()
    const data = responseJson
    console.log(data)
    sound.setAttribute("src", data[0].phonetics[0].audio)
    document.querySelector('.title h2').innerText = `${word}`
    document.querySelector('.transcription').innerText = data[0].phonetic
    document.querySelector('.word-info h4').innerText = (data[0].meanings[0].partOfSpeech).toLowerCase()
    const ul = document.createElement('ul')
    for(let i = 0; i < (data[0].meanings[0].definitions.length); i++) {
      const li = document.createElement('li')
      const p = document.createElement('p')
      li.innerText = data[0].meanings[0].definitions[i].definition
      p.innerText = data[0].meanings[0].definitions[i].example
      li.appendChild(p)
      ul.appendChild(li)
      console.log(li)
    }
    console.log(ul)
    meanings.innerHTML = ''
    secondBlock.innerHTML = ''
    meanings.appendChild(ul)
    if(data.length > 1) {
      console.log('good')
      for (let i = 0; i < (data[0].meanings[0].definitions.length); i++) {
        const li = document.createElement('li')
        const p = document.createElement('p')
        li.innerText = data[0].meanings[1].definitions[i].definition
        p.innerText = data[0].meanings[1].definitions[i].example
        li.appendChild(p)
        ul.appendChild(li)
        console.log(li)
      }
    }
    secondBlock.innerHTML = ''
    meanings.innerHTML = ''
    secondBlock.appendChild(ul)
    document.querySelector('.title2 h2').innerText = (data[0].meanings[1].partOfSpeech).toLowerCase()
    document.querySelector('.title2 h2').style.fontSize = '1rem'
    const unorderedList = document.createElement('ul')
     for (let i = 0; i < (data[0].meanings[1].definitions.length); i++) {
       const list = document.createElement('li')
       const para = document.createElement('p')
       list.innerText = data[0].meanings[1].definitions[i].definition
       para.innerText = data[0].meanings[1].definitions[i].example
       list.appendChild(para)
       unorderedList.appendChild(list)
       console.log(list)
     }
     document.querySelector('.secondPart1').innerHTML = ''
     document.querySelector('.secondPart1').appendChild(unorderedList)
   }
   catch {
     /*document.querySelector('.error1').innerText = `Sorry pal, we couldn't find definitions for the word you were looking for`
     document.querySelector('.error2').innerText = `You can try the search again at later time or head to the web instead.`*/
   }
  }



function playSound() {
  sound.play();
}