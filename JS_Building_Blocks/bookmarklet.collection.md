# Bookmarklets collection 📕

## toggle dark mode

```js 
 javascript: (d=>{var css = `:root{background-color: #fefefe;%20%20%20%20%20%20%20%20%20%20%20filter:%20invert(100%)%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20%20*%20{%20%20%20%20%20%20%20%20%20%20%20background-color:%20inherit%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20%20img:not([src*=%22.svg%22]),%20video{%20%20%20%20%20%20%20%20%20%20%20filter:%20invert(100%)%20%20%20%20%20%20%20%20%20}%20%20%20%60,%20%20%20style,%20%20%20id=%22dark-theme-snippet%22,%20%20%20ee%20=%20d.getElementById(id);%20%20%20if%20(null%20!=%20ee)%20ee.parentNode.removeChild(ee);%20%20%20else%20{%20%20%20%20%20style%20=%20d.createElement('style');%20%20%20%20%20style.type%20=%20%22text/css%22;%20%20%20%20%20style.id%20=%20id;%20%20%20%20%20if%20(style.styleSheet)%20style.styleSheet.cssText%20=%20css;%20%20%20%20%20else%20style.appendChild(d.createTextNode(css));%20%20%20%20%20(d.head||d.querySelector('head')).appendChild(style);%20%20%20}%20})(document)
```

## removeAds

```js    
    javascript:!function(e){var t={elem(t){(function(t){for(let l of e.ignore?.selector??[])if(t.matches(l))return!0;for(let l of e.ignore?.func??[])if(l(t))return!0;return!1})(t)||t.remove()},list(e){Array.from(e).forEach((e=>t.elem(e)))},cls(e){t.list(document.getElementsByClassName(e))},selector(e){t.list(document.querySelectorAll(e))},func({func:e,selector:l=null}){let o=null==l?document.getElementsByClassName("*"):document.querySelectorAll(l);for(let l of o)e(l)&&t.elem(l)}};for(let l in e){let o=e[l];for(let e=0;e<o.length;e++){let r=o[e];t[l](r)}}}({cls:["adsbygoogle","mod_ad_container","brn-ads-box","gpt-ad","ad-box","top-ads-container","adthrive-ad"],selector:['[aria-label="advertisement"]','[class*="-ad "], [class*="-ad-"], [class$="-ad"], [class^="ad-"]'],func:[{selector:'[class*="ad"]',func(e){for(const t of e.classList)if(t.startsWith("ad")||/[-_\s]ad(?:vertisement)?$/.test(t))return!0}}],ignore:{selector:["body",".ad-layout"],func:[e=>{let t=document.getElementsByTagName("article");for(let l of t)if(e.contains(l))return!0}]}});  
```