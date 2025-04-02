export const attachTokenToHeaders = (token: string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
