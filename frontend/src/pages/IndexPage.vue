<template>
  <q-page class="flex flex-center">
    <div>{{ message }}</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const message = ref('Loading...')

onMounted(async () => {
  try {
    // เรียกใช้ VITE_API_URL จาก env
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const response = await axios.get(`${apiUrl}/api/demo`)
    message.value = response.data
  } catch (error) {
    message.value = 'Error loading data'
  }
})
</script>