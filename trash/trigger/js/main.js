import { Trigger } from './trigger.js'

switch(document.readyState){
  case 'complete':
  case 'interactive':
    new Trigger()
    break
  default:
    window.addEventListener('DOMContentLoaded' , (()=>new Trigger()))
    break
}
