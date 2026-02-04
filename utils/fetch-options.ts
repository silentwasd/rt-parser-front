export default function (override: any = {}) {
    const config = useRuntimeConfig();

    return {
        baseURL: config.public.apiUrl,
        headers: {
            Accept: 'application/json'
        },
        ...override
    };
}