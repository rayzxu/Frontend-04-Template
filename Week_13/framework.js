export function createElement(type, attributes, ...children) {
    let element
    if(typeof type === "string") {
        element = new ElementWrapper(type);
    } else {
        element = new type;
    }
    for(let name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
    for(let child of children) {
        if (typeof child === 'string') {
            child = new TextWrapper(child)
        }
        element.appendChild(child)
    }
    console.log(element)
    return element;
}

export class Component {
    constructor(type) {
        // this.root = this.render()
    }
    appendChild(child) {
        // this.root.appendChild(child)
        child.mountTo(this.root)
    }
    setAttribute(name, value) {
        console.log(name, value)
        this.root.setAttribute(name, value)
    }
    mountTo(parent) {
        // this.root = document.createElement('div')
        console.log(this.root)
        parent.appendChild(this.root)
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        this.root = document.createElement(type)
    }
}

class TextWrapper extends Component {
    constructor(content) {
        this.root = document.createTextNode(content)
    }
}
