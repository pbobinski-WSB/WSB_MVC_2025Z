<script setup>
// ===== LOGIKA KOMPONENTU (JAVASCRIPT) =====

import { ref, onMounted } from 'vue'
import axios from 'axios'

// --- Zmienne reaktywne (stan komponentu) ---

// Lista użytkowników pobrana z API
const users = ref([]) 
// Obiekt przechowujący dane z formularza (dla dodawania/edycji)
const currentUser = ref({ id: null, username: '', firstName: '', lastName: '', email: '' })
// Flaga określająca, czy formularz jest w trybie edycji
const isEditing = ref(false) 
// Adres bazowy naszego API w Spring Boot
const API_URL = 'http://localhost:8080/api/users'

// --- Funkcje (metody) ---

// 1. Pobieranie wszystkich użytkowników z API (GET)
const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL)
    users.value = response.data // Aktualizuj listę użytkowników
  } catch (error) {
    console.error('Błąd podczas pobierania użytkowników:', error)
  }
}

// 2. Zapisywanie użytkownika (nowego lub edytowanego)
const saveUser = async () => {
  try {
    if (isEditing.value) {
      // Tryb edycji: wyślij zapytanie PUT
      await axios.put(`${API_URL}/${currentUser.value.id}`, currentUser.value)
    } else {
      // Tryb dodawania: wyślij zapytanie POST
      await axios.post(API_URL, currentUser.value)
    }
    // Po zapisie odśwież listę i zresetuj formularz
    await fetchUsers()
    resetForm()
  } catch (error) {
    console.error('Błąd podczas zapisywania użytkownika:', error)
  }
}

// 3. Przygotowanie formularza do edycji
const editUser = (user) => {
  isEditing.value = true
  // Kopiujemy obiekt użytkownika, aby nie modyfikować go bezpośrednio na liście
  currentUser.value = { ...user } 
}

// 4. Usuwanie użytkownika (DELETE)
const deleteUser = async (id) => {
  // Proste okno dialogowe do potwierdzenia
  if (confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
    try {
      await axios.delete(`${API_URL}/${id}`)
      await fetchUsers() // Odśwież listę
    } catch (error) {
      console.error('Błąd podczas usuwania użytkownika:', error)
    }
  }
}

// 5. Resetowanie formularza
const resetForm = () => {
  isEditing.value = false
  currentUser.value = { id: null, username: '', firstName: '', lastName: '', email: '' }
}

// --- Cykl życia komponentu ---

// Wywołaj funkcję fetchUsers() zaraz po zamontowaniu komponentu w DOM
onMounted(fetchUsers)
</script>

<template>
  <!-- ===== WYGLĄD KOMPONENTU (HTML) ===== -->

  <div class="card shadow-sm">
    <div class="card-body p-4">

      <!-- SEKCJA FORMULARZA -->
      <h2 class="mb-4">{{ isEditing ? 'Edit User' : 'Add New User' }}</h2>
      <form @submit.prevent="saveUser">
        <div class="row g-3">
          <div class="col-md-6">
            <input type="text" v-model="currentUser.username" class="form-control" placeholder="Username" required>
          </div>
          <div class="col-md-6">
            <input type="email" v-model="currentUser.email" class="form-control" placeholder="Email" required>
          </div>
          <div class="col-md-6">
            <input type="text" v-model="currentUser.firstName" class="form-control" placeholder="First Name">
          </div>
          <div class="col-md-6">
            <input type="text" v-model="currentUser.lastName" class="form-control" placeholder="Last Name">
          </div>
        </div>
        <hr class="my-4">
        <div class="d-flex justify-content-end">
          <button v-if="isEditing" type="button" class="btn btn-secondary me-2" @click="resetForm">Cancel</button>
          <button type="submit" class="btn btn-success">{{ isEditing ? 'Save Changes' : 'Add User' }}</button>
        </div>
      </form>

      <hr class="my-5">

      <!-- SEKCJA LISTY UŻYTKOWNIKÓW -->
      <h2 class="mb-4">Users List</h2>
      <table class="table table-striped table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="users.length === 0">
            <td colspan="4" class="text-center text-muted">No users found.</td>
          </tr>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.firstName }} {{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-warning" @click="editUser(user)">Edit</button>
              <button class="btn btn-sm btn-danger ms-2" @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>