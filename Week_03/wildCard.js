// wildcard 通配符 1只有 * 2只有 ？

// ab*cd*abc*a?d 前面的*少匹配 后面的*尽量多的匹配

function find(source, pattern) {
    let startCount = 0
    for (let i = 0; i < pattern.length; i++) {
        if(pattern[i] === "*") {
            startCount ++;
        }
    }
    if (startCount === 0) {
        for(let i = 0; i < pattern.length; i++) {
            if(pattern[i] !== source[i] && pattern[i] !== "?") {
                return false
            }
        }
        return
    }
    let i = 0
    let lastIndex = 0

    for(i = 0; pattern[i] !== "*"; i++) { // 分块匹配第i个星号所在的位置 记录
        if(pattern[i] !== source[i] && pattern[i] !== "?") {
            return false
        }
    }

    lastIndex = i;

    for(let p = 0; p <startCount - 1; p++) { // 循环每一段 每个星 的模式串
        i++
        let subPattern = ""
        while(pattern[i] !== "*") { 
            subPattern += pattern[i]
            i++
        }

        let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), "g") // [\\s\\S]正则里的任意字符
        reg.lastIndex = lastIndex

        lastIndex = reg.lastIndex
    }

    for(let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== "*"; j++) { // 如果最后一个星号 会跳过上一个循环 进入到最后一个*尽量多的匹配
        if(pattern[pattern.length - j] !== source[source.length - j] // 从source的尾部开始 从后往前进行匹配
            && pattern[pattern.length - j] !== "?")
            return false
    }
    return true
}

console.log(find('abcabcabxaac', 'a*b*bx*c'))