<script lang="ts" setup>
import { useTodoStore } from './stores/todo';

const store = useTodoStore()
const newTodo = ref('')

function addTodo() {
  store.addTodo(newTodo.value)

  newTodo.value = ''
}
</script>

<template>
  <div>
    <input v-model="newTodo" @keydown.enter.prevent="addTodo">
    <ItemList :items="store.items" />
  </div>
</template>
