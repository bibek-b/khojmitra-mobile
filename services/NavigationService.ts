
export const routerRef = {
    router: null as any
}

export function redirectToLogin () {
    routerRef.router?.replace("/screens/signInScreen");
}