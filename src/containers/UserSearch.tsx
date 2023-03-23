import Autocomplete from '@/components/Autocomplete';
import { useUsers } from '@/services/user';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

function UserSearch() {
    const router = useRouter();
    const listRef = useRef<HTMLUListElement>(null);

    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    // Queries
    const { data } = useUsers(value || '');

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // if the target element is not within the list, hide the list
            if (listRef.current && !listRef.current.contains(e.target as Node)) {
                setValue('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // remove listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (name: string) => {
        router.push(`/users/${name}`)
    };

    return (
        <div className="relative">
            <Autocomplete placeholder='e.g. "John"' value={value} onChange={handleChange} onFocus={handleChange} />
            <ul ref={listRef} className="bg-white rounded-md max-h-56 overflow-auto absolute w-96 top-14 shadow-md">
                {value &&
                    data?.data?.map((user) => (
                        <li
                            className="py-2 px-4 border-b hover:bg-green-300 hover:cursor-pointer"
                            key={user.id}
                            onClick={() => handleSelect(user.name)}
                        >
                            {user.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default UserSearch;
