import {useState} from "react";

function useFetch<T>(){
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>(null)
    const [data, setData] = useState<T>(null)
}