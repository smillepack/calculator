const fs = require('fs');

tets('./src', 'src').then(result => {
    console.log('im done', result)
    
    return result
}).then(result => {
    fs.writeFile('./test.json', JSON.stringify(result), (err) => {
        if (err) throw err;

        console.log('file save')
    })
})

async function tets(way, niceNameStr = '') {
    return await new Promise((resolve, reject) => {
        fs.readdir(way, (err, files) => {
            resolve(fileCheck(files, way, niceNameStr))
        })
    })
}

async function fileCheck(files, way, niceNameStr = '') {
    let obj2 = {};
    
    for (let item of files) {
        if (/.(js|jsx)$/.test(item)) {
            obj2[niceNameStr + item.replace(/^(.)/, (st, p1) => p1.toUpperCase()).replace(/.(js|jsx)$/, "")] = way + "/" +  item;

        } else if (!/\./.test(item)) {
            await tets(way + '/' + item, niceNameStr + item.replace(/^(.)/, (st, p1) => p1.toUpperCase())).then(result => {
                obj2 = {
                    ...obj2,
                    ...result
                }
            })
        }
    }
    return obj2
}
