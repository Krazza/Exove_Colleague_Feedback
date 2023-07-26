export type SectionIndicatorType = {
    name : string,
    activeSection : string,
    onSwitchSection : (name : string) => void
}

export type Section = {
    id : string,
    name : string,
    questions : Question[]
}

export type QuestionnaireContextTYPE = {
    setAnswer : React.Dispatch<React.SetStateAction<SectionAnswers[]>>,
    answers : SectionAnswers[]
}

export type Option = {
    value: string,
    label: string
}

export type FeedbackRequest = {
    colleagueName: string,
    colleagueUid : string,
    managerList? : FeedbackManager []
}
export interface UserRequest {
    username: string,
    employeeId : string,
    displayName: string,
    email: string,
    role: string,
    phoneNumber: string,
    groupId: string,
    imagePath: string,
    loggedIn: Boolean
}

export type UserRedux = {
    username: string,
    email: string,
    id: string,
    role: string,
    phoneNumber: string,
    groupId: string,
    imagePath: string,
    loggedIn: Boolean,
}

export type UserMongoDM = {
    name : string,
    uid : string,
    email : string,
    role : string,
    feedbackRequests: FeedbackRequest[],
    answeredQuestionnaires : AnsweredQuestionnaire[]
}

export type AnsweredQuestionnaire = {
    employeeUid : string,
    employeeName : string,
    questionnaire : SectionAnswers[]
}

export type SectionAnswers = {
    sectionID : string,
    name : string,
    answers : Question[]
}

export type Question = {
    questionID : string,
    section : string,
    sectionID : string,
    question : string,
    isFreeForm : boolean,
    answer? : string
}

export type PopUpProps = {
    targetPage : string,
    linkText : string,
    confirmationMessage?: string,
    descriptionMessage?: string
}

export type FeedbackManager = {
    supervisorFirstName : string,
    supervisorLastName? : string,
    supervisorId : string,
    supervisorEmail? : string,
}

export type ManagerEntryProps = {
    displayName : string,
    uid: string,
    managerSelection : () => void,
    managerDeSelection : () => void
}

export type UsersCollectionUser = {
    employeeId: string,
    honorific?: string,
    firstName: string,
    lastName: string,
    shortBirthDate?: string,
    gender?: string,
    email: string,
    displayName: string,
    work: UserWork[],
    reportsTo: FeedbackManager[],
    feedbackRequests: FeedbackRequest[]

}

export type UserWork = {
    title: string,
    department: string,
    startDate: string,
}