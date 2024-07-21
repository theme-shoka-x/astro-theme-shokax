<script setup lang="ts">
import { __ } from '@utils/i18n'

const props = defineProps<{
  name: string
  path: string
  parent?: boolean
  subList?: [string, string][]
}>()

const trim = (str?: string) => str != null ? str.trim() : ''

const path = props.path.split('||')
let itemURL = path[0].trim()
if (!itemURL.startsWith('http'))
  itemURL = itemURL.replace('//', '/')

const menuText = __(`menu.${props.name}`).replace('menu.', '')
const iconClass = `i-${trim(path[1])}`

let subListEntries: {
  subName: string
  subValue: string
  subPath: string[]
  subItemURL: string
  subMenuText: string
}[] = []
if (props.subList) {
  subListEntries = Object.entries(props.subList).map(([_, subValue]) => {
    const subPath = subValue[1].split('||')
    let subItemURL = subPath[0].trim()
    if (subItemURL === '/')
      subItemURL = 'javascript:void(0)'

    const subMenuText = __(`menu.${subValue[0] === 'default' ? props.name : subValue[0]}`).replace('menu.', '')
    return {
      subName: subValue[0],
      subValue: subValue[1],
      subPath,
      subItemURL,
      subMenuText,
    }
  })
}
</script>

<template>
  <li v-if="parent" class="item dropdown">
    <a v-if="itemURL === '/'" href="#" @click="() => false">
      <i class="ic" :class="iconClass" />
      {{ menuText }}
    </a>
    <a v-else :href="itemURL" rel="section">
      <i class="ic" :class="iconClass" />
      {{ menuText }}
    </a>
    <ul class="submenu">
      <template v-for="(item, index) in subListEntries" :key="index">
        <li v-if="item.subName !== 'default'" class="item">
          <a :href="item.subItemURL" rel="section">
            <i class="ic" :class="`i-${trim(item.subPath[1])}`" />
            {{ item.subMenuText }}
          </a>
        </li>
      </template>
    </ul>
  </li>
  <li v-else class="item">
    <a :href="itemURL" rel="section">
      <i class="ic" :class="iconClass" />
      {{ menuText }}
    </a>
  </li>
</template>
