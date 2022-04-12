<script lang="ts" setup>
import { Todo } from '../stores/todo'

const props = defineProps<{
  items: Todo[]
}>()
</script>

<template>
  <div>
    <div v-for="item in items" :key="item.id">
      {{ item.title }}
    </div>
  </div>
</template>
