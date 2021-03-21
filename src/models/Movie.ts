export interface Movie {
    imdbID: string;
    title: string;
    poster: string;
    ratings: Array<{
        source: string;
        value: string;
    }>;
    runtime: string;
};