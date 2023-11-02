import { useQuery } from "@tanstack/react-query"
import { getPhotosData } from "../helpers/fetchActions"
import { useState } from "react"

export const usePhotos = (query) => {
    const [enabledData, setEnabledData] = useState(false)

    const photosData = useQuery({
        queryKey: ["photos", query],
        queryFn: () => getPhotosData(query),
        enabled: enabledData
    })

    return {
        photosData,
        enabledData,
        setEnabledData
    }
}