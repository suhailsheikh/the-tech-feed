export type PostType = {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    post: string;
    author: {
        id: string;
        name: string;
    }
}