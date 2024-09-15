import Repository from "~/repos/Repository";

export default class TopicRepository extends Repository {
    public show(id: number) {
        return this.client.getData<any>('topic.show', `/topics/${id}`);
    }
}