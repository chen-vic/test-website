import axios from 'axios';
import type { Todo } from '../types/Todo';

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL as string) ?? '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const todoApi = {
  list: async (): Promise<Todo[]> => {
    const { data } = await api.get<Todo[]>('/todos');
    return data;
  },

  create: async (text: string): Promise<Todo> => {
    const { data } = await api.post<Todo>('/todos', { text });
    return data;
  },

  update: async (id: number, done: boolean): Promise<Todo> => {
    const { data } = await api.patch<Todo>(`/todos/${id}`, { done });
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
