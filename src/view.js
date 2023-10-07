import { Css }    from './css.js'

export class View{
  constructor(data){
    window.addEventListener('scroll', this.view.bind(this , data))
    this.view(data)
  }

  get scrollTop(){
    return document.scrollingElement.scrollTop
  }

  get window_height(){
    return window.innerHeight
  }

  view(data){
    const elm = this.get_selector2element(data.selector)
    if(!elm){return null}
    const view_rate = this.get_view_rate(elm)
    if(view_rate === null || view_rate === undefined){return}
    Css.set_css(data.selector, 'animation-delay', `-${(view_rate)}s`)
  }

  get_selector2element(selector){
    selector = selector.replace(/(.+?):{1,2}(before|after)/ , `$1` , 'g')
    return document.querySelector(selector)
  }

  get_view_rate(elm){
    if(!this.is_view_in(elm)){return}
    const rect   = elm.getBoundingClientRect()
    const rate = (this.window_height - rect.top) / (this.window_height + rect.height) * 100
    return rate
  }

  // 画面内(縦横対応)に入ったらtrueを返す
  is_view_in(elm){
    const rect   = elm.getBoundingClientRect()
    const top    = rect.top + rect.height
    const bottom = rect.top - this.scrollTop
    if(top < 0 || bottom > 0){return}
    return true
  }

}