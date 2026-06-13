import { buildMerkleRoot } from "./crypto/merkleTree.js"

const root=buildMerkleRoot([
	"A",
	"B",
	"C",
	"D"
])

console.log(root)