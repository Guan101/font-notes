### 1、any类型
* any类型没有限定哪种类型，可以随便赋值切换类型，不需要检查类型，例如：
```js
let a:any = 123
a = '123'
a = true
```
* 声明变量的时候没有指定类型的话，则默认为any类型；
```js
let anys;
anys = '123'
anys = 123
```

***但是使用any的话其实也就是失去了ts类型检查的作用***
### 2、unknown 类型
TypeScript 3.0中引入的 unknown 类型也被认为是 top type（顶级类型） ，但它更安全。与 any 一样，所有类型都可以分配给unknown。
<br/>
unknow类型比any更加严格, 当你要使用any的时候可以尝试使用unknow

```js
//unknown 可以定义任何类型的值
let value: unknown;
 
value = true;             // √
value = 42;               // √
value = "Hello World";    // √
value = [];               // √
value = {};               // √
value = null;             // √
value = undefined;        // √
value = Symbol("type");   // √
 
//以下这样写会报错，因为unknown类型不能作为子类型,只能作为父类型;而any可以作为父类型和子类型
//unknown类型不能赋值给其他类型
let a:unknown = '123'
let b:string = a   // ×
 
//这样就没问题 any类型是可以的
let q:any = '123'
let w:string = q   // √
 
//unknown可赋值对象只有unknown 和 any
let e:unknown = '123'  
let r:any= '456'
 
r = e
```

***另外unknown和any还有一个区别***
>**如果是unknow类型的话，我们是不能调用其属性和函数方法的；any类型的话是可以的**
```js
// 如果我们获取any类型的对象不存在的属性的时候，是不会报错的
let obj:any = {b:1}
obj.a    // √
 
 
// 如果是unknow类型的话，我们是不能调用其属性和函数方法的；any类型的话是可以的。
let obj:unknown = {b:1,ccc:():number=>213}
obj.b    // × 
obj.ccc()   // × 
```

>***总结：***

>>1、any类型可以视作我们在写js，条件宽松，可以任意赋值给其他类型或被赋值,以及像对待js对象那样去调用。

>>2、当我们不确定类型时，使用unknown类型会会更严格、更安全。它是top type,这也意味着它不能作为子类型去给其他类型赋值（除了unknown和any类型），只能作为父类型被赋值。

>>3、我们不能调用unknown类型的属性和函数方法
