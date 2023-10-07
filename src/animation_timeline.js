import { Css }    from './css.js'
import { Scroll } from './scroll.js'
import { View }   from './view.js'

export class AnimationTimeline{

  animation_timeline = '--animation-timeline'

  constructor(){
    if(this.exist_animation_timing){return}
    const cssRules = Css.get_rule_properties(this.animation_timeline)
    if(!cssRules.length){return}
    this.init(cssRules)
  }

  get exist_animation_timing(){
    return typeof document.body.style.animationTimeline === 'undefined' ? false : true
  }

  get param(){
    return document.querySelector(`.param`)
  }

  init(cssRules){
    for(const cssRule of cssRules){
      Css.set_css(cssRule.selectorText , 'animation-play-state'      , 'paused')
      Css.set_css(cssRule.selectorText , 'animation-duration'        , '100s')
      Css.set_css(cssRule.selectorText , 'animation-timing-function' , 'linear')
      
      const animation_name     = Css.get_css(cssRule.selectorText, 'animation-name')
      const animation_timeline = cssRule.style.getPropertyValue(this.animation_timeline)
      const animation_range    = this.get_animation_range(cssRule)
      const data = {
        selector           : cssRule.selectorText,
        animation_timeline : animation_timeline,
        animation_name     : animation_name,
        animation_range    : animation_range,
        keyframes          : Css.get_keyframes(animation_name),
      }

      switch(animation_timeline){
        case 'scroll()':
          new Scroll(data)
          break
        case 'view()':
          new View(data)
          break
      }
    }
  }

  get_animation_range(cssRule){return null
    const range = cssRule.style.getPropertyValue('--animation-range')
    if(range){
      const ranges = range.split(' ')
      if(ranges.length === 1){
        return {
          start : ranges[0],
          end   : null,
        }
      }
      else if(ranges.length === 1){

      }
      const start = null
      switch(ranges[0]){
        case 'cover':

        case 'contain':

        case 'normal':

        case 'entry':

      }
    }
    else{
      const start = range ? (range=>{
        return range.match
      })(range) : cssRule.style.getPropertyValue('--animation-range-start')
      const end   = range ? (range=>{

      })(range) : cssRule.style.getPropertyValue('--animation-range-end')
    }
    return { start : start, end : end }
  }
}
