import { useEffect, useState, useCallback } from 'react';
import { todoApi } from './api/todoApi';
import type { Todo } from './types/Todo';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setError(null);
      const data = await todoApi.list();
      setTodos(data);
    } catch (e) {
      setError(extractError(e, 'Failed to load todos'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = async (text: string) => {
    try {
      const created = await todoApi.create(text);
      setTodos((prev) => [...prev, created]);
    } catch (e) {
      setError(extractError(e, 'Failed to add todo'));
    }
  };

  const handleToggle = async (id: number, done: boolean) => {
    const prev = todos;
    setTodos((curr) => curr.map((t) => (t.id === id ? { ...t, done } : t)));
    try {
      await todoApi.update(id, done);
    } catch (e) {
      setTodos(prev);
      setError(extractError(e, 'Failed to update todo'));
    }
  };

  const handleDelete = async (id: number) => {
    const prev = todos;
    setTodos((curr) => curr.filter((t) => t.id !== id));
    try {
      await todoApi.remove(id);
    } catch (e) {
      setTodos(prev);
      setError(extractError(e, 'Failed to delete todo'));
    }
  };

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main className="min-h-full px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink">
            Todos
          </h1>
          <p className="mt-3 text-muted">
            A minimal task list. Stay focused, get things done.
          </p>
        </header>

        <section className="mb-6">
          <TodoInput onAdd={handleAdd} />
        </section>

        {error && (
          <div
            role="alert"
            className="mb-4 px-4 py-3 rounded-lg bg-orange-50 border border-cta/30 text-cta-hover text-sm"
          >
            {error}
          </div>
        )}

        <TodoList
          todos={todos}
          loading={loading}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />

        {!loading && todos.length > 0 && (
          <p className="mt-6 text-center text-sm text-muted">
            {remaining} of {todos.length} remaining
          </p>
        )}
      </div>
    </main>
  );
}

function extractError(e: unknown, fallback: string): string {
  if (e && typeof e === 'object' && 'message' in e) {
    const msg = (e as { message?: unknown }).message;
    if (typeof msg === 'string') return msg;
  }
  return fallback;
}
