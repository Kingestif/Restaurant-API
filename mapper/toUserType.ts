import { Usertype } from "../types/user";

export const toUser = (doc: any): Usertype => {
    return {
        id: doc._id.toString(),
        email: doc.email,
        role: doc.role
    }
}