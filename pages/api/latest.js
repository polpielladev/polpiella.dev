import { getAllPosts } from "../../models/API";

export default function handler(req, res) {
    const posts = getAllPosts().slice(0, 3);
    res.status(200).json(posts);
}
