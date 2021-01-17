## HTML

### HTML 的定义

- XML、SGML超集
- HTML 中的字符字体
  - HTML 中，一些字符是预留的，必须使用字符实体才能显示，直接使用可能会报错

### 标签的语义

- 开发者友好：增强可读性、写css结构清晰、便于维护
- 搜索引擎友好：让搜索引擎爬虫更好地获取到更多有效信息，有效提升网页的搜索量（伪）

#### 作为自然语言延伸的语义类标签

em、string ...

#### 作为标题摘要的语义类标签

h1 - h6、hgroup、section ... 

#### 作为整体结构的语义类标签

article、main、aside、footer ...

### 语法

### 合法元素

- Element: `<tagname></tagname>`
- Text: `text`
- Comment: `<!-- comments -->`
- DocumentType: `<!Doctype html>`
- ProcessingInstruction: `<?a 1?>`
- CDATA: `<![CDATA[]]>`

### 字符引用

- 格式 `&entity_name;`/`&#entity_number`
- 常见字符：
  | 显示结果 | 实体名称 | 实体编号 | 描述 |
  | :------: | :------: | :------: | :--------: |
  | ` ` | `&nbsp;` | `&#160;` | 不间断空格 |
  | `<` | `&lt;` | `&#60;` | 小于号 |
  | `>` | `&gt;` | `&#62;` | 大于号 |
  | `&` | `&amp;` | `&#38;` | 和号 |
  | `"` | `&quot;` | `&#34;` | 引号 |
  | `'` | `&apos;` | `&#39` | 撇号 |

## 浏览器 API

### 事件 API

- 冒泡和捕获是浏览器处理事件的一个过程，先捕获再冒泡
  - 捕获：计算事件是发生在哪个元素（机器识别元素）
  - 冒泡：元素一层层向外响应事件（触发人类写的事件）

### DOM API
1. 节点：DOM 树形结构中的节点相关 API。
2. 事件：触发和监听事件相关 API。
3. Range：操作文字范围相关 API。
4. 遍历：遍历 DOM 需要的 API。

#### 节点

- Node
    - Element: 元素型节点和标签相对应
    - Document：文档节点
    - CharacterData：
        - Text：文本节点
        - Comment：注释
        - ProcessingInstruction：处理信息
    - DocumentFragment：文档片段
    - DocumentType： 文档类型

#### Node API

- 标示Node之间的关系
  - parentNode
  - childNodes
  - firstChild
  - lastChild
  - nextSibling
  - previousSibling
  - parentElement
  - children
  - firstElementChild
  - lastElementChild
  - nextElementSibling
  - previousElementSibling
- 操作Dom树
  - appendChild
  - insertBefore
  - removeChild
  - replaceChild
- 创建特定节点
  - createElement
  - createTextNode
  - createCDATASection
  - createComment
  - createProcessingInstruction
  - createDocumentFragment
  - createDocumentType
- 操作属性
  - getAttribute
  - setAttribute
  - removeAttribute
  - hasAttribute
  - getAttributeNode
  - setAttributeNode
  - attributes对象： 比如 document.body.attributes.class = “a” 等效于 document.body.setAttribute(“class”, “a”)。
- 查找元素
  - querySelector
  - querySelectorAll
  - getElementById
  - getElementsByName
  - getElementsByTagName
  - getElementsByClassName
- 高级API
  - compareDocumentPosition 是一个用于比较两个节点中关系的函数。
  - contains 检查一个节点是否包含另一个节点的函数。
  - isEqualNode 检查两个节点是否完全相同。
  - isSameNode (===) 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用“===”。
  - cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。
- 遍历
  - NodeIterator
  - TreeWalker

#### Range API

- HTML 文档流中有起始点和终点的一段范围
- 不关心节点层级、可以截取半个节点

```js
var range = new Range();
range.setStart(element, 9);
range.setEnd(element, 4);
var range = document.getSelection().getRangeAt(0);
var fragment = range.extractContents();
range.insertNode(document.createTextNode("a"));
```

- range.setStartBefore
- range.setEndBefore
- range.setStartAfter
- range.setEndAfter
- range.selectNode
- range.selectNodeContents

### CSSOM

- document.styleSheets
  - cssRules
  - insertRule
  - removeRule
- window.getComputedStyle(el, pseudoEle)

### CSSOM View

- **window**
  - innerHeight / innerWidth
  - outerHeight / outerWidth 包含浏览器工具栏的窗口大小
  - devicePixelRatio
    - 屏幕上的物理像素和代码逻辑像素的比值
  - screen
    - screen.width
    - screen.height
    - screen.availWidth
    - screen.availHeight

### Window API

- open
- moveTo(x, y)
- moveBy(x, y)
- resizeBy(x, y)
- location
- click

### scroll

- window
  - scrollX
  - scrollY
  - scroll(x, y)
  - scrollBy(x, y)
- Element
  - scrollTop
  - scrollLeft
  - scrollWidth
  - scrollHeight
  - scroll(x, y)
  - scrollBy(x, y)
  - scrollIntoView

### layout

- getClientRects()
- getBoundingClientRect()