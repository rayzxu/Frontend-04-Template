import {Component, createElement} from './framework.js'
import { Carousel } from './carousel'
import {Timeline, Animation} from './animation'

let tl = new Timeline()

window.animation = new Animation({ set a(v) {console.log(v)}}, "a", 0, 100, 1000, null)
window.tl = tl

// tl.add(new Animation({ set a(v) {console.log(v)}}, "a", 0, 100, 1000, null))
tl.start()

/* let d = [
    './1.jpeg',
    './2.jpeg',
    './3.jpg',
    './4.jpeg'
]

let a = <Carousel src={d}></Carousel>
a.mountTo(document.body) */
