Trigger
===
```
Create : 2023.09.29
Author : yugeta.Koji
```

# Summary
- スクロールトリガーを基準にcssのクラスを入れ替える処理をするライブラリ

# Howto
- スクロール値でclassを切り替えるエレメントに属性をセットする
```
<div class='box orange' data-trigger='in' data-repeat='infinite'></div>
```
- data-trigger
  - in  : 画面内（表示エリア）に入った場合に、data-trigger-flg='true'がセットされる。
  - out : 画面外（表示エリア）からハズレた場合に、data-trigger-flgが削除される。

# Sample
- sample.css
```
/* Fade-in */
[data-trigger='in'][data-trigger-type='visible']{
  opacity:0;
  transition-property:opacity;
  transition-duration:1.0s;
  transition-delay:0.3s;
}
[data-trigger='in'][data-trigger-type='visible'][data-trigger-flg='true']{
  opacity:1.0;
}

/* Slide-in */
[data-trigger='in'][data-trigger-type='slide']{
  transform:translateX(-100%);
  transition-property:transform;
  transition-duration:1.0s;
}
[data-trigger='in'][data-trigger-type='slide'][data-trigger-flg='true']{
  transform:translateX(0);
}
```
