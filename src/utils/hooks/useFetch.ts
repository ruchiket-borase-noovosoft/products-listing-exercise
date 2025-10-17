import {useEffect, useState} from "react";
import type {RequestType} from "../api.ts";

export default function useFetch<T>(request : RequestType){
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>(null);
    const [data, setData] = useState<T>(null);

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
        catch(error:any){
            setError(error.message || "Error Occurred")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleFetch()
        },[])

    return {data, loading, error, handleFetch}
}