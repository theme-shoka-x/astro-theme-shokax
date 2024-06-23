<script setup lang="ts">
import { __ } from '@utils/i18n'

defineProps<{
  home: boolean
  post: {
    categories?: string[]
  }
}>()
</script>

<template>
  <div
    class="breadcrumb"
    :itemscope="home"
    :itemprop="home ? 'itemListElement' : undefined"
    :itemtype="home ? 'https://schema.org/BreadcrumbList' : undefined"
  >
    <template v-if="home">
      <i class="ic i-home" />
      <span>
        <a href="">{{ __('menu.home') }}</a>
      </span>
    </template>
    <template v-if="post.categories?.length">
      <i v-if="home" class="ic i-home" />
      <template v-for="(cat, index) in post.categories" :key="index">
        <span
          v-if="home"
          :class="{ current: index === post.categories.length - 1 }"
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <a href="" itemprop="item" rel="index" :title="__('post.in') + cat">
            <span itemprop="name">
              {{ cat }}
              <meta itemprop="position" :content="`${index}`">
            </span>
          </a>
        </span>
        <a v-else href="" :title="__('post.in') + cat">{{ cat }}</a>
        <i
          v-if="post.categories.length > 1 && index !== post.categories.length - 1"
          class="ic i-angle-right"
        />
      </template>
    </template>
  </div>
</template>

<style lang="stylus" scoped>
  @import '../styles/_mixins';
  .breadcrumb {
    display: inline-flex;
    font-size: $font-size-smaller;
    align-items: center;
    margin: 1.25rem 0;
    flex-wrap: wrap;

    .ic {
      margin: 0 .125rem;
      color: var(--grey-4);

      &:nth-child(1) {
        margin-left: 0;
        margin-right: .3125rem;
      }
    }

    span {
      white-space: pre;
    }

    span.current {
      background-color: var(--color-red-a1);
      border-radius: .625rem;
      padding: 0 .625rem;
      the-transition();

      span {
        white-space: normal;
      }
      a {
        color: var(--primary-color);
      }

      &:hover {
        background-color: var(--color-red-a3);
      }
    }
  }
</style>
