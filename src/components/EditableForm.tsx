import React, { useState, useRef, useEffect } from 'react';
import CloseIcon from '../assets/CloseIcon';
import PlusIcon from '../assets/PlusIcon';

interface EditableFormProps {
    submitHandler: (title: string) => void;
    placeholder: string;
    buttonText: string;
}

const EditableForm: React.FC<EditableFormProps> = ({
    placeholder,
    submitHandler,
    buttonText,
}) => {
    const [title, setTitle] = useState('');
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

    const disableEditing = () => {
        setIsEditing(false);
        setTitle('');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title !== '') {
            submitHandler(title);
            setTitle('');
        }
        setIsEditing(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            formRef.current &&
            !formRef.current.contains(event.target as Node)
        ) {
            setIsEditing(false);
            setTitle('');
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
            <form className="h-full" ref={formRef} onSubmit={handleSubmit}>
                <input
                    className="w-full p-2 outline-none rounded-lg shadow-md bg-white"
                    type="text"
                    placeholder={placeholder}
                    ref={inputRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                    <button
                        className="py-1 px-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        type="submit"
                    >
                        {buttonText}
                    </button>
                    <button
                        className="p-1 hover:bg-gray-200"
                        onClick={disableEditing}
                    >
                        <CloseIcon />
                    </button>
                </div>
            </form>
        );
    }

    return (
        <button
            className="h-full p-2 flex gap-2 rounded-lg bg-white/25"
            onClick={enableEditing}
        >
            <PlusIcon />
            {buttonText}
        </button>
    );
};

export default EditableForm;
