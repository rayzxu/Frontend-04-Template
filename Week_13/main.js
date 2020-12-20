import {Component, createElement} from './framework.js'
import { Carousel } from './Carousel.js'
import { Button } from './Button.js'
import { List } from './List.js'
/* import {Timeline, Animation} from './animation'

let tl = new Timeline()

window.animation = new Animation({ set a(v) {console.log(v)}}, "a", 0, 100, 1000, null)
window.tl = tl

// tl.add(new Animation({ set a(v) {console.log(v)}}, "a", 0, 100, 1000, null))

let a = <Carousel src={d} 
    onChange={event => console.log(event.detail.position)}
    onClick={event => window.location.href = event.detail.data.url}></Carousel> */

/* let a = <Button>
    content
</Button> */
let d = [
    {
        img: './1.jpeg',
        url: 'https://www.baidu.com',
        title: '1'
    },
    {
        img: './2.jpeg',
        url: 'http://www.mhhf.com/games',
        title: '2'
    },
    {
        img: './3.jpg',
        url: 'https://www.cnblogs.com/wenxuehai/p/10416862.html',
        title: '3'
    },
    {
        img: './4.jpeg',
        url: 'https://www.baidu.com',
        title: '4'
    }
]
let a = <List data={d}>
    {
        (record) => {
            return <div>
                <img src={record.img}/>
                <a href={record.url}>{record.title}</a>
            </div>
        }
    }
</List>
console.log('a', a)
a.mountTo(document.body)
