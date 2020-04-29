const fs = require('fs')
const lockfile = require('@yarnpkg/lockfile');
let oldLockfile = fs.readFileSync('yarn.lock.bak', 'utf8')
let oldLockfileObj = lockfile.parse(oldLockfile).object
let newLockfile = fs.readFileSync('yarn.lock', 'utf8')
let newLockfileObj = lockfile.parse(newLockfile).object
// let excludedModules = [/node\-hid.*/]
let excludedModules = []
function isExcluded(str) {
    for (let i = 0; i < excludedModules.length; i++) {
        let regexp = excludedModules[i]
        if (str.match(regexp)) {
            return true
        }
    }
    return false
}

for (let key in oldLockfileObj) {
    if (isExcluded(key)) {
        console.log(`skipping ${key}`)
        continue
    }
    newLockfileObj[key] = oldLockfileObj[key]
}
fs.writeFileSync('yarn.lock', lockfile.stringify(newLockfileObj))
