import type { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  loading: boolean;
  onToggle: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({ todos, loading, onToggle, onDelete }: Props) {
  if (loading) {
    return (
      <p className="py-8 text-center text-muted" aria-live="polite">
        Loading...
      </p>
    );
  }

  if (todos.length === 0) {
    return (
      <p className="py-8 text-center text-muted">
        No tasks yet. Add your first one above.
      </p>
    );
  }

  return (
    <ul className="space-y-2" role="list">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
