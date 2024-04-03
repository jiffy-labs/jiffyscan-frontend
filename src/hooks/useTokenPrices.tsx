import useSWR from 'swr';

const fetcher = async (url : string) => {
  const response = await fetch(url, {
    headers: {
      'x-api-key': 'TestAPIKeyDontUseInCode',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch token prices');
  }
  return response.json();
};

export function useTokenPrices() {
  const { data, error } = useSWR('https://api.jiffyscan.xyz/v0/getPrices', fetcher, {
    refreshInterval: 300000, // 5 mins
    onSuccess: (data) => {
      localStorage.setItem('tokenPrices', JSON.stringify(data));
    },
  });

  return {
    tokenPrices: data,
    isLoading: !error && !data,
    isError: error,
  };
}
