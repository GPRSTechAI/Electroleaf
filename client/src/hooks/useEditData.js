import { useEffect, useState } from 'react';

const useEditData = (url, callback) => {

    useEffect(() => {
        if (!url) return
        const abortCont = new AbortController();
        fetch(process.env.REACT_APP_API_HOST + url, { signal: abortCont.signal })
            .then(res => {
                if (res.status !== 200 && res.status !== 304) {
                    throw Error('could not fetch data')
                }
                return res.json()
            })
            .then(data => {
                callback(data);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.log(err.message);
                }
            });
        return () => abortCont.abort();
    }, [url]);
}

export default useEditData;