import { FeedbackRequest } from "./types"

export type FeedbackApproval = {
    selectedColleague: string[],
}
export interface UserRequest {
    username: string,
    employeeId: string,
    displayName: string,
    email: string,
    role: string,
    phoneNumber: string,
    groupId: string,
    imagePath: string,
    loggedIn: Boolean,
    feedbackRequests: FeedbackRequest[]
}
export type UserMongoDM = {
    name: string,
    uid: string,
    email: string,
    role: string,
    userRequests: UserRequest[]
}