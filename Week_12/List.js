import {Component, STATE, ATTRIBUTE, createElement} from './framework.js'
import { enableGesture } from './gesture.js'

export { STATE, ATTRIBUTE } from './framework.js'

export class List extends Component {
    constructor() {
        super();
        
        // this.root = document.createElement("div")
    }
    
    render() {
        //debugger
        console.log('ATTRIBUTEATTRIBUTE',this[ATTRIBUTE].data)
        this.children = this[ATTRIBUTE].data.map(this.template)
        console.log('ATTRIBUTEATTRIBUTE children', this.children)
        this.root = (<div>{this.children}</div>).render();
        console.log('ATTRIBUTEATTRIBUTE List root', this.root)
        return this.root;
    }

    appendChild(child) {
        console.log('childappendChild', child)
        this.template = child
        // this.render()
        /* render() */
    }
}