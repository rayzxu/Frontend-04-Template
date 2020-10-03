function finda (target ,str) {
    console.log(input)
    let cutChar = str.slice(0,2)
    if(cutChar == target) {
        console.log(`find a at ${length - input.length}`)
        result = true
    } else {
        if(cutChar[1] == target[0])
            input = str.slice(1)
        else 
            input = str.slice(2)
    }
    return finda
}

let input = 'fjineiqaqei'
let target = 'aq'

let result = false

let length = input.length

while(input) {
    finda = finda(target, input) //接入输入 完成状态切换
    if (result == true) {
        break
    }
}
console.log(true)