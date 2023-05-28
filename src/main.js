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
const queryInput = document.querySelector('.searchbar input')

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
    sound.setAttribute('src', '')
      for (let i = 0; i < data[0].phonetics.length; i++) {
        if(data[0].phonetics[i].audio !== '') {
          sound.setAttribute("src", data[0].phonetics[i].audio)
        }
      }
    document.querySelector('.title h2').innerText = `${word}`
    if (data[0].phonetic === '' || typeof data[0].phonetic === 'undefined') {
      document.querySelector('.transcription').innerText = ''
    } else {
      document.querySelector('.transcription').innerText = data[0].phonetic
    }
    document.querySelector('.word-info h4').innerText = (data[0].meanings[0].partOfSpeech).toLowerCase()
    
    let span = document.querySelector('span')
    const hr = document.createElement('hr')
    if(span.innerHTML === '') {
      span.append(hr)
    }
    /* First Section */
    
    const ul = document.createElement('ul')
    for(let i = 0; i < (data[0].meanings[0].definitions.length); i++) {
      const li = document.createElement('li')
      const p = document.createElement('p')
      li.innerText = data[0].meanings[0].definitions[i].definition
      if(typeof data[0].meanings[0].definitions[i].example !== 'undefined'){
        p.innerText = data[0].meanings[0].definitions[i].example
      } else {
        p.innerText = ''
      }
      li.appendChild(p)
      ul.appendChild(li)
      console.log(li)
    }
    console.log(ul)
    meanings.innerHTML = ''
    secondBlock.innerHTML = ''
    meanings.appendChild(ul)
    
    /* Second Section */
    const secondHeader = document.createElement('h4')
    secondHeader.innerText = data[0].meanings[1].partOfSpeech
    const ulist = document.createElement('ul')
    for (let i = 0; i < (data[0].meanings[1].definitions.length); i++) {
      const list = document.createElement('li')
      const para = document.createElement('p')
      list.innerText = data[0].meanings[1].definitions[i].definition
      if (typeof data[0].meanings[1].definitions[i].example !== 'undefined') {
        para.innerText = data[0].meanings[1].definitions[i].example
      } else {
        para.innerText = ''
      }
      list.appendChild(para)
      ulist.appendChild(list)
    }
    secondBlock.innerHTML = ''
    secondBlock.append(secondHeader, ulist)
    

    /* Synonyms */

    const synonyms = document.createElement('ol')
     for(let i = 0; i < (data[0].meanings[0].synonyms.length); i++) {
       const synonymsList = document.createElement('li')
       synonymsList.innerText = data[0].meanings[0].synonyms[i]
       synonyms.appendChild(synonymsList)
       console.log(synonymsList)
     }
     const header = document.createElement('h3')
     header.innerText = 'Synonyms'
     document.querySelector('.synonyms').innerHTML = ''
     
     if(synonyms.childNodes.length !== 0) {
       document.querySelector('.synonyms').append(header, synonyms)
       header.style.fontSize = '1rem'
     } 
     
     
     /* Antonyms */
     
     const antonyms = document.createElement('ol')
     for (let i = 0; i < (data[0].meanings[0].antonyms.length); i++) {
       const antonymsList = document.createElement('li')
       antonymsList.innerText = data[0].meanings[0].antonyms[i]
       antonyms.appendChild(antonymsList)
       console.log(antonymsList)
     }
     const antonymsHeader = document.createElement('h3')
     antonymsHeader.innerText = 'Antonyms'
     document.querySelector('.antonyms').innerHTML = ''
     
     if (antonyms.childNodes.length !== 0) {
       document.querySelector('.antonyms').append(antonymsHeader, antonyms)
       antonymsHeader.style.fontSize = '1rem'
     } 
     
     /* Footer */
    if(document.querySelector('.root').innerHTML !== '') {
      document.querySelector('footer').style.display = 'block'
    }
   }
   catch {
     /*document.querySelector('.error1').innerText = `Sorry pal, we couldn't find definitions for the word you were looking for`
     document.querySelector('.error2').innerText = `You can try the search again at later time or head to the web instead.`*/
   }
    queryInput.value = ''
  }
  
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      search();
    }
  }
  queryInput.addEventListener('keydown', handleKeyDown)
function playSound() {
  sound.play();
}

