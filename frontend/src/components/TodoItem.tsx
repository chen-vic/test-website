import { Trash2, Check } from 'lucide-react';
import type { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  onToggle: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li
      className="group flex items-center gap-3 px-4 py-3 bg-white
                 border border-gray-200 rounded-lg
                 hover:border-primary/40 transition-colors"
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={todo.done}
        onClick={() => onToggle(todo.id, !todo.done)}
        className={`shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center
                    cursor-pointer transition-colors
                    focus:outline-none focus:ring-2 focus:ring-primary/30
                    ${
                      todo.done
                        ? 'bg-primary border-primary text-white'
                        : 'border-gray-300 hover:border-primary'
                    }`}
        aria-label={todo.done ? 'Mark as not done' : 'Mark as done'}
      >
        {todo.done && <Check size={16} strokeWidth={3} />}
      </button>

      <span
        className={`flex-1 break-words ${
          todo.done ? 'line-through text-muted' : 'text-ink'
        }`}
      >
        {todo.text}
      </span>

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="shrink-0 p-2 rounded-md text-muted
                   hover:text-cta hover:bg-orange-50
                   cursor-pointer transition-colors
                   focus:outline-none focus:ring-2 focus:ring-cta/30"
        aria-label="Delete todo"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}
