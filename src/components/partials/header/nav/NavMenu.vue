<script setup lang="ts">
import MenuItem from '@components/MenuItem.vue'

const props = defineProps<{
  menu: Record<string, string | Record<string, string>>
  site: {
    title?: string
    alternate?: string
    url?: string
    lang?: string
  }
  languageData: any
}>()

const menuEntries = Object.entries(props.menu).map(([name, value]) => {
  if (typeof value !== 'string') {
    return [name, Object.entries(value)]
  }
  return [name, value]
}) as [string, string | [string, string][]][]
</script>

<template>
  <ul class="menu">
    <li class="item title">
      <a :href="site.url" rel="start">
        {{ site.alternate || site.title }}
      </a>
    </li>
    <template v-for="([name, value], index) in menuEntries" :key="index">
      <MenuItem v-if="typeof value === 'string'" :name="name" :path="value" :language-data="languageData" />
      <template v-for="([subName, subValue], subIndex) in value" v-else :key="subIndex">
        <MenuItem v-if="subName === 'default'" :name="name" :path="subValue" :parent="true" :sub-list="value" :language-data="languageData" />
      </template>
    </template>
  </ul>
</template>

<style lang="stylus">
  @import '../../../../styles/_mixins';
  .menu {
    padding: .625rem 0;
    margin: 0;
    width: 100%;

    .item {
      display: inline-block;
      position: relative;

      padding: 0 .625rem;
      letter-spacing: .0625rem;
      text-align: center;

      +mobile() {
        display: none;

        &.title {
          display: block;
        }
      }

      .ic {
        margin-right: .5rem;
      }

      &:not(.title) a {
        display: block;
        font-size: $font-size-medium;

        @extend $hover-underline;
      }

      &.active:not(.dropdown), &:not(.dropdown):hover {
        a::before {
          width: 70%;
        }
      }
    }

    .submenu {
      display: none;
      position: absolute;
      margin-top: .5rem;
      padding: 0;
      width: max-content;
      background-color: var(--grey-9-a5);
      box-shadow: 0 .3125rem 1.25rem -.25rem var(--grey-9-a1);
      border-radius: .625rem 0;
      animation: slideUpIn .3s;

      &::before {
        position: absolute;
        top: -1.25rem;
        left: 0;
        width: 100%;
        height: 2.5rem;
        content: '';
      }

      &:hover {
        display: block;
      }

      .item {
        display: block;

        &:first-child{
          border-radius: .625rem 0 0 0;
        }

        &:last-child{
          border-radius: 0 0 .625rem 0
        }

        a {
          display: inline-block;
          padding: .3rem .7rem;
          width: 100%;
          text-shadow: none;
          &::before {
            content: none;
          }
        }

        &:hover a {
          transform: translateX(.3rem);
        }

        &:hover, &.active {
          @extend $color-btn;
          a {
            opacity: 1;
          }
        }
      }
    }

    .item.dropdown {
      >a::after {
        content: "";
        display: inline-block;
        margin-left: .3rem;
        vertical-align: middle;
        border: .3rem solid transparent;
        border-top-color: currentColor;
        border-bottom: 0;
      }
      &:hover {
        .submenu {
          display: block;
        }
      }
    }
  }
</style>
