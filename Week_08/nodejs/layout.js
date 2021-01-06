function getStyle(element) {
    if(!element.style)
        element.style = {};
    
    for(let prop in element.computedStyle) {
        // var p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value

        if(element.style[prop].toString().match(/px$/)){
            element.style[prop] = parseInt(element.style[prop])
        }
        if(element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
    }
    return element.style
}

function layout(element) {
    if(!element.computedStyle) {
        return;
    }
    var elementStyle = getStyle(element)

    if(elementStyle.display !== 'flex') {
        return;
    }

    var items = element.children.filter(e => e.type === 'element');

    items.sort(function(a, b){
        return (a.order || 0) - (b.border || 0)
    })

    var style = elementStyle;

    ['width', 'height'].forEach(size => {
        if(style[size] === 'auto' || style[size] === '') {
            style[size] = null
        }
    })

    if(!style.flexDirection || style.flexDirection === 'auto')
        style.flexDirection = 'row'
    if(!style.alignItems || style.alignItems === 'auto')
        style.alignItems = 'stretch'
    if(!style.justifyContent || style.justifyContent === 'auto')
        style.justifyContent = 'flex-start'
    if(!style.flexWrap || style.flexWrap === 'auto')
        style.flexWrap = 'nowrap'
    if(!style.alignContent || style.alignContent === 'auto')
        style.alignContent = 'stretch'
    
    var mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase
    if(style.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }

    if(style.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }

    if(style.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if(style.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if(style.flexWrap === 'wrap-reverse') {
        var tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = 1;
    }

    var isAutoMainSize = false;
    if(!style[mainSize]) {
        elementStyle[mainSize] = 0
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            let itemStyle = getStyle(item);
            if (itemStyle[mainSize] !== null && itemStyle[mainSize] !== (void 0)) {
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
            }
        }
        isAutoMainSize = true
    }

    var flexLine = []
    var flexLines = [flexLine]

    var mainSpace = elementStyle[mainSize];
    var crossSpace = 0

    for(var i = 0; i < items.length; i++) {
        var item = items[i]
        var itemStyle = getStyle(item)

        if(itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0
        }

        if(itemStyle.flex) {
            flexLine.push(item)
        } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize]
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            flexLine.push(item)
        } else {
            if(itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize]
            }
            if(mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace
                flexLine.crossSpace = crossSpace
                flexLine = [item] //创建新行
                flexLines.push(flexLine)
                mainSpace = style[mainSize]
                crossSpace = 0
            } else {
                flexLine.push(item)
            }
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                Math.max(crossSpace, itemStyle[crossSize])
            }
            mainSpace -= itemStyle[mainSize]
        }
        flexLine.mainSpace = mainSpace
        
        if(style.flexWrap === 'nowrap' || isAutoMainSize) {
            flexLine.crossSpace = (style[crossSize] !== void 0) ? style[crossSize] : crossSpace;
        } else {
            flexLine.crossSpace =crossSpace;
        }

        if(mainSpace < 0) { // 对所有元素进行等比压缩
            var scale = style[mainSize] / (style[mainSize] - mainSpace); // 主轴尺寸/期望尺寸
            var currentMain = mainBase;
            for(var i = 0; i < items.length; i++) {
                var item = items[i];
                var itemStyle = getStyle(item)

                if(itemStyle.flex) { //没有flex元素
                    itemStyle[mainSize] = 0
                }

                itemStyle[mainSize] = itemStyle[mainSize] * scale;

                // 计算压缩后的left right大小
                itemStyle[mainStart] = currentMain; // left
                itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]; // right
                currentMain = itemStyle[mainEnd]
            }
        } else {
            // 多行
            flexLine.forEach(function(items) {
                var mainSize = items.mainSpace;
                var flexTotal = 0;
                for(var i = 0; i < items.length; i++) {
                    var item = items[i]
                    var itemStyle = getStyle(item)

                    if((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) { // 找到其中flex元素
                        flexTotal += itemStyle.flex; // 如果有flex就给加上到flex总值上去
                        continue;
                    }
                }

                if(flexTotal > 0) {
                    // 把mainSpace均匀的分配给每一个flex元素
                    // 有flex元素 他会沾满整个行
                    var currentMain = mainBase;
                    for(var i = 0; i < item.length; i++) {
                        var item = item[i];
                        var itemStyle = getStyle(item);

                        if (itemStyle.flex) {
                            itemStyle[mainSize] = (mainSize / flexTotal) * itemStyle.flex; // 每一行主轴方向的剩余空间 // 比例划分 除以总值 再乘以自己的flex
                        }
                        itemStyle[mainStart] = currentMain
                        itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                        currentMain = itemStyle[mainEnd]
                    }
                } else {
                    // 没有flex元素 其主轴方向的剩余空间 需要根据justifyContent规则去把它分配
                    if(style.justifyContent === 'flex-start') {
                        var currentMain = mainBase;
                        var step = 0
                    }
                    if(style.justifyContent === 'flex-end') {
                        var currentMain = mainSpace * mainSign + mainBase;
                        var step = 0
                    }
                    if(style.justifyContent === 'center') {
                        var currentMain = mainSpace / 2 * mainSign + mainBase;
                        var step = 0
                    }
                    if(style.justifyContent === 'space-between') {
                        var step = mainSpace / (item.length - 1) * mianSign
                        var currentMain = mainBase
                    }
                    if(style.justifyContent === 'space-around') {
                        var step = mainSpace / item.length * mainSign;
                        var currentMain = step / 2 + mainBase;
                    }
                    for(var i = 0; i < items.length; i++) {
                        var item = items[i]
                        let itemStyle = getStyle(item)
                        itemStyle[mainStart] = currentMain;
                        itemStylep[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                        currentMain = itemStyle[mainEnd] + step;
                    }

                    // 计算主轴方向
                        //找出所以flex元素
                        // 把主轴方向的剩余尺寸按比例分配给这些元素
                        // 若剩余空间为负数，所有的flex元素为0，等比压缩剩余元素
                        // 确定 纵轴方向上的 top height bottom
                        // 确定 横轴方向上的 left width right
                }
            })
        }
        // 计算交叉轴方向
                        // 根据每一行中最大元素尺寸计算行高
                        // 根据行高flex-align和iten-align，确定元素具体位置
        var crossSpace;

        if(!style[crossSize]) {
            crossSpace = 0
            elementStyle[crossSize] = 0
            for(var i = 0; i < flexLine.length; i++) {
                elementStyle[crossSize] = elementStyle[crossSize] + flexLine[i].crossSpace
            }
        } else {
            crossSpace = style[crossSize]
            for(var i = 0; i < flexLines.length; i++) {
                crossSpace -= flexLine[i].crossSpace
            }
        }

        if(style.flexWrap === 'wrap-reverse') {
            crossBase = style[crossSize];
        } else {
            crossBase = 0
        }

        var lineSize = style[crossSize] / flexLines.length

        var step;
        if(style.alignContent === 'flex-start') {
            crossBase += 0;
            step = 0;
        }
        if(style.alignContent === 'flex-end') {
            crossBase += crossSign * crossSpace;
            step = 0
        }
        if(style.alignContent === 'center') {
            crossBase += crossSign * crossSpace / 2;
            step = 0
        }
        if(style.alignContent === 'space-between') {
            crossBase += 0
            step = crossSpace * (flexLines.length - 1);
        }
        if(style.alignContent === 'space-around') {
            crossBase += crossSign * step / 2
            step = crossSpace / (flexLines.length);
        }
        if(style.alignContent === 'stretch') {
            crossBase += 0
            step = 0
        }
        flexLines.forEach(function (items) {
            var lineCrossSize = style.alignContent === 'stretch' ?
                items.crossSpace + crossSpace / flexLine.length :
                items.crossSpace;

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var itemStyle = getStyle(item)

                var align = itemStyle.alignSelf || style.alignItems;

                if(itemStyle[crossSize] == null) {
                    itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0
                }
                if (align === 'flex-start') {
                    itemStyle[crossStart] = crossBase;
                    itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
                }
                if(align === 'flex-end') {
                    itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize
                    itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize]
                }
                if(align === 'center') {
                    itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2
                    itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize]
                }
                if(align === 'stretch') {
                    itemStyle[crossStart] = crossBase;
                    itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ? itemStyle[crossSize] : lineCrossSize);

                    itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
                }
            }
            crossBase += crossSign * (lineCrossSize + step)
        })
    }
}

module.exports = layout;