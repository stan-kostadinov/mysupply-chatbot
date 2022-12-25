<template>
    <chat-box></chat-box>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChatBox from './chat/ChatBox.vue'

export default defineComponent({
	components: { ChatBox },
})
</script>

<style lang="scss">
// Adding font globally to be used wherever needed
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,300;1,500&display=swap');

a, p, span, h1, h2, h3, h4, input, select {
    font-family: 'Roboto', sans-serif;
}

// Hide arrows on inputs with the type of number
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
