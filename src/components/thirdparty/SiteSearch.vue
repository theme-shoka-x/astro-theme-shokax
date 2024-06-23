<script setup lang="ts">
import { configure, hits, pagination, searchBox, stats } from 'instantsearch.js/es/widgets'
import type { HitHighlightResult } from 'instantsearch.js/es/types/results'
import { transition } from '../../library/anime'

const props = defineProps<{
  appID: string
  apiKey: string
  indexName: string
  placeholder: string
  stats: string
  url: string
  empty: string
}>()
const instantsearch = (await import('instantsearch.js')).default
const algoliasearch = (await import('algoliasearch/lite')).default

const search = instantsearch({
  indexName: props.indexName,
  searchClient: algoliasearch(props.appID, props.apiKey),
  // TODO 移除弃用函数
  searchFunction(helper) {
    const searchInput = document.querySelector('.search-input') as HTMLInputElement
    if (searchInput.value)
      helper.search()
  },
})

// Registering Widgets
search.addWidgets([
  configure({
    hitsPerPage: 10,
  }),

  searchBox({
    container: '.search-input-container',
    placeholder: props.placeholder,
    // Hide default icons of algolia search
    showReset: false,
    showSubmit: false,
    showLoadingIndicator: false,
    cssClasses: {
      input: 'search-input',
    },
  }),

  stats({
    container: '#search-stats',
    templates: {
      text(data) {
        const stats = props.stats
          .replace(/\$\{hits\}/, data.nbHits.toString())
          .replace(/\$\{time\}/, data.processingTimeMS.toString())
        return `${stats}<span class="algolia-powered"></span><hr>`
      },
    },
  }),

  hits({
    container: '#search-hits',
    templates: {
      item(data) {
        const cats = data.categories ? `<span>${data.categories.join('<i class="ic i-angle-right"></i>')}</span>` : ''
        return `<a href="${props.url}${data.path}">${cats}${(data._highlightResult?.title as HitHighlightResult).value}</a>`
      },
      empty(data) {
        return `<div id="hits-empty">${
            props.empty.replace(/\$\{query\}/, data.query)
            }</div>`
      },
    },
    cssClasses: {
      item: 'item',
    },
  }),

  pagination({
    container: '#search-pagination',
    scrollTo: false,
    showFirst: false,
    showLast: false,
    templates: {
      first: '<i class="ic i-angle-double-left"></i>',
      last: '<i class="ic i-angle-double-right"></i>',
      previous: '<i class="ic i-angle-left"></i>',
      next: '<i class="ic i-angle-right"></i>',
    },
    cssClasses: {
      root: 'pagination',
      item: 'pagination-item',
      link: 'page-number',
      selectedItem: 'current',
      disabledItem: 'disabled-item',
    },
  }),
])

search.start()
const siteSearch = document.querySelector('#search > div') as HTMLElement

// Monitor main search box
function onPopupClose() {
  document.body.style.overflow = ''
  transition(siteSearch, 0) // "transition.shrinkOut"
}

function exitSearch(event: MouseEvent) {
  if (event.target === siteSearch)
    onPopupClose()
}
document.addEventListener('astro:after-swap', onPopupClose)
window.addEventListener('keyup', (event) => {
  if (event.key === 'Escape')
    onPopupClose()
})
</script>

<template>
  <div id="search">
    <div class="inner" @click="exitSearch">
      <div class="header">
        <span class="icon">
          <i class="ic i-search" />
        </span>
        <div class="search-input-container" />
        <span class="close-btn" @click="onPopupClose">
          <i class="ic i-times-circle" />
        </span>
      </div>
      <div class="results">
        <div class="inner">
          <div id="search-stats" />
          <div id="search-hits" />
          <div id="search-pagination" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>

</style>
