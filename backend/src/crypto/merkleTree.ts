import { sha256 } from './hash.js'

function hashPair(left:string, right:string):string {
    return sha256(left+right)
}

export function buildMerkleRoot(leaves:string[]):string {
    if(leaves.length === 0) {
        throw new Error("Cannot build merkle tree from empty array.")
    }
    let level = [... leaves]
    while(level.length > 1) {
        const nextLevel: string[] = []
        for(let i=0;i<level.length;i+=2) {
            const left = level[i];
            const right = level[i+1] ?? left
            nextLevel.push(hashPair(left,right))
        }
        level = nextLevel;
    } 
    return level[0]
}