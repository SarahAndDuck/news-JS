import { TRequestParams } from '../../types';

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
}

export enum Endpoint {
    Everything = 'everything',
    Sources = 'sources',
}

type TCallback<T> = (data: T) => void;

class Loader {
    private baseLink: string;

    private options: TRequestParams;

    constructor(baseLink: string, options: TRequestParams) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: { endpoint: Endpoint; options?: TRequestParams },
        callback: TCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw new Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: TRequestParams, endpoint: Endpoint): string {
        const urlOptions: TRequestParams = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: TCallback<T>,
        options: TRequestParams = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: unknown) => callback(data as T))
            .catch((err) => console.error(err));
    }
}

export default Loader;
