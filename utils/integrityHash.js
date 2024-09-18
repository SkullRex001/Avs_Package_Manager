import crypto from 'crypto'

export const calcHash = (buffer)=>{
    return `sha512-${crypto.createHash('sha512').update(buffer).digest('base64')}`;
}