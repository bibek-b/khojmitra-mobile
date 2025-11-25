import { loaderType } from '@/types/loader';
import { create } from 'zustand';

export const useLoaderStore = create<loaderType>((set) => ({
    loading: {
        parent: "",
        boolean: false
    },
    showLoading : (parent: string) => set({loading: {parent, boolean: true}}),
    hideLoading: () => set({loading: {parent: '', boolean: false}})
}))