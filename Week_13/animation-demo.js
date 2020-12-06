import {Timeline, Animation} from './animation'
import { ease, easeIn, easeInOut, easeOut } from './ease';

let tl = new Timeline()

tl.start()

window.tl = tl
window.animation = new Animation(
    document.querySelector("#el").style,
    "transform",
    0, 500, 2000, 0, easeIn,
    v => `translateX(${v}px)`)

tl.add(animation)

document.querySelector("#el2").style.transition = 'transform ease-in 2s';
document.querySelector("#el2").style.transform = 'translateX(500px)';

document.querySelector("#start").addEventListener("click", () => {
    tl.add(animation)
})

document.querySelector("#pause").addEventListener("click", () => {
    tl.pause()
})

document.querySelector("#resume").addEventListener("click", () => {
    tl.resume()
})