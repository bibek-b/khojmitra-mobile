import { imageType } from "./image"

export interface proofsType {
    description?: string,
    images?: imageType[],

}

export interface addProofPropsType {
    data: proofsType,
    type: "found" | "owner" | ""
}