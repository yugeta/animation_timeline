import { Css }    from './css.js'

export class Scroll{
  constructor(data){
    window.addEventListener('scroll', this.scroll.bind(this , data))
    this.scroll(data)
  }

  get scrollTop(){
    return document.scrollingElement.scrollTop
  }

  get scroll_height(){
    return document.body.scrollHeight
  }
  get window_height(){
    return window.innerHeight
  }

  get scroll_rate(){
    let rate = this.scrollTop / (this.scroll_height - this.window_height) * 100
    rate = rate > 0 ? rate : 0
    rate = rate < 100 ? rate : 100
    return rate
  }

  scroll(data){
    Css.set_css(data.selector, 'animation-delay', `-${(this.scroll_rate)}s`)
  }

}