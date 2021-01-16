## HTML

### HTML 的定义

- XML、SGML
- HTML 中的字符字体
  - HTML 中，一些字符是预留的，必须使用字符实体才能显示，直接使用可能会报错

### 标签的语义


article、main、aside、abbr、strong、em、p、h1、nav、ol、figure

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
  - 捕获：计算事件是发生在哪个元素
  - 冒泡：元素一层层向外响应事件

### DOM API

#### Node API

- Node
  - Element
    - HTMLElement
    - SVGElement
  - Document
  - CharacterData
    - Text
    - Comment
    - ProcessingInstruction
  - DocumentFragment
  - DocumentType
- 导航类操作
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
- 修改操作
  - appendChild
  - insertBefore
  - removeChild
  - replaceChild
- 高级操作
  - compareDocumentPosition
  - contains
  - isEqualNode
  - isSameNode (===)
  - cloneNode

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

- `window.open("about:blank", "_blank", "width-100,height:100");`
- moveTo(x, y)
- moveBy(x, y)
- resizeBy(x, y)

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