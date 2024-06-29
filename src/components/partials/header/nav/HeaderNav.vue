<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { ref, watch } from 'vue'
import ThemeButton from './ThemeButton.vue'
import NavSearch from './NavSearch.vue'
import NavMenu from './NavMenu.vue'

defineProps<{
  algolia: {
    enable: boolean
  }
  menu: Record<string, string | Record<string, string>>
  site: {
    title?: string
    alternate?: string
    url?: string
    lang?: string
  }
  languageData: any
  toggleLabel: string
}>()

const down = ref(false)
const up = ref(false)
const { directions } = useScroll(window)
watch(directions, () => {
  if (directions.top) {
    down.value = false
    up.value = true
  }
  else if (directions.bottom) {
    down.value = true
    up.value = false
  }
}, { immediate: true })
</script>

<template>
  <nav id="nav" class="show" :class="{ down, up }">
    <div class="inner">
      <div class="toggle">
        <div class="lines" :aria-label="toggleLabel">
          <span class="line" />
          <span class="line" />
          <span class="line" />
        </div>
      </div>
      <NavMenu :menu="menu" :site="site" :language-data="languageData" />
      <ul id="rightNav" class="right">
        <li class="item theme">
          <ThemeButton />
        </li>
        <li v-if="algolia.enable" class="item search">
          <NavSearch />
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="stylus">
  @import '../../../../styles/_mixins';
  #nav {
    position: fixed;
    z-index: $zindex-2;
    width: 100%;
    height: 3.125rem;
    backdrop-filter: saturate(180%) blur(20px);
    the-transition();

    &.up {
      transform: translateY(0);
    }

    &.down {
      transform: translateY(-100%);
    }

    &.show {
      background: var(--nav-bg);
      box-shadow: .1rem .1rem .2rem var(--grey-9-a1);
      text-shadow: 0 0 .0625rem var(--grey-9-a1);
      color: var(--text-color);

      .line {
        background: var(--text-color);
        box-shadow: 0 0 .0625rem var(--grey-9-a1);
      }

      .item.active > a, .item.expand > a {
        color: var(--color-aqua);
        opacity: 1;
      }

      .menu {
        .submenu {
          background-color: var(--grey-1);
          .item.active a {
            color: var(--grey-0);
            opacity: 1;
          }
        }
      }
    }

    .inner {
      height: 100%;
      display: flex;
      width: $content-desktop;
      flex-wrap: nowrap;

      +desktop-large() {
        width: $content-desktop-large;
      }

      +desktop-largest() {
        width: $content-desktop-largest;
      }

      +tablet-mobile() {
        //width: auto;
      }

    }

    .toggle {
      display: none;

      +tablet-mobile() {
        the-flex();
      }

      .lines {
        padding: 1.25rem;
        width: 1.375rem;
        box-sizing: unset;
      }
    }
  }
</style>
