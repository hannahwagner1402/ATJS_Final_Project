<script setup>
import {ref, computed, onMounted } from 'vue'

//default scores for wins/ losses/ draws is 0
const winScore = ref(0)
const loseScore = ref(0)
const drawScore = ref(0)

const choice = ref(null)
const compChoice = ref(null)
const result = ref(null)



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

const winPercentage = computed(() => {
  const total = winScore.value + drawScore.value + loseScore.value

  // return win percentage, otherwise default is set to 0
  return total ? (winScore.value/ total) * 100 : 0
})

const play = c => {
  choice.value = c

  const choices = ['fire','water','earth']
  const random = Math.floor(Math.random()*3)
  compChoice.value = choices[random]

  const outcome = outcomes[c][compChoice.value]

  if (outcome === 'win') {
    winScore.value++
    result.value = 'You won :D'
  } else if (outcome === 'loss') {
    loseScore.value++
    result.value = 'You lost :/'
  } else {
    drawScore.value++
    result.value = "it's a tie!"
  }
  SaveScores()
}

const SaveScores = () => {
  localStorage.setItem('winScore', winScore.value)
  localStorage.setItem('drawScore', drawScore.value)
  localStorage.setItem('loseScore', loseScore.value)
}

const LoadGame = () => {
  winScore.value = parseInt(localStorage.getItem('winScore')) || 0
  drawScore.value = parseInt(localStorage.getItem('drawScore')) || 0
  loseScore.value = parseInt(localStorage.getItem('loseScore')) || 0
}

const ResetRound = () => {
  choice.value = null
  compChoice.value = null
  result.value = null
}

onMounted(() => {
  LoadGame()
  window.addEventListener('keypress', e => {
    if (e.key === 'r'){
      ResetRound()
    }
  })
})

</script>

<template>
<div class="bg-green-900 text-white text-center min-h-screen flex flex-col">
  <header class = "container mx-auto p-6 bg-green-600">
    <h1 class="text-5xl font-semibold mb-4 mt-3">Elemental Rock Paper Scissors</h1>
    <h1 class="text-2xl"><div class = "flex-row justify-center"> Choose between <text class="text-amber-400 font-bold drop-shadow-lg m-0 p-0">FIRE</text>,
      <text class="text-blue-100 font-bold drop-shadow-lg">WATER</text> and <text class="text-lime-200 font-bold drop-shadow-lg">EARTH</text></div></h1>
  </header>

  <main class = "container mx-auto p-0 flex-1 bg-green-600">
    <div v-if="choice === null" class="flex items-center justify-center p-6 -mx-6">

      <button
          @click="play('fire')"
      class="bg-white rounded-full drop-shadow-2xl w-64 p-12
      mx-6 transition-colors duration-300 hover:bg-amber-100">
        <img src="../assets/fire.png" alt="Fire" class="w-full">
      </button>

      <button
          @click="play('water')"
          class="bg-white rounded-full drop-shadow-2xl w-64 p-12
      mx-6 transition-colors duration-300 hover:bg-blue-100 shadow-inner w-64 p-12">
        <img src="../assets/water.png" alt="Water" class="w-full">
      </button>

      <button
          @click="play('earth')"
          class="bg-white rounded-full drop-shadow-2xl w-64 p-12
      mx-6 transition-colors duration-300 hover:bg-lime-200">
        <img src="../assets/earth.png" alt="Earth" class="w-full">
      </button>

    </div>

    <div v-else>
      <div class = "bg-green-700 pt-20 pb-20 ml-20 mr-20 ">
      <div class="text-3xl mb-4">
        You chose <span class="text-purple-200 font-sans md:font-serif italic">{{choice}}</span>
      </div>
      <div class="text-3xl mb-4">
        The computer chose <span class="text-yellow-200 font-sans md:font-serif italic">{{compChoice}}</span>
      </div>

      <div class="text-6xl mb-12">
        {{result}}
      </div>

      <button @click="ResetRound" class="bg-green-500 drop-shadow-lg text-xl font-semibold p-5 pl-10 pr-10">RESET GAME</button>
    </div>
    </div>

    <div class="mt-7 text-3xl mb-4">
      <text class = "text-lime-200 drop-shadow-lg">wins:</text> {{winScore}}, <text class="text-blue-300 drop-shadow-lg">draws:</text> {{drawScore}},
      <text class = "text-amber-400 drop-shadow-lg" >losses:</text> {{loseScore}}
    </div>

    <div class="text-lg mb-10">
      Win rate: {{Math.round(winPercentage)}}%

    </div>


  </main>

  <div class = "bg-green-900 p-6 rounded-b-lg drop-shadow-xl">

    <h1 class="text-3xl font-bold mt-0 text-lime-50 drop-shadow-md">RULES:</h1>

    <div class="text-lg mt-3 mb-3">

      <p class=" text-gray-200 font-sans md:font-serif">Fire beats earth, earth beats water and water beats fire. </p>
      <p class ="text-gray-200 font-semibold font-sans md:font-serif">Have fun playing!</p>

    </div>
    </div>
  </div>

</template>


