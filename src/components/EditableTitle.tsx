import { useEffect, useRef, useState } from 'react';

interface EditableTitleProps {
    initialValue: string;
    submitHandler: (title: string) => void;
}

const EditableTitle = ({
    initialValue,
    submitHandler,
    ...props
}: EditableTitleProps) => {
    const [title, setTitle] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title !== initialValue) {
            submitHandler(title);
        }
        setIsEditing(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            formRef.current &&
            !formRef.current.contains(event.target as Node)
        ) {
            setIsEditing(false);
            setTitle(initialValue);
        }
    };

    useEffect(() => {
        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing]);

    if (isEditing) {
        return (
            <form
                className="h-full rounded-xl bg-gray-100"
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <input
                    className="w-full p-2 outline-none rounded-lg shadow-md bg-white"
                    type="text"
                    ref={inputRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </form>
        );
    }

    return (
        <p className="p-2 rounded-lg" onClick={enableEditing} {...props}>
            {title}
        </p>
    );
};

export default EditableTitle;
