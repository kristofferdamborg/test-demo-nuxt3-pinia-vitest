import { describe, beforeEach, expect, it } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore, Todo } from '../stores/todo'

describe('useTodoStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('inits store', () => {
    const store = useTodoStore()

    expect(store).toBeDefined()
  })

  it('inits store with no items', () => {
    const store = useTodoStore()

    expect(store.items).toEqual([])
  })

  it('creates a todo', () => {
    const store = useTodoStore()

    store.addTodo('test')

    expect(store.items[0].title).toEqual('test')
  })

  it('updates a todo', () => {
    const store = useTodoStore()

    store.addTodo('test')

    const todo = store.items[0]

    store.updateTodo(todo.id, { title: 'test2' })

    expect(store.items[0].title).toEqual('test2')

    store.updateTodo(todo.id, { completed: true })

    expect(store.items[0].completed).toEqual(true)
  })

  it('removes a todo', () => {
    const store = useTodoStore()

    store.addTodo('test')

    const todo = store.items[0]

    store.removeTodo(todo.id)

    expect(store.items[0]).not.toBeDefined()
  })

  it('gets a todo by id', () => {
    const store = useTodoStore()

    store.addTodo('test')

    const todo = store.items[0]
    const foundTodo = store.getTodoById(todo.id)

    expect(foundTodo).toStrictEqual(todo)
  })

  it('gets ordered todos without mutating state', () => {
    const store = useTodoStore()

    store.addTodo('test1')
    store.addTodo('test2')
    store.addTodo('test3')

    const todoA = store.items[0]
    const todoB = store.items[1]
    const todoC = store.items[2]

    const items = store.items

    // Ordered by newest
    const orderedItemsByNewest = store.getOrderedTodos()

    expect(orderedItemsByNewest[0].createdAt.getTime()).toEqual(todoC.createdAt.getTime())
    expect(orderedItemsByNewest[1].createdAt.getTime()).toEqual(todoB.createdAt.getTime())
    expect(orderedItemsByNewest[2].createdAt.getTime()).toEqual(todoA.createdAt.getTime())

    // Ordered by oldest
    const orderedItemsByOldest = store.getOrderedTodos('oldest')

    expect(orderedItemsByOldest[0].createdAt.getTime()).toEqual(todoA.createdAt.getTime())
    expect(orderedItemsByOldest[1].createdAt.getTime()).toEqual(todoB.createdAt.getTime())
    expect(orderedItemsByOldest[2].createdAt.getTime()).toEqual(todoC.createdAt.getTime())

    // Invalid order
    const orderedItemsByInvalidOrder = store.getOrderedTodos('invalidOrder')

    expect(orderedItemsByInvalidOrder).toStrictEqual(store.items)

    // Mutate state
    expect(store.items).toEqual(items)
  })

  it('gets completed todos', async () => {
    const store = useTodoStore()

    store.addTodo('test1')
    store.addTodo('test2')

    const firstTodo = store.items[0]

    store.updateTodo(firstTodo.id, { completed: true })

    const completedTodos = store.getCompletedTodos

    expect(completedTodos.length).toEqual(1)
    expect(completedTodos[0].completed).toEqual(true)
  })
})
