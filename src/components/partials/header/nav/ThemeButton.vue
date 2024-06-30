<script setup lang="ts">
import { ref } from 'vue'
import { promiseTimeout, useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: undefined,
})
const toggleDark = useToggle(isDark)
const isNekoDark = ref(isDark.value)
const showNeko = ref(false)
async function changeTheme() {
  showNeko.value = !showNeko.value
  await promiseTimeout(710)
  if (isDark.value) {
    isNekoDark.value = false
  }
  else {
    isNekoDark.value = true
  }
  await promiseTimeout(2500)
  showNeko.value = !showNeko.value
  toggleDark()
}
</script>

<template>
  <i class="ic" :class="{ 'i-sun': !isDark, 'i-moon': isDark }" @click="changeTheme" />
  <Teleport to="body">
    <Transition name="neko">
      <div v-show="showNeko" id="neko" :class="{ dark: isNekoDark }">
        <div class="planet">
          <div class="sun" />
          <div class="moon" />
        </div>
        <div class="body">
          <div class="face">
            <section class="eyes left">
              <span class="pupil" />
            </section>
            <section class="eyes right">
              <span class="pupil" />
            </section>
            <span class="nose" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="stylus" scoped>
  @import '../../../../styles/_mixins';
  .neko-enter-active,
  .neko-leave-active {
    transition: opacity 0.5s ease;
  }

  .neko-enter-from,
  .neko-leave-to {
    opacity: 0;
  }

  #neko {
    @extend $fix-fullscreen;
    background: linear-gradient(to top, #fddb92 0%, #d1fdff 80%);

    .planet {
      position: fixed;
      left: -50%;
      top: -50%;
      width: 200%;
      height: 200%;
      animation: rotate 2s cubic-bezier(.7, 0, 0, 1);
      transform-origin: center bottom;
    }

    &:before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
      background: linear-gradient(to top, #30cfd0 0%, #330867 100%);
      transition: 2s ease all;
    }

    .sun, .moon {
      position: absolute;
      border-radius: 100%;
      left: 55%;
      top: 32%;
    }

    .sun {
      height: 40px;
      width: 40px;
      background: #ffee94;
      box-shadow: 0 0 40px #ffee94;
      opacity: 1;
    }

    .moon {
      height: 24px;
      width: 24px;
      background: #eee;
      box-shadow: 0 0 20px #fff;
      opacity: 0;
    }

    .body {
      display: block;
      position: absolute;
      bottom: -20px;
      height: 140px;
      width: 135px;
      left: 50%;
      margin-left: -100px;
      background: #777;
      transition: all .25s ease-in-out;
      animation: slideUpBigIn 1s;

      &:before, &:after  {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border-bottom: 20px solid #777;
        top: -20px;
        transition: all .25s ease-in-out;
      }
      &:before {
        border-left: 0 solid transparent;
        border-right: 30px solid transparent;
        left: 0;
      }
      &:after {
        border-right: 0 solid transparent;
        border-left: 30px solid transparent;
        right: 0;
      }

      .eyes {
        display: block;
        position: absolute;
        background: #ffee94;
        height: 40px;
        width: 40px;
        border-radius: 100%;
        bottom: 80px;
      }

      .eyes.left {
        left: 12px;
      }

      .eyes.right {
        right: 12px;
      }

      .eyes .pupil, .nose {
        display: block;
        position: relative;
        background: #ffb399;
        border-radius: 100%;
        margin: 0 auto;
      }

      .eyes .pupil {
        height: 100%;
        width: 5px;
        transition: width 1s .5s ease-in-out;
      }

      .nose {
        top: 45px;
        height: 10px;
        width: 10px;
      }
    }

    &.dark {
      &:before {
        opacity: 1;
      }

      .sun {
        opacity: 0;
      }

      .moon {
        opacity: 1;
      }

      .body {
        transition: all .25s ease-in-out;
        background: #444;
        &:before {
          border-bottom: 20px solid #444;
        }
        &:after {
          border-bottom: 20px solid #444;
        }

        .eyes .pupil {
          height: 90%;
          width: 34px;
          margin: 5% auto;
        }
      }
    }
  }
</style>
