import { useEffect, useId, useMemo, useRef, useState } from 'react';
import './Listbox.style.css';

export type ListboxOption<T extends string> = {
    value: T;
    label: string;
};

type Props<T extends string> = {
    label: string;
    value: T;
    options: Array<ListboxOption<T>>;
    onChange: (next: T) => void;
    hint?: string;
    'data-testid'?: string;
};

export function Listbox<T extends string>({
    label,
    value,
    options,
    onChange,
    hint,
    'data-testid': testId,
}: Props<T>) {
    const baseId = useId();
    const buttonId = `${baseId}-button`;
    const listId = `${baseId}-list`;
    const labelId = `${baseId}-label`;
    const hintId = hint ? `${baseId}-hint` : undefined;

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    const [open, setOpen] = useState(false);

    const selectedIndex = useMemo(() => {
        const idx = options.findIndex((o) => o.value === value);
        return idx >= 0 ? idx : 0;
    }, [options, value]);

    const [activeIndex, setActiveIndex] = useState(selectedIndex);

    const selected = useMemo(() => {
        return options[selectedIndex] ?? options[0];
    }, [options, selectedIndex]);

    // Close on outside click; return focus to button (a11y)
    useEffect(() => {
        if (!open) return;

        const onDocPointerDown = (e: PointerEvent) => {
            const target = e.target as Node;
            if (buttonRef.current?.contains(target)) return;
            if (listRef.current?.contains(target)) return;
            setOpen(false);
            buttonRef.current?.focus();
        };

        document.addEventListener('pointerdown', onDocPointerDown);
        return () => document.removeEventListener('pointerdown', onDocPointerDown);
    }, [open]);

    // hen opening: focus listbox so keyboard handlers work
    useEffect(() => {
        if (!open) return;
        // wait for <ul> to mount
        queueMicrotask(() => listRef.current?.focus());
    }, [open]);

    // Keep active option in view
    useEffect(() => {
        if (!open) return;
        const el = document.getElementById(optionId(baseId, activeIndex));
        el?.scrollIntoView({ block: 'nearest' });
    }, [open, activeIndex, baseId]);

    const commit = (idx: number) => {
        const next = options[idx];
        if (!next) return;

        onChange(next.value);
        setOpen(false);
        buttonRef.current?.focus();
    };

    const openList = () => {
        setActiveIndex(selectedIndex);
        setOpen(true);
    };

    const toggleList = () => {
        setOpen((prev) => {
            const next = !prev;
            if (next) setActiveIndex(selectedIndex);
            return next;
        });
    };

    const onButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            openList();
            return;
        }

        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleList();
        }
    };

    const onListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            setOpen(false);
            buttonRef.current?.focus();
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, options.length - 1));
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
            return;
        }

        if (e.key === 'Home') {
            e.preventDefault();
            setActiveIndex(0);
            return;
        }

        if (e.key === 'End') {
            e.preventDefault();
            setActiveIndex(options.length - 1);
            return;
        }

        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            commit(activeIndex);
        }
    };

    return (
        <div className={`lb${open ? ' is-open' : ''}`}>
            <span className='lb__label' id={labelId}>
                {label}
                {hint && (
                    <span className='lb__hint' id={hintId}>
                        {hint}
                    </span>
                )}
            </span>

            <div className='lb__wrap'>
                <button
                    ref={buttonRef}
                    id={buttonId}
                    type='button'
                    className='lb__button'
                    aria-haspopup='listbox'
                    aria-expanded={open}
                    aria-controls={listId}
                    aria-labelledby={labelId}
                    aria-describedby={hintId}
                    onClick={toggleList}
                    onKeyDown={onButtonKeyDown}
                    data-testid={testId}
                >
                    <span className='lb__value'>{selected?.label}</span>
                    <span className='lb__chev' aria-hidden='true' />
                </button>

                {open && (
                    <ul
                        ref={listRef}
                        id={listId}
                        className='lb__list'
                        role='listbox'
                        aria-labelledby={labelId}
                        tabIndex={0}
                        aria-activedescendant={optionId(baseId, activeIndex)}
                        onKeyDown={onListKeyDown}
                    >
                        {options.map((opt, idx) => {
                            const isSelected = opt.value === value;
                            const isActive = idx === activeIndex;

                            return (
                                <li
                                    key={opt.value}
                                    id={optionId(baseId, idx)}
                                    role='option'
                                    aria-selected={isSelected}
                                    className={`lb__option${isSelected ? ' is-selected' : ''}${
                                        isActive ? ' is-active' : ''
                                    }`}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => commit(idx)}
                                >
                                    <span className='lb__option-label'>{opt.label}</span>
                                    {isSelected && (
                                        <span className='lb__check' aria-hidden='true'>
                                            ✓
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

function optionId(baseId: string, index: number) {
    return `${baseId}-opt-${index}`;
}
