import Repository from "~/repos/Repository";
import type PaginatedCollection from "~/types/PaginatedCollection";

export default class SearchRepository extends Repository {
    public search(query: () => any) {
        return this.client.getLazyFetch<any[]>(() => '/search?' + querify(query()).toString());
    }
}