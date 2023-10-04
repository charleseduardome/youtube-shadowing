import { createContext } from "react";

import { ISpeechContextData } from "../typings/globals";

const SpeechContext = createContext<ISpeechContextData>({} as ISpeechContextData)

export default SpeechContext