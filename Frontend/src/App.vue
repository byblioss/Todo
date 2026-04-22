<script setup lang="ts">
import { onMounted, ref } from 'vue'

type Todo = {
  Id: number
  Text: string
  Done: boolean
}

const newTodo = ref('')
const todos = ref<Todo[]>([])

async function loadTodos() {
  const response = await fetch('http://localhost:3000/todos')
  todos.value = await response.json()
}

async function addTodo() {
  if (!newTodo.value.trim()) return

  await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: newTodo.value,
    }),
  })

  newTodo.value = ''
  await loadTodos()
}

async function toggleTodo(id: number) {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'PATCH',
  })

  await loadTodos()
}

async function deleteTodo(id: number) {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE',
  })

  await loadTodos()
}

onMounted(() => {
  loadTodos()
})
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
      <li v-for="todo in todos" :key="todo.Id" class="todo-item">
        <label class="todo-label">
          <input
            type="checkbox"
            :checked="todo.Done"
            @change="toggleTodo(todo.Id)"
          />
          <span :class="{ done: todo.Done }">{{ todo.Text }}</span>
        </label>

        <button class="delete-btn" @click="deleteTodo(todo.Id)">
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