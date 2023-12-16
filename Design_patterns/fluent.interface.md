# Fluent Interface 📕

### importance

Makes your code much easier to read and to write. 

## without Fluent api

```js
 // with variables                        

  const summed = calc.add(1, 2); 
  const squared = calc.square(summed);
  calc.display(squared);
      
 // without variables 

  calc.display(calc.square(calc.add(1, 2)));
```

## with Fluent api

```js           
  calc
      .add(1, 2)
      .square()
      .display();
```

## Real world example

```js
  var $ = new jQuery();
      $("input")
      .prop("disabled", false);
      .val("someValue");
  // jQuery has its fluent API to thank for its simplicity
```

## core principles
  Any fluent methods must return the parent object.
  Fluent apis mutate the object itself.

                    






                        



                       