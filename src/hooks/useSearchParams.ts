import { useEffect } from 'react';

import useDebounce from './useDebounce';

const useUrlState = (initialValue: string, key: string, time: number = 0): [string, string, React.Dispatch<string>] => {
  const [debounced, value, setValue] = useDebounce(initialValue, time);

  useEffect(() => {
    const initialSearch = new URLSearchParams(window.location.search);
    if (initialSearch.has(key)) {
      setValue(initialSearch.get(key));
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (debounced) {
      url.searchParams.set(key, debounced);
    } else {
      url.searchParams.delete(key);
    }

    window.history.pushState(null, null, url);
  }, [debounced]);

  return [debounced, value, setValue];
};

export default useUrlState;
