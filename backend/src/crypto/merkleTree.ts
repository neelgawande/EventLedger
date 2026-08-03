import { sha256 } from './hash.js'

export interface MerkleTree {
    levels:string[][]
    root:string
}

export interface MerkleProofNode {
    hash:string
    position:"left"|"right"
}

export interface MerkleProof {
    leaf:string
    nodes:MerkleProofNode[]
}

function hashPair(left:string, right:string):string {
    return sha256(left+right)
}

export function buildMerkleTree(leaves:string[]):MerkleTree{
    if(leaves.length===0){
        throw new Error("Cannot build Merkle tree from empty array.")
    }
    const levels:string[][]=[]
    levels.push([...leaves])
    let level=[...leaves]
    while(level.length>1){
        const nextLevel:string[]=[]
        for(let i=0;i<level.length;i+=2){
            const left=level[i]
            const right=level[i+1]??left
            nextLevel.push(hashPair(left,right))
        }
        levels.push(nextLevel)
        level=nextLevel
    }
    return{
        levels,
        root:level[0]
    }
}

export function generateProof(
    tree:MerkleTree,
    leafIndex:number
):MerkleProof{
    const leaves=tree.levels[0]
    if(leafIndex<0 || leafIndex>=leaves.length){
        throw new Error("Invalid leaf index.")
    }
    const proof:MerkleProof={
        leaf:leaves[leafIndex],
        nodes:[]
    }
    let index=leafIndex
    for(let level=0;level<tree.levels.length-1;level++){
        const currentLevel=tree.levels[level]
        let siblingIndex:number
        let position:"left"|"right"
        if(index%2===0){
            siblingIndex=index+1
            position="right"
            if(siblingIndex>=currentLevel.length){
                siblingIndex=index
            }
        }
        else{
            siblingIndex=index-1
            position="left"
        }
        proof.nodes.push({
            hash:currentLevel[siblingIndex],
            position
        })
        index=Math.floor(index/2)
    }
    return proof
}