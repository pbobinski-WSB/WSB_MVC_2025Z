<script setup>
// Importujemy nasz nowo stworzony komponent
import UserManagement from './components/UserManagement.vue'
</script>

<template>
  <main class="container mt-4">
    <!-- I po prostu go tutaj wyświetlamy -->
    <UserManagement />
  </main>
</template>

<style>
  /* Dodajemy globalny styl dla tła, tak jak w wersji MPA */
  body {
    background-color: #f8f9fa;
  }
</style>