import { activeReportNavEnum, activeReportNavType,  } from "@/types/myActivity";
import { create } from "zustand";

export const useActiveReportNavStore = create<activeReportNavType>(set => ({
    activeReportNav: activeReportNavEnum.myPosts,
    setActiveReportNav: (nav) => set({activeReportNav: nav})
}))