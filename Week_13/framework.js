export function createElement(type, attributes, ...children) {
    console.log('createElement',type, attributes, ...children)
    console.log('children.length', children.length)
    let element
    if(typeof type === "string") {
        element = new ElementWrapper(type);
    } else {
        element = new type;
    }
    for(let name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
    let processChildren = (children) => {
        // console.log('children', children)
        for(let child of children) {
            if(child) {
                // console.log('child', child)
                if((typeof child === 'object') && (child instanceof Array)) {
                    processChildren(child)
                    continue;
                } else {
                    if (typeof child === 'string') {
                        child = new TextWrapper(child)
                    }
                    console.log('ATTRIBUTEATTRIBUTE appendChild', child)
                    element.appendChild(child)
                }
            } else {
                break
            }
        }
    }
    processChildren(children)
    console.log('element',element)
    return element;
}

export const STATE = Symbol('state');
export const ATTRIBUTE = Symbol('attribute');

export class Component {
    constructor(type) {
        this[ATTRIBUTE] = Object.create(null);
        this[STATE] = Object.create(null);
        // this.root = this.render()
    }
    appendChild(child) {
        // this.root.appendChild(child)
        child.mountTo(this.root)
    }
    /* setAttribute(name, value) {
        this.attributes[name] = value
    } */
    setAttribute(name, value) {
        this[ATTRIBUTE][name] = value
    }
    mountTo(parent) {
        if(!this.root) {
            this.render()
        }
        console.log('ATTRIBUTEATTRIBUTE this.root', this.root)
        parent.appendChild(this.root)
    }
    triggerEvent(type, args) {
        this[ATTRIBUTE]['on' + type.replace(/^[\s\S]/, s => s.toUpperCase())](new CustomEvent(type, {detail: args}))
    }
    render() {
        return this.root;
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        super();
        this.root = document.createElement(type)
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }
}

class TextWrapper extends Component {
    constructor(content) {
        super();
        this.root = document.createTextNode(content)
    }
}
