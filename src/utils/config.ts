export const api = "https://boasorte.teddybackoffice.com.br";


type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type BodyData = Record<string, unknown> | string | FormData | null;

export const requestConfig = (
        method: HttpMethod,
        data: BodyData = null,
        token: string | null = null,
        image: File | null = null
    ): RequestInit => {

    let config: RequestInit = {};

    if (image) {
            config = {
            method,
            body: data as FormData,
            headers: {}
        };
    } else if (method === "DELETE" || data === null) {
        config = {
        method,
        headers: {}
        };
    } else {
            config = {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }

    if (token && config.headers) {
        (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    return config;
};
