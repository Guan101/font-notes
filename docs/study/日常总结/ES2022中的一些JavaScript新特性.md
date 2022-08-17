与许多其他编程语言一样，JavaScript 也在不断发展，每年，该语言都会通过新功能变得更强大，让开发人员编写更具表现力和简洁的代码。
让我们探索 ECMAScript 2022 (ES13) 中添加的最新功能，并查看它们的使用示例以便我们更好地理解它们。
### 1、类字段声明
在 ES13 之前，类字段只能在构造函数中声明，与许多其他语言不同，我们不能在类的最外层范围内声明或定义它们。
```js
class Car {
  constructor() {
    this.color = 'blue';
    this.age = 2;
  }
}
const car = new Car();
console.log(car.color); // blue
console.log(car.age); // 2
```
ES13 消除了这个限制，现在我们可以编写如下代码：
```js
class Car {
  color = 'blue';
  age = 2;
}
const car = new Car();
console.log(car.color); // blue
console.log(car.age); // 2
```

### 2、私有方法和字段

以前，不能在类中声明私有成员，成员通常以下划线 (_) 为前缀，表示它是私有的，但仍然可以从类外部访问和修改。
```js
class Person {
  _firstName = 'Joseph';
  _lastName = 'Stevens';
  get name() {
    return `${this._firstName} ${this._lastName}`;
  }
}
const person = new Person();
console.log(person.name); // Joseph Stevens
// Members intended to be private can still be accessed
// from outside the class
console.log(person._firstName); // Joseph
console.log(person._lastName); // Stevens
// They can also be modified
person._firstName = 'Robert';
person._lastName = 'Becker';
console.log(person.name); // Robert Becker
```
使用 ES13，我们现在可以将私有字段和成员添加到类中，方法是在其前面加上井号 (#)，试图从类外部访问它们会导致错误：
```js
class Person {
  #firstName = 'Joseph';
  #lastName = 'Stevens';
  get name() {
    return `${this.#firstName} ${this.#lastName}`;
  }
}
const person = new Person();
console.log(person.name);
// SyntaxError: Private field '#firstName' must be
// declared in an enclosing class
console.log(person.#firstName);
console.log(person.#lastName);
```
请注意，这里抛出的错误是语法错误，发生在编译时，因此没有部分代码运行，编译器甚至不希望您尝试从类外部访问私有字段，因此，它假定您正在尝试声明一个。

### 3、await运算符

在 JavaScript 中，await 运算符用于暂停执行，直到 Promise 被解决（履行或拒绝）。

以前，我们只能在 async 函数中使用此运算符 - 使用 async 关键字声明的函数。我们无法在全局范围内这样做。
```js
function setTimeoutAsync(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
// SyntaxError: await is only valid in async functions
await setTimeoutAsync(3000);
```
使用 ES13，现在我们可以：
```js
function setTimeoutAsync(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
// Waits for timeout - no error thrown
await setTimeoutAsync(3000);
```
### 4、静态类字段和静态私有方法

我们现在可以在 ES13 中为类声明静态字段和静态私有方法，静态方法可以使用 this 关键字访问类中的其他私有/公共静态成员，实例方法可以使用 this.constructor 访问它们。
```js
class Person {
  static #count = 0;
  static getCount() {
    return this.#count;
  }
  constructor() {
    this.constructor.#incrementCount();
  }
  static #incrementCount() {
    this.#count++;
  }
}
const person1 = new Person();
const person2 = new Person();
console.log(Person.getCount()); // 2
```
### 5、类静态块

ES13 允许在创建类时定义只执行一次的静态块，这类似于其他支持面向对象编程的语言（如 C# 和 Java）中的静态构造函数。

一个类的类主体中可以有任意数量的静态 {} 初始化块，它们将与任何交错的静态字段初始值设定项一起按照声明的顺序执行，我们可以在静态块中使用超属性来访问超类的属性。
```js
class Vehicle {
  static defaultColor = 'blue';
}
class Car extends Vehicle {
  static colors = [];
  static {
    this.colors.push(super.defaultColor, 'red');
  }
  static {
    this.colors.push('green');
  }
}
console.log(Car.colors); // [ 'blue', 'red', 'green' ]
```
### 6、私人领域的人体工程学品牌检查

我们可以使用这个新特性来检查一个对象中是否有一个特定的私有字段，使用 in 运算符。
```js
class Car {
  #color;
  hasColor() {
    return #color in this;
  }
}
const car = new Car();
console.log(car.hasColor()); // true;
```
in 运算符可以正确区分不同类的同名私有字段：
```js
class Car {
  #color;
  hasColor() {
    return #color in this;
  }
}
class House {
  #color;
  hasColor() {
    return #color in this;
  }
}
const car = new Car();
const house = new House();
console.log(car.hasColor()); // true;
console.log(car.hasColor.call(house)); // false
console.log(house.hasColor()); // true
console.log(house.hasColor.call(car)); // false
```
### 7、at() 方法进行索引

我们通常在 JavaScript 中使用方括号 ([]) 来访问数组的第 N 个元素，这通常是一个简单的过程，我们只访问数组的 N - 1 属性。
```js
const arr = ['a', 'b', 'c', 'd'];
console.log(arr[1]); // b
```
但是，如果我们想使用方括号访问数组末尾的第 N 个项目，我们必须使用 arr.length - N 的索引。
```js
const arr = ['a', 'b', 'c', 'd'];
// 1st element from the end
console.log(arr[arr.length - 1]); // d
// 2nd element from the end
console.log(arr[arr.length - 2]); // c
```
新的 at() 方法让我们可以更简洁、更有表现力地做到这一点，要访问数组末尾的第 N 个元素，我们只需将负值 -N 传递给 at()。
```js

const arr = ['a', 'b', 'c', 'd'];
// 1st element from the end
console.log(arr.at(-1)); // d
// 2nd element from the end
console.log(arr.at(-2)); // c
```
除了数组，字符串和 TypedArray 对象现在也有 at() 方法。

```js
const str = 'Coding Beauty';
console.log(str.at(-1)); // y
console.log(str.at(-2)); // t
const typedArray = new Uint8Array([16, 32, 48, 64]);
console.log(typedArray.at(-1)); // 64
console.log(typedArray.at(-2)); // 48
```
### 8、 RegExp 匹配索引

这个新功能允许我们指定我们想要获取给定字符串中 RegExp 对象匹配的开始和结束索引。

以前，我们只能在字符串中获取正则表达式匹配的起始索引。
```js
const str = 'sun and moon';
const regex = /and/;
const matchObj = regex.exec(str);
// [ 'and', index: 4, input: 'sun and moon', groups: undefined ]
console.log(matchObj);
```
我们现在可以指定一个 d 正则表达式标志来获取匹配开始和结束的两个索引。
```js
const str = 'sun and moon';
const regex = /and/d;
const matchObj = regex.exec(str);
/**
[
  'and',
  index: 4,
  input: 'sun and moon',
  groups: undefined,
  indices: [ [ 4, 7 ], groups: undefined ]
]
 */
console.log(matchObj);
```
设置 d 标志后，返回的对象将具有包含开始和结束索引的 indices 属性。

### 9、Object.hasOwn() 方法

在 JavaScript 中，我们可以使用 Object.prototype.hasOwnProperty() 方法来检查对象是否具有给定的属性。
```js
class Car {
  color = 'green';
  age = 2;
}
const car = new Car();
console.log(car.hasOwnProperty('age')); // true
console.log(car.hasOwnProperty('name')); // false
```
但是，这种方法存在一定的问题，一方面，Object.prototype.hasOwnProperty() 方法不受保护 - 它可以通过为类定义自定义 hasOwnProperty() 方法来覆盖，该方法可能具有与 Object.prototype.hasOwnProperty() 完全不同的行为。
```js
class Car {
  color = 'green';
  age = 2;
  // This method does not tell us whether an object of
  // this class has a given property.
  hasOwnProperty() {
    return false;
  }
}
const car = new Car();
console.log(car.hasOwnProperty('age')); // false
console.log(car.hasOwnProperty('name')); // false
```
另一个问题是，对于使用 null 原型创建的对象（使用 Object.create(null)），尝试对其调用此方法会导致错误。
```js
const obj = Object.create(null);
obj.color = 'green';
obj.age = 2;
// TypeError: obj.hasOwnProperty is not a function
console.log(obj.hasOwnProperty('color'));
```
解决这些问题的一种方法是使用调用 Object.prototype.hasOwnProperty Function 属性上的 call() 方法，如下所示：
```js
const obj = Object.create(null);
obj.color = 'green';
obj.age = 2;
obj.hasOwnProperty = () => false;
console.log(Object.prototype.hasOwnProperty.call(obj, 'color')); // true
console.log(Object.prototype.hasOwnProperty.call(obj, 'name')); // false
```
这不是很方便，我们可以编写一个可重用的函数来避免重复自己：
```js
function objHasOwnProp(obj, propertyKey) {
  return Object.prototype.hasOwnProperty.call(obj, propertyKey);
}
const obj = Object.create(null);
obj.color = 'green';
obj.age = 2;
obj.hasOwnProperty = () => false;
console.log(objHasOwnProp(obj, 'color')); // true
console.log(objHasOwnProp(obj, 'name')); // false
```
不过没有必要，因为我们可以使用新的内置 Object.hasOwn() 方法。与我们的可重用函数一样，它接受对象和属性作为参数，如果指定的属性是对象的直接属性，则返回 true。否则，它返回 false。
```js
const obj = Object.create(null);
obj.color = 'green';
obj.age = 2;
obj.hasOwnProperty = () => false;
console.log(Object.hasOwn(obj, 'color')); // true
console.log(Object.hasOwn(obj, 'name')); // false
```
### 10、错误原因

错误对象现在有一个 cause 属性，用于指定导致即将抛出的错误的原始错误。这有助于为错误添加额外的上下文信息并帮助诊断意外行为，我们可以通过在作为第二个参数传递给 Error() 构造函数的对象上设置 cause 属性来指定错误的原因。
```js
function userAction() {
  try {
    apiCallThatCanThrow();
  } catch (err) {
    throw new Error('New error message', { cause: err });
  }
}
try {
  userAction();
} catch (err) {
  console.log(err);
  console.log(`Cause by: ${err.cause}`);
}
```
### 11、从最后一个数组查找

在 JavaScript 中，我们已经可以使用 Array find() 方法在数组中查找通过指定测试条件的元素，同样，我们可以使用 findIndex() 来查找此类元素的索引。

虽然 find() 和 findIndex() 都从数组的第一个元素开始搜索，但在某些情况下，最好从最后一个元素开始搜索。

在某些情况下，我们知道从最后一个元素中查找可能会获得更好的性能。例如，这里我们试图在数组中获取值 prop 等于 y 的项目。使用 find() 和 findIndex()：
```js
const letters = [
  { value: 'v' },
  { value: 'w' },
  { value: 'x' },
  { value: 'y' },
  { value: 'z' },
];
const found = letters.find((item) => item.value === 'y');
const foundIndex = letters.findIndex((item) => item.value === 'y');
console.log(found); // { value: 'y' }
console.log(foundIndex); // 3
```
这行得通，但是由于目标对象更靠近数组的尾部，如果我们使用 findLast() 和 findLastIndex() 方法从末尾搜索数组，我们可以让这个程序运行得更快。
```js
const letters = [
  { value: 'v' },
  { value: 'w' },
  { value: 'x' },
  { value: 'y' },
  { value: 'z' },
];
const found = letters.findLast((item) => item.value === 'y');
const foundIndex = letters.findLastIndex((item) => item.value === 'y');
console.log(found); // { value: 'y' }
console.log(foundIndex); // 3
```
另一个用例可能要求我们专门从末尾搜索数组以获取正确的项目。例如，如果我们想在数字列表中查找最后一个偶数， find() 和 findIndex() 会产生错误的结果：
```js
const nums = [7, 14, 3, 8, 10, 9];
// gives 14, instead of 10
const lastEven = nums.find((value) => value % 2 === 0);
// gives 1, instead of 4
const lastEvenIndex = nums.findIndex((value) => value % 2 === 0);
console.log(lastEven); // 14
console.log(lastEvenIndex); // 1
```
我们可以在调用 find() 和 findIndex() 之前调用数组的 reverse() 方法来反转元素的顺序。

但是这种方法会导致数组发生不必要的突变，因为 reverse() 会反转数组的元素。避免这种突变的唯一方法是制作整个数组的新副本，这可能会导致大型数组出现性能问题。

此外， findIndex() 仍然无法在反转数组上工作，因为反转元素也意味着更改它们在原始数组中的索引。要获得原始索引，我们需要执行额外的计算，这意味着编写更多代码。
```js
const nums = [7, 14, 3, 8, 10, 9];
// Copying the entire array with the spread syntax before
// calling reverse()
const reversed = [...nums].reverse();
// correctly gives 10
const lastEven = reversed.find((value) => value % 2 === 0);
// gives 1, instead of 4
const reversedIndex = reversed.findIndex((value) => value % 2 === 0);
// Need to re-calculate to get original index
const lastEvenIndex = reversed.length - 1 - reversedIndex;
console.log(lastEven); // 10
console.log(reversedIndex); // 1
console.log(lastEvenIndex); // 4
```
在 findLast() 和 findLastIndex() 方法派上用场的情况下。
```js
const nums = [7, 14, 3, 8, 10, 9];
const lastEven = nums.findLast((num) => num % 2 === 0);
const lastEvenIndex = nums.findLastIndex((num) => num % 2 === 0);
console.log(lastEven); // 10
console.log(lastEvenIndex); // 4
```
这段代码更短，更易读。最重要的是，它会产生正确的结果。