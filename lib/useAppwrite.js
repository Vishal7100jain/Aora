import { useEffect, useState } from "react"

export const useAppwrite = (fn) => {
    const [Data, setData] = useState([])
    const [isloading, setisloading] = useState(true)

    const fetchData = async () => {
        setisloading(true)
        try {
            const result = await fn()
            setData(result)
        } catch (error) {
            Alert.alert("Error", err.message)
        } finally {
            setisloading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const reFetch = () => fetchData()
    return { Data, reFetch, isloading }
}