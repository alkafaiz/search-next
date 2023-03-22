import Autocomplete from '@/components/Autocomplete';
import { Response } from '@/utils/interface';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

async function getUsers(q = '') {
    const response = await fetch(`https://fetest.mashx.click/api/users?query=${q}`);
    return response.json();
}

function useUsers(q = '') {
    return useQuery<Response>(['users', q], () => getUsers(q), {});
}

function UserSearch() {
    const textRef = useRef<HTMLInputElement>(null);
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

    return (
        <div className='relative'>
            <Autocomplete placeholder='e.g. "John"' onChange={handleChange} onFocus={handleChange} ref={textRef}/>
            <ul ref={listRef} className="bg-white rounded-md max-h-56 overflow-auto absolute w-96 top-14 shadow-md">
                {value && data?.data?.map((user) => (
                    <li className="py-2 px-4 border-b hover:bg-green-300 hover:cursor-pointer" key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserSearch;
