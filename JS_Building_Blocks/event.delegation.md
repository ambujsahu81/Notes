
# Event delegation  📕

### importance
  Event bubbling enables event delegation. We want to run some code when the user interacts with any child 
  elements,for this we can set the event listener on their parent and have events that happen on any
  child elements bubble up to their parent and than use event.target to access the child elements.
  It will improve performance.
  Allows you to write cleaner code, and create fewer event listeners with similar logic.

## `event.target` api     
  It is used to access the element that was the target of the event (that is, the innermost element).  

## `event.currentTarget` api
  It is used to access the element that handled the event.

## `event.stopPropagation()`
  `stopPropagation()` is called inside an event handler, prevents the event from bubbling up to any other 
  elements.

## Nodejs example

```js
    import jsdom from "jsdom";
    const { JSDOM } = jsdom;

    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

    (global).document = dom.window.document;
    (global).window = dom.window;

    function responding(evt) {    
        // if (evt.target.nodeName === 'li')
            console.log('Responding',evt.target.textContent)
    }

    const customUI = document.createElement('ul');

    for (var i = 1; i <= 10; i++) {
        const newElement = document.createElement('li');
        newElement.textContent = "This is line " + i;
        customUI.appendChild(newElement);
    }

    customUI.addEventListener('click',responding);
    document.body.appendChild(customUI);
    dom.window.document.querySelectorAll("li")[0].click()
```
