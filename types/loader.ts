
export interface loaderType  {
    loading: {
        parent: string,
        boolean: boolean
    },
    showLoading: (parent: string) => void;
    hideLoading: () => void;
}