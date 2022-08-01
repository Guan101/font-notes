在ts里面，声明函数的时候，参数类型和函数返回类型都要写，并且参数不能多传，也不能少传，必须按照约定的类型来
```js
const fn = (name:string,age:number):string => {
    return name + age
}
fn('张三',18)
```
以上就是表示，我们声明了一个fn函数，接收两个参数：name（字符串类型）、age(数字类型)。这个函数输出结果是字符串格式的

### 1、函数的可选参数
有时候我们定义的函数的某一个形参，可能在以后调用这个函数的时候，对于这个参数传不传，是不确定的。那么这个时候就用到了可选参数操作符？

我们可以用？来表示这个参数为可选参数，后面在调用的时候，传不传都是可以的
```js
const fn = (name:string,age?:number):string => {
    return name+age
}
fn('zhangsan',18)
```

### 2、函数参数的默认值
ts中定义函数的形参的默认值和js定义默认参数是差不多的，只不过多了类型说明
```js
const fn = (name:string = '开心的拍起了肚皮'):string => {
    return name
} 
fn()   //这样函数内部的name默认值就是'开心的拍肚皮'
```

### 3、接口的方式定义函数
下面我们是定义Add接口，定义函数两个参数name（字符串类型）、age(数值类型)，该函数返回字符串类型的结果
```js
interface Add {
    (name:string,age:number):string
}
const fnAdd : Add = (name:string,age:number) : string =>{
    return name + age
}
fn('张三'，18)
```


