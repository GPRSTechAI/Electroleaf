import { useEffect, useState } from 'react';

const useIntervalFetch = (url, interval = 1000) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const abortCont = new AbortController();

    const sendRequest = () => {
        if (!url) return
        fetch(process.env.REACT_APP_API_HOST + url, { signal: abortCont.signal })
            .then(res => {
                if (res.status !== 200 && res.status !== 304) {
                    throw Error('could not fetch data')
                }
                return res.json()
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setIsLoading(false);
                    setError(err.message);
                }
            });
    }

    useEffect(() => {

        sendRequest()
        const intervalId = setInterval(sendRequest, interval)
        return () => {
            clearInterval(intervalId);
            abortCont.abort();
        }
    }, [url]);

    return [data, isLoading, error]
}

export default useIntervalFetch;