import { defineStore } from 'pinia'

export interface Todo {
  id: number
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

interface State {
  items: Todo[] | []
}

const state = (): State => ({
  items: []
})

const getters = {
  getTodoById: (state: State) => (id: number) => state.items.find((i: Todo) => i.id === id),
  getOrderedTodos: (state: State) => (order: string = 'newest') => {
    const items = state.items

    if (order === 'newest') {
      return items.sort((a: Todo, b: Todo) => b.createdAt.getTime() - a.createdAt.getTime())
    } else if (order === 'oldest') {
      return items.sort((a: Todo, b: Todo) => a.createdAt.getTime() - b.createdAt.getTime())
    }

    return items
  },
  getCompletedTodos: (state: State) => state.items.filter((i: Todo) => i.completed)
}

const actions = {
  addTodo(title: string) {
    this.items.push({
      id: this.items.length + 1,
      title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  },
  updateTodo(id: number, { title, completed }: { title?: string, completed?: boolean }) {
    const todoIndex = this.items.findIndex((i: Todo) => i.id === id)

    if (todoIndex !== -1) {
      this.items[todoIndex] = {
        ...this.items[todoIndex],
        title: title || this.items[todoIndex].title,
        completed: completed || this.items[todoIndex].completed,
        updatedAt: new Date()
      }
    }
  },
  removeTodo(id: number) {
    const todoIndex = this.items.findIndex((i: Todo) => i.id === id)

    if (todoIndex !== -1) {
      this.items.splice(todoIndex, 1)
    }
  }
}

export const useTodoStore = defineStore('todo', {
  state,
  getters,
  actions
})
