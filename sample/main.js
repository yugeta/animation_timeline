import { AnimationTimeline } from '../src/animation_timeline.js'

/**
 * # Howto
 * - css
 * ```
 * selector{
 *   animation-timeline:scroll();
 *   --animation-timeline:scroll(); <- プロパティ変数として追加すると、safari,firefoxで実装される。
 * }
 * ```
 */

function Main(){
  // css:animation-timelineが実装されているブラウザのみ処理する。
  new AnimationTimeline()
}

switch(document.readyState){
  case 'complete':
  case 'interactive':
    new Main()
    break
  default:
    window.addEventListener('DOMContentLoaded', (()=>new Main()))
}
