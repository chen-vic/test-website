import { useState, type KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onAdd: (text: string) => Promise<void> | void;
  disabled?: boolean;
}

export default function TodoInput({ onAdd, disabled }: Props) {
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const text = value.trim();
    if (!text || submitting) return;
    setSubmitting(true);
    try {
      await onAdd(text);
      setValue('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const isDisabled = disabled || submitting;

  return (
    <div className="flex gap-3 items-stretch">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder="What needs to be done?"
        disabled={isDisabled}
        className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg
                   text-ink placeholder:text-muted/70
                   focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                   transition-colors disabled:opacity-60"
        aria-label="New todo text"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isDisabled || !value.trim()}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg
                   bg-cta hover:bg-cta-hover text-white font-semibold
                   transition-colors cursor-pointer
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-cta/40"
      >
        <Plus size={18} strokeWidth={2.5} />
        <span>Add</span>
      </button>
    </div>
  );
}
