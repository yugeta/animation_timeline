
export class Trigger{

  attribute_name   = 'data-trigger'
  attribute_repeat = 'data-repeat'
  class_flg        = 'data-trigger-flg'

  constructor(){
    window.addEventListener('scroll' , this.event_scroll.bind(this))
    this.event_scroll()
  }

  get num_window_scroll(){
    return window.document.scrollingElement.scrollTop
  }
  get num_window_height(){
    return window.innerHeight
  }

  num_elm_scroll(elm){
    const rect = elm.getBoundingClientRect()
    return rect.top
  }

  get elm_triggers(){
    return document.querySelectorAll(`[${this.attribute_name}]`)
  }

  event_scroll(e){
    for(const elm of this.elm_triggers){
      switch(elm.getAttribute(this.attribute_name)){
        case 'upper-in': // 通常スクロールで画面にインした場合
          this.scroll_upper_in(elm)
          break
        case 'lower-in': // 逆スクロール（したから上）の際に画面にインした場合
          this.scroll_lower_in(elm)
          break
        case 'in': // 表示画面内に入った場合
          this.scroll_in(elm)
          break
        case 'out': // 表示画面から外れ場合
          this.scroll_out(elm)
          break
        case 'rate': // スクロール値（表示画面の領域内）
          this.scroll_rate(elm)
          break
      }
    }
  }

  scroll_in(elm){
    const rect = elm.getBoundingClientRect()

    // 画面上部（下部）からハズレた場合にトリガーフラグを外す
    if(rect.top + elm.offsetHeight < 0
    || rect.top > this.num_window_height){
      if(elm.hasAttribute(this.class_flg)
      && elm.getAttribute(this.attribute_repeat) === 'infinite'){
        elm.removeAttribute(this.class_flg)
      }
      return
    }
    
    // 画面内に入っている場合にトリガーフラグをセット
    if(!elm.hasAttribute(this.class_flg)){
      elm.setAttribute(this.class_flg , true)
    }
  }
  scroll_upper_in(elm){

  }
  scroll_lower_in(elm){

  }
  scroll_out(elm){

  }
  scroll_rate(elm){

  }
}