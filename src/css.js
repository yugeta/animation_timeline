/**
 * # Howto
 * import { Css } from './css.js'
 * 
 * # options
 * // cssの値をセットする場合
 * @method Css.set_css( selector , property , value )
 * @return null
 *
 * // cssの値を取得する場合
 * @method Css.get_css( selector , property )
 * @return css-value
 * 
 * // すべてのcss設定から、propertyを検索して取得する
 * @method Css.search_properties( property )
 * @return array
 * 
 */

export class Css{
  static set_css(selector , property , value){
    const rule = Css.get_last_rule(selector)
    if(rule){
      rule.style.setProperty(property , value , '')
    }
    else{
      Css.create_rule(selector , property , value)
    }
  }

  static get_last_rule(selector){
    const rules = Css.get_rules(selector)
    return rules && rules.length ? rules[rules.length-1] : null
  }

  static create_rule(selector , property , value){
    const stylesheet = Css.get_last_stylesheet() || Css.create_stylesheet()
    stylesheet.insertRule(`${selector}{${property}:${value}}` , 0)
  }

  static get_last_stylesheet(){
    const stylesheets = Css.get_stylesheets()
    return stylesheets && stylesheets.length ? stylesheets[stylesheets.length-1] : null
  }

  static create_stylesheet(){
    const style = document.createElement('style')
    document.querySelector('head').appendChild(style)
    return Css.get_last_stylesheet()
  }


  static get_ss(selector , property){
    const styleSheets = Array.from(document.styleSheets).filter((styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin))
    let value = null
    for(const ss of styleSheets){
      if(!ss.cssRules){continue}
      for(const cssRule of ss.cssRules){
        if(!cssRule.styleSheet || !cssRule.styleSheet.cssRules){continue}
        for(const rule of cssRule.styleSheet.cssRules){
          if(rule.selectorText !== selector){continue}
          value = rule.style[property]
        }
      }
    }
    return value;
  }

  static get_css(selector , property){
    const rules = Css.get_rules(selector)
    let value = null
    for(const rule of rules){
      value = rule.style.getPropertyValue(property) || value
    }
    return value
  }

  static get_stylesheets(){
    return Array.from(document.styleSheets).filter((styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin))
  }

  static get_rules(selector){
    const styleSheets = Css.get_stylesheets()
    let arr = []
    for(const ss of styleSheets){
      if(!ss.cssRules){continue}
      const res =  this.get_rule(ss.cssRules , selector)
      if(!res || !res.length){continue}
      arr = arr.concat(res)
    }
    return arr;
  }

  static get_rule(rules , selector){
    if(!rules){return}
    let arr = []
    for(const rule of rules){
      if(rule.selectorText === selector){
        arr.push(rule)
      }
      if(rule.styleSheet && rule.styleSheet.cssRules){
        const res = Css.get_rule(rule.styleSheet.cssRules , selector)
        if(!res || !res.length){continue}
        arr = arr.concat(res)
      }
    }
    return arr;
  }

  static search_properties(property){
    const styleSheets = Css.get_stylesheets()
    const arr = []
    for(const ss of styleSheets){
      // tags,files
      if(!ss.cssRules){continue}
      // selectors
      for(const cssRule of ss.cssRules){
        if(!cssRule.selectorText){continue}
        // styles
        for(const style of cssRule.style){
          if(style === property){
            arr.push({
              selector : cssRule.selectorText,
              value    : cssRule.style.getPropertyValue(property),
            })
          }
        }
      }
    }
    return arr;
  }

  static get_keyframes(animation_name){
    const styleSheets = Css.get_stylesheets()
    const arr = []
    for(const ss of styleSheets){
      // tags,files
      if(!ss.cssRules){continue}
      // selectors
      for(const cssRule of ss.cssRules){
        if(cssRule.name !== animation_name){continue}
        return cssRule
      }
    }
  }
}