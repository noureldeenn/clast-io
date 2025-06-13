// lib/api.ts
import axios from 'axios'

export const API = 'https://jsonplaceholder.typicode.com/posts'

export const getPosts = () => axios.get(API).then(res => res.data)
export const getPost = (id: string) => axios.get(`${API}/${id}`).then(res => res.data)
export const createPost = (post: { title: string; body: string }) =>
  axios.post(API, post).then(res => res.data)
export const updatePost = (post: { id: string; title: string; body: string }) =>
  axios.put(`${API}/${post.id}`, post).then(res => res.data)
export const deletePost = (id: number) =>
  axios.delete(`${API}/${id}`).then(res => res.data)
