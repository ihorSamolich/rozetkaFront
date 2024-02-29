import {useQuery} from 'react-query';
import {apiClient} from 'utils/api/apiClient.ts';


const fetchProductsCount = async ()=> {
    const response
        = await apiClient.get('/api/products/count');
    return response.data as {count: number};
};
export const useProductsCount = () => {
    return  useQuery<{count: number}, Error>(
        'getProductsCount',
        fetchProductsCount,
        {
            staleTime: 30000,
        },
    );
};