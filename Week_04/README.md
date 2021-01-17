学习笔记

- 归类：多继承 C++
- 分类：单继承 /基类 C# Java

- js： 
    - 多范式 object-prototype
    - 描述 对象与对象之间的区别（描述自己与原型对象的区别）
    - 对象的行为是改变对象状态的行为

- js：
    - 属性既可以描述状态 也可以描述行为 js的属性可以是一个函数 如果js自身不包含这个属性 他就会沿着原型链 向上寻找原型对象上的方法与属性 直到原型为nihilo（null）
###key value 对 
    - key：symbol/string 
    - value：data数据属性/Accessor访问器属性
        - 数据属性：writeable属性、enumerable、configurable
        - 访问器属性：get、set、enumerable（遍历）、configurable（配置/更改）

###object语法：
    - {}.[] Object.defineProperty: 提供了基本的对象机制、通过对象去创建对象访问属性、定义新的属性、改变属性的特征值
    - Object.create/Object.setPropertyOf/Object.getPropertyOf：基于原型的描述对象的方法 基于原型的对象api
    - new/class/extends 基于分类的方式去描述对象
    - new/function/prototype

### function：特殊对象：除了一般对象的属性和原型、函数对象还有一个行为[[call]]

### Array：[[length]]

### host Object：浏览器：window setTimeout

### 值属性
这些全局属性返回一个简单值，这些值没有自己的属性和方法。

- Infinity
- NaN
- undefined
- globalThis

### 函数属性
全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。

- eval()
- uneval()
- isFinite()
- isNaN()
- parseFloat()
- parseInt()
- decodeURI()
- decodeURIComponent()
- encodeURI()
- encodeURIComponent()

### 基本对象
顾名思义，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

- Object
- Function
- Boolean
- Symbol

### 错误对象
错误对象是一种特殊的基本对象。它们拥有基本的 Error 类型，同时也有多种具体的错误类型。

- Error
- AggregateError
- EvalError
- InternalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

###数字和日期对象
用来表示数字、日期和执行数学计算的对象。

- Number
- BigInt
- Math
- Date

### 可索引的集合对象
这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。

- Array
- Int8Array
- Uint8Array
- Uint8ClampedArray
- Int16Array
- Uint16Array
- Int32Array
- Uint32Array
- Float32Array
- Float64Array
- BigInt64Array
- BigUint64Array

### 使用键的集合对象
这些集合对象在存储数据时会使用到键，包括可迭代的Map 和 Set，支持按照插入顺序来迭代元素。

- Map
- Set
- WeakMap
- WeakSet

### 结构化数据
这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON （JavaScript Object Notation）编码的数据。

- ArrayBuffer
- SharedArrayBuffer
- Atomics
- DataView
- JSON

### 控制抽象对象
控件抽象可以帮助构造代码，尤其是异步代码（例如，不使用深度嵌套的回调）。

- Promise
- Generator
- GeneratorFunction
- AsyncFunction

### 反射
- Reflect
- Proxy