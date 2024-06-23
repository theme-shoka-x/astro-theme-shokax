import type { AnimeOptions } from 'theme-shokax-anime/dist/types'
import anime from 'theme-shokax-anime'

export function transition(target: HTMLElement, type: number | string | Function, complete?: Function, begin?: Function): void {
  let animation: Partial<AnimeOptions>
  let display = 'none'
  switch (type) {
    case 0:
      animation = { opacity: [1, 0] }
      break
    case 1:
      animation = { opacity: [0, 1] }
      display = 'block'
      break
    case 'bounceUpIn':
      animation = {
        begin(_anim) {
          target.style.display = 'block'
        },
        translateY: [
          { value: -60, duration: 200 },
          { value: 10, duration: 200 },
          { value: -5, duration: 200 },
          { value: 0, duration: 200 },
        ],
        opacity: [0, 1],
      }
      display = 'block'
      break
    case 'shrinkIn':
      animation = {
        begin(_anim) {
          target.style.display = 'block'
        },
        scale: [
          { value: 1.1, duration: 300 },
          { value: 1, duration: 200 },
        ],
        opacity: 1,
      }
      display = 'block'
      break
    case 'slideRightIn':
      animation = {
        begin(_anim) {
          target.style.display = 'block'
        },
        translateX: ['100%', '0%'],
        opacity: [0, 1],
      }
      display = 'block'
      break
    case 'slideRightOut':
      animation = {
        translateX: ['0%', '100%'],
        opacity: [1, 0],
      }
      break
    default:
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      animation = type
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      display = type.display
      break
  }
  anime(Object.assign({
    targets: target,
    duration: 200,
    easing: 'linear',
    begin() {
      begin && begin()
    },
    complete() {
      target.style.display = display
      complete && complete()
    },
  }, animation)).play()
}
