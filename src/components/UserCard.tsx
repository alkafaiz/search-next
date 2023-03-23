import React from 'react';

interface UserCardProps {
    name: string;
    email: string;
}

function UserCard(props: UserCardProps) {
    const { name, email } = props;

    const getInitials = (name: string) => {
        const names = name.split(' ');
        return names[0].charAt(0) + names[1].charAt(0);
    };

    return (
        <div className="p-4  rounded-md bg-green-300 shadow-md flex justify-center flex-col items-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-2xl text-gray-600 dark:text-gray-300">{getInitials(name)}</span>
            </div>
            <h1 className='text-2xl font-bold my-2'>{name}</h1>
            <p>{email}</p>
        </div>
    );
}

export default UserCard;
