import { createContext } from "react";

import { IVideoContextData } from "../typings/globals";

const VideoContext = createContext<IVideoContextData>({} as IVideoContextData)

export default VideoContext