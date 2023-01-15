# Reflect APIs 📕

### importance
  Reflect is all about Reflection through Introspection.
  It is used to discover very low level information about your code.
  Reflect is a new Global Object(like Math) that provides a number of utility functions,
  many of which appear to overlap with ES5 methods defined on the global Object.
  All these functions are Introspection functions where you could query some internal details about the program at the 
  run time. Reflect is not a constructor.

## introspection     
  Code is able to inspect itself.

## all in one namespace
  JavaScript already had been supporting APIs for object reflection but,
  these APIs were not organized under a namespace.
  Since ES6 those are under Reflect.
  All properties and methods of Reflect are static like Math Object

## simplicity in use
  Introspection methods on Object throw exception when they fail to complete the operation.
  where as Reflect api returns true or false

## feeling of first-class operations
  `Reflect.has(obj, prop)` is the functional equivalent of `(prop in obj)`.

## reliability in function apply
  `func.apply(obj, arr)` This is less reliable because,
  func could be an object that would have defined its own apply.
  hence in es6 we have `Reflect.apply(func, obj, arr);`

## proxy trap forwarding
  There is a Reflect API exist for each of the Proxy Traps.

## Example

```js
  const duck = {
      name: "Maurice",
      color: "white",
      greeting() {
          console.log(`Quaaaack! My name is ${this.name}`);
      },
  };
  
  Reflect.has(duck, "color");
  // true
  Reflect.has(duck, "haircut");
  // false
```

