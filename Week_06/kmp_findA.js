function finda (target, str) {
    let cutChar
    if (target.length > str.length) {
        result = false
        return;
    } else {
        cutChar = str.slice(0,target.length)
    }
    for (let charCount = i; charCount < cutChar.length; charCount++) {
        if(cutChar[charCount] !== target[charCount]) {
            i = kmpTable[charCount]
            if (i == 0) {
                input = str.slice(i+1)
            } else {
                input = str.slice(i)
            }
            console.log(i, str)
            return finda
        }
    }
    result = true
    console.log(`find ${target}`)
}

function getKmpTable(target) {
    let kmpArr = new Array(target.length).fill(0)
    let i = 1; j = 0
    while (i < target.length) {
        if(target[i] == target[j]) {
            ++j, ++i
            if (i == target.length) {
                return kmpArr
            }
            kmpArr[i] = j
        } else {
            if(j > 0)
                j = kmpArr[j]
            else {
                ++i
            }
        }
    }
    return kmpArr
}

let input = 'faaabaaacqaq'
let target = 'aabaaac'
let result = null
let length = input.length
var i = 0

let kmpTable = getKmpTable(target)
while(input) {
    if (result !== null) {
        break
    } else {
        finda = finda(target, input) //接入输入 完成状态切换
    }
}
console.log(result)

//winter
function match(string) {
    let foundA = false,
     foundB = false,
     foundC = false,
     foundD = false,
     foundE = false

     for(let c of string) {
         if(c == 'a') {
             foundA = true
         } else if (foundA && c == 'b') {
             foundB = true
         } else if (foundB && c == 'c') {
             foundC = true
         } else if (foundC && c=='d') {
             foundD = true
         } else if (foundD && c == 'e') {
             foundE = true
         } else if (foundE && c == 'f') {
             return true
         } else {
            foundA = foundB = foundC = foundD = foundE = false
         }
     }
     return false
}