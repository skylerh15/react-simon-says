export default function(a: any[], b: any[]): any[] {
    const ret = [];
    const maxLen = a.length > b.length ? a.length : b.length;
    for (let i = 0; i < maxLen; i++) {
        ret.push(a[i]);
        ret.push(b[i]);
    }
    return ret;
}
