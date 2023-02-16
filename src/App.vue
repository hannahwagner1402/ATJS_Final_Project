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
<div class="bg-indigo-400 text-white text-center min-h-screen flex flex-col">
  <header class = "container mx-auto p-6">
    <h1 class="text-4xl">Elemental Rock Paper Scissors</h1>
    <h1 class="text-2xl">Choose between FIRE, WATER, and EARTH</h1>
  </header>

  <main class = "container mx-auto p-6 flex-1">
    <div v-if="choice === null" class="flex items-center justify-center -mx-6">

      <button
          @click="play('fire')"
      class="bg-white rounded-full shadow-lg w-64 p-12
      mx-6 transition-colors duration-300 hover:bg-indigo-800">
        <img src="../assets/fire.png" alt="Fire" class="w-full">
      </button>

      <button
          @click="play('water')"
          class="bg-white rounded-full shadow-lg w-64 p-12
      mx-6 transition-colors duration-300 hover:bg-indigo-800">
        <img src="../assets/water.png" alt="Water" class="w-full">
      </button>

      <button
          @click="play('earth')"
          class="bg-white rounded-full shadow-lg w-64 p-12
      mx-6 transition-colors duration-300 hover:bg-indigo-800">
        <img src="../assets/earth.png" alt="Earth" class="w-full">
      </button>

    </div>

    <div v-else>
      <div class="text-3xl mb-4">
        You chose <span class="text-indigo-300">{{choice}}</span>
      </div>
      <div class="text-3xl mb-4">
        The computer chose <span class="text-indigo-300">{{compChoice}}</span>
      </div>

      <div class="text-6xl mb-12">
        {{result}}
      </div>

      <button @click="ResetRound" class="bg-purple-300 text-lg py-2 px-4">Reset Game</button>
    </div>

    <div class="mt-12 text-3xl mb-4">
      wins: {{winScore}}, draws: {{drawScore}}, losses: {{loseScore}}
    </div>

    <div class="text-lg">
      Win rate: {{Math.round(winPercentage)}}%

    </div>

    <br>
    <div>
      <h1 class="text-2xl mt-6">Click HERE to read the rules</h1>
    </div>
  </main>

</div>
</template>


