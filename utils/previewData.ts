import { PreviewData } from "next";
import { createContext, useContext } from "react";

const PreviewDataContext = createContext<PreviewData | undefined>(undefined);
export const PreviewDataContextProvider = PreviewDataContext.Provider;
export const usePreviewData = () => useContext(PreviewDataContext)!;
