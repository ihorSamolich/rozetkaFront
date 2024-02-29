import {apiClient} from 'utils/api/apiClient.ts';
import {useQuery} from 'react-query';

const fetchAccountsCount = async ()=> {
    const response
        = await apiClient.get('/api/account/count');
    return response.data as {count: number};
};
export const useAccountsCount = () => {
    return  useQuery<{count: number}, Error>(
        'getAccountsCount',
        fetchAccountsCount,
        {
            staleTime: 30000,
        },
    );
};