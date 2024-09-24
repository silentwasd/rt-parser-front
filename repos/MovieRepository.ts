import Repository from "~/repos/Repository";
import type PaginatedCollection from "~/types/PaginatedCollection";

export default class MovieRepository extends Repository {
    public index(query: () => any) {
        return this.client.getLazyFetch<PaginatedCollection<any>&{counters: any}>(() => '/movies?' + querify(query()).toString());
    }
}