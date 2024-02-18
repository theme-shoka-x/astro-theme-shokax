<script setup lang="ts">
import { onMounted, ref } from 'vue'

const displayLoading = ref(true)

const Loader = {
  timer: setTimeout(() => {}, 0),
  lock: false,
  show() {
    clearTimeout(this.timer)
    document.body.classList.remove('loaded')
    displayLoading.value = true
    Loader.lock = false
  },
  hide(sec?: number) {
    this.timer = setTimeout(this.vanish, sec || 3000)
  },
  vanish(): void {
    if (Loader.lock)
      return
    document.body.classList.add('loaded')
    Loader.lock = true
  },
}

onMounted(() => {
  Loader.hide(500)
})
</script>

<template>
  <Transition name="fade">
    <div v-if="displayLoading" id="loading" @click="Loader.vanish">
      <div class="cat" />
      <div class="body">
        <div class="head">
          <div class="face" />
        </div>
        <div class="foot" />
        <div class="tummy-end" />
        <div class="bottom" />
        <div class="legs left" />
        <div class="legs right" />
      </div>

      <div class="paw">
        <div class="hands left" />
        <div class="hands right" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
