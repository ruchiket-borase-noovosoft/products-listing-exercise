import {useCallback, useEffect, useState} from "react";
import type {RequestType} from "../api.ts";

interface options {
    select?: (result: unknown) => unknown,
    onSuccess?: (result: unknown) => unknown
}

export default function useFetch<T>(key: unknown[], queryFn: () => Promise<unknown>, options: options = {}){
    const {select, onSuccess}  = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleFetch = useCallback(async () => {
        setLoading(true)
        setError("")
        try{
            const result = await queryFn();

            const resultData = select ?  await select(result) : result;
            setData(resultData);

            if(onSuccess){
                onSuccess(resultData)
            }
        }
        catch (err) {
            setError(err)
        }
        finally {
            setLoading(false)
        }
    },[key, queryFn])

    useEffect(() => {
        handleFetch()
    },[JSON.stringify(key)])

    return {data, setData, loading, error, refetch:handleFetch}
}

function useFetchv0<T>(request? : RequestType, dependencies : unknown[] = []){
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);
    const [data, setData] = useState<T>();

    if(!request) return;

    const handleFetch = async () => {
        setLoading(true);
        try{
            const [url, method]  = request;
            const config = {
                method,
                headers: { 'Content-Type': 'application/json' }
            }
            const response = await fetch(url, config);
            const json = await response.json();
            setData(json);
        }
        catch(error){
            setError(error.message || "Error Occurred")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleFetch()
    },dependencies)

    return {data, loading, error, handleFetch}
}