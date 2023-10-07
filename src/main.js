import { AnimationTimeline } from './animation_timeline.js'

class Main{
  constructor(){
    new AnimationTimeline()
  }
}

switch(document.readyState){
  case '':
  case '':
    new Main()
    break
  default:
    window.addEventListener('DOMContentLoaded' , (()=>new Main()))
}