<script setup>
import {ref, computed, onMounted } from 'vue'

// defining the scores
const winScore = ref(0)
const loseScore = ref(0)
const drawScore = ref(0)

// defining results
const choice = ref(null)
const compChoice = ref(null)
const result = ref(null)



// defining the logic of the different outcomes of the game
const outcomes = {
  fire:{
    fire: 'draw',
    water: 'loss',
    earth: 'win',
  },
  water:{
    fire: 'win',
    water: 'draw',
    earth: 'loss',
  },
  earth:{
    fire: 'loss',
    water: 'win',
    earth: 'draw',
  }
}

// calculating the overall winpercentage based on the win/ draw and lose score
const winPercentage = computed(() => {
  const total = winScore.value + drawScore.value + loseScore.value

  // return win percentage, otherwise default is set to 0
  return total ? (winScore.value/ total) * 100 : 0
})

// player choice
const play = c => {
  choice.value = c

  // randomized computer choice
  const choices = ['fire','water','earth']
  const random = Math.floor(Math.random()*3)
  compChoice.value = choices[random]

  const outcome = outcomes[c][compChoice.value]

  // returning the outcome of the game
  if (outcome === 'win') {
    winScore.value++
    result.value = 'You won! :)'
  } else if (outcome === 'loss') {
    loseScore.value++
    result.value = 'You lost :/'
  } else {
    drawScore.value++
    result.value = "it's a tie!"
  }
  SaveScores()
}

// locally saving win/lose/draw score
const SaveScores = () => {
  localStorage.setItem('winScore', winScore.value)
  localStorage.setItem('drawScore', drawScore.value)
  localStorage.setItem('loseScore', loseScore.value)
}

//Loading the game
const LoadGame = () => {
  winScore.value = parseInt(localStorage.getItem('winScore')) || 0
  drawScore.value = parseInt(localStorage.getItem('drawScore')) || 0
  loseScore.value = parseInt(localStorage.getItem('loseScore')) || 0
}

//Reseting the game round
const ResetRound = () => {
  choice.value = null
  compChoice.value = null
  result.value = null
}

//Loading the game
onMounted(() => {
  LoadGame()
})

</script>

<!-- Adding styles with tailwind (defined my main colors in tailwind.config.js & imported a font from google
fonts into the main.css-->



<template>

  <!-- Main page -->
<div class="bg-bggreen text-white text-center min-h-screen flex flex-col ">
  <header class = "container mx-auto p-6 bg-green-900 drop-shadow-lg">
    <h1 class="text-5xl font-semibold mb-4 mt-3">ELEMENTAL ROCK PAPER SCISSORS</h1>
    <h1 class="text-2xl font-light"><div class = "flex-row justify-center"> Choose between <text class="text-orange drop-shadow-lg m-0 p-0">FIRE</text>,
      <text class="text-blue  drop-shadow-lg">WATER</text> and <text class="text-green drop-shadow-lg">EARTH</text></div></h1>
  </header>


  <main class = "container mx-auto p-0 flex-1 bg-lightgreen">
    <div v-if="choice === null" class="flex items-center justify-center p-6 -mx-6 mt-4">

      <button
          @click="play('fire')"
      class="bg-white rounded-full drop-shadow-2xl w-60 p-11
      mx-6 transition-colors duration-300 hover:bg-amber-100">
        <img src="../assets/fire.png" alt="Fire" class="w-full">
      </button>

      <button
          @click="play('water')"
          class="bg-white rounded-full drop-shadow-2xl w-60 p-11
      mx-6 transition-colors duration-300 hover:bg-blue-100 shadow-inner w-64 p-12">
        <img src="../assets/water.png" alt="Water" class="w-full">
      </button>

      <button
          @click="play('earth')"
          class="bg-white rounded-full drop-shadow-2xl w-60 p-11
      mx-6 transition-colors duration-300 hover:bg-lime-200">
        <img src="../assets/earth.png" alt="Earth" class="w-full">
      </button>

    </div>

    <!-- Results page -->
    <div v-else>
      <div class = "bg-lightgreen mx-auto ">
      <div class="text-3xl mb-4 mt-10 font-light">
        You chose <span class="font-medium italic">{{choice}}</span>
      </div>
      <div class="text-3xl mb-4 font-light">
        And I chose <span class="font-medium italic">{{compChoice}}</span>
      </div>

      <div class="text-6xl mb-7 font-medium">
        {{result}}
      </div>

      <button @click="ResetRound" class="bg-white drop-shadow-lg text-xl font-light text-black p-6 pl-10 pr-10 mb-9">RESET GAME</button>
    </div>
    </div>

    <div class="text-3xl mb-4 mt-2">
      <text class = "text-bggreen drop-shadow-lg">wins:</text> {{winScore}}, <text class="text-darkblue drop-shadow-lg">draws:</text> {{drawScore}},
      <text class = "text-orange drop-shadow-lg" >losses:</text> {{loseScore}}
    </div>

    <div class="text-lg font-light mb-5">
      Win rate: {{Math.round(winPercentage)}}%

    </div>


  </main>

  <!-- Explaining the rules of the game -->
  <div class = "bg-bggreen rounded-b-lg drop-shadow-xl">

    <h1 class="text-3xl font-bold mt-4 drop-shadow-md">RULES:</h1>

    <div class="text-lg mt-2 mb-3">

      <p class=" font-light">Fire beats earth, earth beats water and water beats fire. </p>
      <p class ="font-light">Have fun playing!</p>

    </div>
    </div>
  </div>

</template>


