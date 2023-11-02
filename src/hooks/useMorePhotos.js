import { useQuery } from "@tanstack/react-query"
import { getMorePhotosData } from "../helpers/fetchActions"
import { useState } from "react"

export const useMorePhotos = (query, page) => {
    const [enabledMorePhotos, setEnabledMorePhotos] = useState(false)

    const morePhotosData = useQuery({
        queryKey: ["photos", query, page],
        queryFn: () => getMorePhotosData(query, page),
        enabled: enabledMorePhotos
    })

    return {
        morePhotosData,
        enabledMorePhotos,
        setEnabledMorePhotos
    }
}