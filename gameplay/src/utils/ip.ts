const os = require('os')

export function getHostName() {
    const hostname = os.hostname()

    return hostname
}

export function getIp() {
    const nw = os.networkInterfaces()
    console.log('nw ->', nw)

    if (nw) {
        const address1 = nw.lo0[0].address
        const address2 = nw.en0[nw.en0.length - 1].address
        return [address1, address2]
    } else return [null, null]
}
