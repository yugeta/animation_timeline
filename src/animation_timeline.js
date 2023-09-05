import { Css } from './css.js'

export class AnimationTimeline{
  constructor(){
    if(this.if_animation_timing_use){return}
    this.animation_timelines = this.search_timeline()
    if(!this.animation_timelines.length){return}
    this.init()
  }

  get if_animation_timing_use(){
    return typeof document.body.style.animationTimeline === 'undefined' ? false : true
  }

  get param(){
    return document.querySelector(`.param`)
  }
  get window_height(){
    return window.innerHeight
  }
  get scroll_height(){
    return document.body.scrollHeight
  }
  get scroll_rate(){
    let rate = this.scrollTop / (this.scroll_height - this.window_height) * 100
    rate = rate > 0 ? rate : 0
    rate = rate < 100 ? rate : 100
    return rate
  }
  get scrollTop(){
    return document.scrollingElement.scrollTop
  }

  init(){
    for(const data of this.animation_timelines){
      data.animation_name = Css.get_css(data.selector,'animation-name')
      data.keyframes      = this.get_keyframes(data.animation_name)
      Css.set_css(data.selector , 'animation-play-state', 'paused')
      Css.set_css(data.selector , 'animation-duration', '100s')
      Css.set_css(data.selector , 'animation-timing-function', 'linear')
      switch(data.value){
        case 'scroll()':
          this.set_scroll(data)
          this.scroll(data)
          break
      }
    }
  }

  get_keyframes(animation_name){
    const keyframes = Css.get_keyframes(animation_name)
    const arr = []
    for(const keyframe of keyframes.cssRules){
      keyframe.rate = Number(keyframe.keyText.replace('%',''))
      arr.push(keyframe)
    }
    return arr
  }

  set_scroll(data){
    window.addEventListener('scroll', this.scroll.bind(this , data))
  }

  scroll(data){
    Css.set_css(data.selector, 'animation-delay', `-${(this.scroll_rate)}s`)
  }

  search_timeline(){
    return Css.search_properties('--animation-timeline')
  }

}
