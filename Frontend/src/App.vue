<script setup lang="ts">
import { ref } from 'vue'

type Todo = {
  id: number
  text: string
  done: boolean
}

const newTodo = ref('')
const todos = ref<Todo[]>([])

function addTodo() {
  if (!newTodo.value.trim()) return

  todos.value.push({
    id: Date.now(),
    text: newTodo.value,
    done: false,
  })

  newTodo.value = ''
}

function toggleTodo(id: number) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) {
    todo.done = !todo.done
  }
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter((t) => t.id !== id)
}
</script>

<template>
  <main class="container">
    <h1>Todo App</h1>

    <div class="form">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Neue Aufgabe eingeben"
        @keyup.enter="addTodo"
      />
      <button @click="addTodo">Hinzufügen</button>
    </div>

    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <label class="todo-label">
          <input
            type="checkbox"
            :checked="todo.done"
            @change="toggleTodo(todo.id)"
          />
          <span :class="{ done: todo.done }">{{ todo.text }}</span>
        </label>

        <button class="delete-btn" @click="deleteTodo(todo.id)">
          Löschen
        </button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 20px;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type='text'] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px 14px;
  cursor: pointer;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.todo-label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.done {
  text-decoration: line-through;
  color: gray;
}

.delete-btn {
  margin-left: 10px;
}
</style>
