// src/types.ts

export interface ISource {
    id: string | null;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ISourcesResponse {
    status: string;
    sources: ISource[];
}

export interface IArticle {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface IArticlesResponse {
    status: string;
    totalResults: number;
    articles: IArticle[];
}

export type TRequestParams = {
    [key: string]: string | number | undefined;
    apiKey?: string;
    q?: string;
    sources?: string;
    pageSize?: number;
    page?: number;
    category?: string;
    language?: string;
    country?: string;
};
