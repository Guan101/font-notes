> v-show 是通过 display 来控制标签进行渲染的，但是 template 标签在 vue 解析后是不会显示在页面上的，是虚拟 Dom，所以无法使用 v-show。
> 反之 v-if 是可以使用在 template 标签上，因为 v-if 是条件渲染，只要满足 v-if 后的条件就可以完成渲染。

```html
<template v-if="showTag"></template>
```

> v-for
> 同理，v-for 也因为虚拟 dom 的原因，不能在 template 标签上使用（v-for 的时候，自动根据要遍历的数组渲染 dom）

```html
<div v-for="(item, index) in forArray"></div>
```
