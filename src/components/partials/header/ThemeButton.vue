<script setup lang="ts">
import { ref } from 'vue'

const isSun = ref(true)
const isDark = ref(false)
const HTML = document.querySelector('html') as HTMLElement

isSun.value = HTML.getAttribute('data-theme') === 'dark' ? false : true
isDark.value = !isSun.value

function changeTheme() {
    isSun.value = !isSun.value
    isDark.value = !isDark.value
    if (isDark.value) {
        HTML.setAttribute('data-theme', 'dark')
    } else {
        HTML.removeAttribute('data-theme')
    }
}
</script>

<template>
    <i class="ic" :class="{'i-sun': isSun, 'i-moon': isDark}" @click="changeTheme"></i>
</template>

<style lang="stylus">

</style>