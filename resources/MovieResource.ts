export default interface MovieResource {
    id: number;
    topic_id: number;
    title: string;
    cover?: string;
    year: {
        from?: number,
        to?: number
    };
    genres: string[];
    countries: string[];
    release: string;
}