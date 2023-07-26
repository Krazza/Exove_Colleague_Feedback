import { createContext } from "react";
import { QuestionnaireContextTYPE } from "../modules/types";

const initialContext : QuestionnaireContextTYPE = {
    setAnswer : () => {},
    answers : []
}

export const QuestionnaireContext = createContext(initialContext);
//export { initialContext };

