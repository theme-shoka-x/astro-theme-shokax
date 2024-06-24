import fs from 'node:fs'
import yaml from 'js-yaml'

interface CoverConfig {
  fixedCover: string
  covers: string[]
}

const config = yaml.load(fs.readFileSync('src/covers.yml', 'utf8')) as Partial<CoverConfig>

export const cover = config

const randomServer = Number.parseInt(String(Math.random() * 4), 10) + 1

export const randomCover = function (usingRelative: boolean, count = 1, image_server?: string, image_list: string[] = []) {
  let i
  if (image_server) {
    if (count && count > 1) {
      const arr: string[] = Array.from({ length: count })
      for (i = 0; i < arr.length; i++) {
        arr[i] = `${image_server}?${Math.floor(Math.random() * 999999)}`
      }

      return arr
    }

    return [`${image_server}?${Math.floor(Math.random() * 999999)}`]
  }

  const parseImage = function (img: string, size: string) {
    if (img.startsWith('//') || img.startsWith('http')) {
      return img
    }
    else if (usingRelative) { // support relative url
      return img
    }
    else {
      console.warn('sinaimg blocked all request from outside website,so don\'t use this format')
      return `https://tva${randomServer}.sinaimg.cn/${size}/${img}`
    }
  }

  if (count && count > 1) {
    let shuffled = image_list.slice(0)
    while (shuffled.length <= 6) {
      shuffled = shuffled.concat(image_list.slice(0))
    }
    i = shuffled.length
    const min = i - count
    let temp
    let index
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random())
      temp = shuffled[index]
      shuffled[index] = shuffled[i]
      shuffled[i] = temp
    }

    return shuffled.slice(min).map((img) => {
      return parseImage(img, 'large')
    })
  }

  return [parseImage(image_list[Math.floor(Math.random() * image_list.length)], 'mw690')]
}
