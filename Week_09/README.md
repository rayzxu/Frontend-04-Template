## CSS 总论

- at-rule
    - @charset ： https://www.w3.org/TR/css-syntax-3/
        - 用于提示 CSS 文件使用的字符编码方式，它如果被使用，必须出现在最前面。
        - 这个规则只在给出语法解析阶段前使用，并不影响页面上的展示效果。
    - @import ：https://www.w3.org/TR/css-cascade-4/
        - @import 用于引入一个 CSS 文件，除了 @charset 规则不会被引入，@import 可以引入另一个文件的全部内容。
    - @media ：https://www.w3.org/TR/css3-conditional/
        - 它能够对设备的类型进行一些判断。
    - @page ： https://www.w3.org/TR/css-page-3/
        - page 用于分页媒体访问网页时的表现设置，页面是一种特殊的盒模型结构，除了页面本身，还可以设置它周围的盒。 如打印机
    - @counter-style ：https://www.w3.org/TR/css-counter-styles-3
        - counter-style 产生一种数据，用于定义列表项的表现。
    - @keyframes ：https://www.w3.org/TR/css-animations-1/
        - keyframes 产生一种数据，用于定义动画关键帧。
    - @fontface ：https://www.w3.org/TR/css-fonts-3/
        - fontface 用于定义一种字体
    - @supports ：https://www.w3.org/TR/css3-conditional/
        - support 检查环境的特性，它与 media 比较类似。
    - @namespace ：https://www.w3.org/TR/css-namespaces-3/
        - 用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间。
    - viewport：
        - 用于设置视口的一些特性，不过兼容性目前不是很好，多数时候被 HTML 的 meta 代替。

- rule 普通规则
  - Selector 选择器
  - Declaration 声明列表
    - Key 键/属性
      - variables
      - properties
    - Value 值
      - 函数
        - calc：函数是基本的表达式计算
        - max: 取两数中较大的一个
        - min: 取两数之中较小的一个
        - clamp: 给一个值限定一个范围，超出范围外则使用范围的最大或者最小值
        - toggle: 在规则选中多于一个元素时生效，它会在几个值之间来回切换
        - attr: 允许 CSS 接受属性值的控制。
      - 值的类型
        - number
        - length

## CSS 选择器

- 简单选择器
  - `*` 通用符
  - `div svg|a` 等类型选择器（| 表示 svg 命名空间下的 a）
  - `.class` 类选择器
  - `#id` id 选择器
  - `[attr=value]` 属性选择器
  - `:hover` 伪类选择器
  - `::before` 伪元素选择器
- 复合选择器
  - <简单选择器><简单选择器><简单选择器>
  - `*` 或 div 必须写在前面
- 复杂选择器
  - <复合选择器>\<sp\><复合选择器>
  - <复合选择器> ">" <复合选择器>
  - <复合选择器> "~" <复合选择器>
  - <复合选择器> "+" <复合选择器>
  - <复合选择器> "||" <复合选择器>
- 选择器的优先级 0 0 0 0
  计算方法：[A selector's specificity is calculated](https://www.w3.org/TR/2009/CR-CSS2-20090908/cascade.html#specificity)
  - a: 当样式通过 `style` 内联定义时，标记为 1，否则标记为 0
  - b: 计算 id 选择器的个数
  - c: 计算选择器中其他属性（类、属性选择器）和伪类的个数
  - d: 计算选择器中类型选择器和伪元素的个数

## 伪元素

- `::before` 在元素前面插入一个元素
- `::after` 在元素后面插入一个元素
- `::first-line` 将内容（文本）里面的第一个行括起来，对可更改的样式属性有限制
- `::first-letter` 将内容（文本）里面的第一个字母括起来，对可更改的样式属性有限制


## 思考题
为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
first-letter 可以类似于image处理、个数确定 =》 所占空间确定
first-line 首先不确定第一行会有多少个字符、float后所占的空间不确定、其次first-line会受本身文段css所影响：当父文段发生改变时（eg. 浏览器窗口放大缩小）会引起重绘。对性能有较大影响