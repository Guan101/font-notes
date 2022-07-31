## 本部分主要介绍数组类型的相关概念</br>

### 1、类型[]

数组类型，我们在声明时，使用类型+中括号的方式，表示这个数组中都有那些类型的数据

```js
let arr: number[] = [123]; // √  表示数组中的都是数字
let arr: number[] = [1, 2, 3, "1"]; // × 声明了数组中的类型为数字以后，是不可以出现字符串的形式的

let arr: number[] = [1, 2, 3];
arr.unshift("1"); // 同样也不允许添加其他类型的数组

var arr: number[] = [1, 2, 3]; //数字类型的数组
var arr2: string[] = ["1", "2"]; //字符串类型的数组
var arr3: any[] = [1, "2", true]; //任意类型的数组
```

### 2、数组泛型

规则 Array<类型>

```js
let arr:Array<number> = [1,2,3] === let arr:number[] = [1,2,3]
```

### 3、用接口表示数组

一般用来描述类数组

```js
interface NumberArray {
  [index: number]: number;
}
let a: NumberArray = [1, 2, 3, 4];
//表示只要索引的类型是数字时，那么值的类型必须是数字
```

### 4、多维数组

```js
let data: number[][] = [
  [1, 2],
  [3, 4],
];
```

### 5、arguments 类数组

```js
function Arr(...args: any): void {
  console.log(arguments);
  let arr: number[] = arguments; //会报错，因为arguments是一个类数组，所以不能用这种方式
}
Arr(111, 222, 333);
```

```js
function Arr(..args:any):void {
    console.log(arguments)
    let arr:IArguments = arguments
}
Arr(111, 222, 333);
```
ts内置了一个接口对象IArguments,它是ts中定义好了的类型，实际上就是：
```js
interface IArguments {
    [index:number]:any;
    length:number;
    callee:Function;
}
```

### 6、any在数组中的应用
以下的这个数组可以存在任意类型
```js
let list:any[] = ['test',true,1,{name:'wang'},[1,3]]
```