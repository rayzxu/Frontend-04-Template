function finda (target ,str) {
    console.log(input)
    let cutChar = str.slice(0,target.length)
    if(cutChar == target) {
        console.log(`find a at ${length - input.length}`)
        result = true
    } else {
        /* if(cutChar[1] == target[0])
            input = str.slice(1)
        else 
            input = str.slice(2) */
        for(let i = 0; i < target.length; i++) {
            
        }
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

// winter 

/* function match(string) {
    let foundA = false
    for(let c of string) {
        if (c == "a") {
            foundA = true
        } else if (foundA && c == 'b') {
            return true // 当a b时跳出
        } else {
            foundA = false
        }
    }
    return false
} */