import Repository from "~/repos/Repository";
import type PaginatedCollection from "~/types/PaginatedCollection";
import type MovieResource from "~/resources/MovieResource";

export default class MovieRepository extends Repository {
    public index(query: () => any) {
        return this.client.getLazyFetch<PaginatedCollection<MovieResource>&{counters: any}>(() => '/movies?' + querify(query()).toString());
    }
}