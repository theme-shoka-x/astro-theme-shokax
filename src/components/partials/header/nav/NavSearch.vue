<script setup lang="ts">
import { transition } from '@library/anime'

function displaySiteSearch() {
  document.body.style.overflow = 'hidden'
  transition(document.querySelector('#search > div') as HTMLElement, 'shrinkIn', () => {
    (document.querySelector('.search-input') as HTMLInputElement).focus()
  })
}
</script>

<template>
  <i class="ic i-search" @click="displaySiteSearch" />
</template>
