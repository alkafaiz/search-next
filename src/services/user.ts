import { ENDPOINT } from '@/utils/constants';
import { Response } from '@/utils/interface';
import { useQuery } from 'react-query';

export async function getUsers(q = ''): Promise<Response> {
    const response = await fetch(`${ENDPOINT.user.href}?query=${q}`);
    return response.json();
}

export function useUsers(q = '') {
    return useQuery<Response>(['users', q], () => getUsers(q), {});
}
