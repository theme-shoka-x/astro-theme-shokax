<script setup lang="ts">
import { __ } from '@utils/i18n'
import BreadCrumb from '@components/BreadCrumb.vue'

const props = defineProps<{
  post: {
    title?: string
    link?: string
    path?: string
    categories?: string[]
  }
}>()
const postText = props.post.title || props.post.path || __('post.untitled')
const postLink = props.post.link || props.post.path
</script>

<template>
  <li class="item">
    <BreadCrumb :post="post" :home="false" />
    <span>
      <a :href="postLink">
        {{ postText }}
        <i v-if="post.link" class="ic i-link-alt" />
      </a>
    </span>
  </li>
</template>

<style lang="stylus" scoped>
  .item {
    padding: .5rem 0 .5rem 2rem;
    border-bottom: .0625rem dashed var(--grey-4);
    position: relative;

    &::before {
      counter-increment: counter;
      content: counter(counter);
      position: absolute;
      left: 0;
      font-size: 1.5em;
      color: var(--grey-4);
      line-height: 1.2;
      text-align: right;
      width: 1em;
    }

    span, .breadcrumb {
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      max-height: 2rem;
      white-space: nowrap;
    }

    .breadcrumb {
      margin: 0;
      display: flex;
      max-height: 1.2rem;
    }
  }
</style>
