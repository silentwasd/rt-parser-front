import Repository from "~/repos/Repository";
import type PaginatedCollection from "~/types/PaginatedCollection";

export default class SearchRepository extends Repository {
    public search(query: () => any) {
        return this.client.getLazyFetch<PaginatedCollection<any[]>&{counters: any}>(() => '/search?' + querify(query()).toString());
    }

    public searchFetch(query: () => any) {
        return this.client.get<any[]>('/search?' + querify(query()).toString());
    }
}