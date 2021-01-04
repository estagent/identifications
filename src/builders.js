import {getIdentifications} from "./identifications";

const makeIdentificationHeaders = (options) => {
    const identifications = getIdentifications();
    const headers = {}

    const addHeader = (identification, hKey) => {

        if (!identification)
            throw "identification key required";

        if (typeof identification !== 'string')
            throw "identification key must be string"

        if (!identifications.hasOwnProperty(identification))
            throw `${identification} is not identification key `

        if (!hKey)
            hKey = 'X-'.concat(identification.capitalize())

        if (typeof hKey !== 'string')
            throw "header key must be string"

        headers[hKey] = identifications[identification]
    }

    const makeHeadersFromObject = (obj) => {
        for (let key of Object.keys(obj))
            addHeader(obj[key], key)
    }

    // if array, identification keys are expected
    if (options instanceof Array) {
        for (let item of options) {
            if (item instanceof Object)
                makeHeadersFromObject(item)
            else addHeader(item)
        }

    } else if (options instanceof Object) // if object, headers keys are expected
        makeHeadersFromObject(options)

    else if (typeof options === "string")
        addHeader(options)
    else addHeader('identifier');

    return headers;
}

export const updateHeadersWithIdentifications = (headers, opts) => {

    if (typeof headers !== 'object')
        throw "headers is not object"

    let identificationHeaders;

    if (!opts)
        identificationHeaders = makeIdentificationHeaders()
    else if (typeof opts == "string")
        identificationHeaders = makeIdentificationHeaders(opts);

    if (opts instanceof Array) {
        identificationHeaders = makeIdentificationHeaders(opts)

    } else if (opts instanceof Object) {

        const bOpts = [];

        if (opts.hasOwnProperty('identifier')){
            if (opts.identifier !== false){
                if (typeof opts.identifier === 'string')
                    bOpts.push({[opts.identifier]: 'identifier'})
                else
                    bOpts.push('identifier')
            }
        }

        if (opts.hasOwnProperty('timestamps')) {
            if (opts.timestamps === true)
                bOpts.push('createdAt', 'updatedAt')
        }

        // if (Object.keys(bOpts))
        identificationHeaders = makeIdentificationHeaders(bOpts)

    } else throw `options is in unsupported type ${typeof opts}`


    for (let key of Object.keys(identificationHeaders)) {
        headers[key] = identificationHeaders[key]
    }

    return headers;
}





