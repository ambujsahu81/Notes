
# Interface vs Type in Typescript  📕

### Why do we need two different ways to implement the same thing?  (importance)
- The key distinction is that a type cannot be re-opened to add new properties vs an interface which is     
  always extendable. But this problem can be solved using intersection with type.

```ts
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

// extending type using intersection

type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}
```
- A type cannot be changed after being created.

```ts

type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI 
}  // Error: Duplicate identifier 'Window'.


interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

- Interfaces may only be used to declare the shapes of objects, not rename primitives.

```ts
// Using type we can create custom names
// for existing primitives:

type SanitizedString = string
type EvenNumber = number

// This isn't feasible with interfaces
interface X extends string {

}
```
- Interface names will always appear in their original form in error messages, but only when they are used by name.

- Type aliases may not participate in declaration merging, but interfaces can.

- Tuples can only be typed via the type keyword

```ts
type row = [colOne: number, colTwo: string];
```

- With interfaces, the subtypes have to exactly match the types declared in the super type, otherwise TS will throw an error like the one above.

```ts
interface NumLogger { 
    log: (val: number) => void;
}
type StrAndNumLogger = NumLogger & { 
  log: (val: string) => void;
}

const logger: StrAndNumLogger = {
  log: (val: string | number) => console.log(val)
}

logger.log(1)
logger.log('hi')

// Typescript is totally happy. What about if I tried to extend that with interface

interface StrAndNumLogger extends NumLogger { 
    log: (val: string) => void; 
};
// gives error Interface 'StrAndNumLogger' incorrectly extends interface 'NumLogger'

```

### when to use type ?

- Use the type to capture the type of an object when the type is unknown.
```ts
const orange = { color: "Orange", vitamin: "C"}
type Fruit = typeof orange
let apple: Fruit
```

- Use the type for creating the aliases for long or complicated types
```ts
type Primitive = number | string | boolean | null | undefined
```

### when to use `interface?`

- Use interface when you want to take advantage of declaration merging.
- Use interface for all object types where using type is not required
- Use type When trying to overload functions in object types
- Use types, to declare NonNullable type thanks to a conditional mechanism.

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```


### Note
- Note that an interface and type alias are not mutually exclusive. An interface can extend a type alias, 
  and vice versa. however that a class and interface are considered static blueprints. Therefore, they can 
  not implement / extend a type alias that names a union type.

```ts
// FIXME: can not implement a union type
class SomePartialPoint implements PartialPoint {
  x = 1;
  y = 2;
}
```



