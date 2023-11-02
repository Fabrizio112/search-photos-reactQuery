import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AppPhotosContainer, ButtonCategory, ButtonMorePhotos, ContainerPhotos, FavoritePhotosCategory, LoadingMoreText, LoadingText, Photo, PrincipalTitle, TitleResults } from "../assets/StyledComponents/Components";
import { doANewSearch, resultsSearch } from "../store/searchSlice";
import { usePhotos } from "../hooks/usePhotos";
import { useMorePhotos } from "../hooks/useMorePhotos";

function PhotosApp() {
    const dispatch = useDispatch()
    const search = useSelector(state => state.search)
    const [searchBar, setSearchBar] = useState("")
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)

    /*  const [getPhotos, { data: photos, isLoading: photosLoading, isFetching: photosFetching }] = useLazyGetPhotosQuery()
     const [getMorePhotos, { data: morePhotos, isLoading: morePhotosLoading, isFetching: morePhotosFetching }] = useLazyGetMorePhotosQuery()
  */
    const { photosData, setEnabledData } = usePhotos(query)
    const { morePhotosData, setEnabledMorePhotos } = useMorePhotos(query, page)
    useEffect(() => {
        if (page != 1) {
            setEnabledMorePhotos(true)
        }
    }, [page])

    useEffect(() => {
        if (query === "") return
        setPage(1)

    }, [query])

    useEffect(() => {
        if (photosData.data && page === 1) {
            dispatch(doANewSearch(photosData.data.hits))
        }
    }, [photosData.data])

    useEffect(() => {
        if (morePhotosData.data && page != 1) {
            dispatch(resultsSearch(morePhotosData.data.hits))
        }
    }, [morePhotosData.data])

    const handleSearchBar = (e) => {
        setSearchBar(e.target.value)
    }
    const handleQuery = () => {
        setQuery(searchBar)
        setEnabledData(true)
    }
    const handleChangeQuery = (e) => {
        setQuery(e.target.innerText)
        setEnabledData(true)
    }
    const handleViewMore = () => {
        setPage(page + 1)
    }
    return (
        <>
            <AppPhotosContainer >
                <PrincipalTitle>Photos App </PrincipalTitle>
                <SearchBar handleSearchBar={handleSearchBar} searchBar={searchBar} handleQuery={handleQuery} />
                <FavoritePhotosCategory className="favorites-categories">
                    <ButtonCategory onClick={handleChangeQuery}>Food</ButtonCategory>
                    <ButtonCategory onClick={handleChangeQuery}>Technology</ButtonCategory>
                    <ButtonCategory onClick={handleChangeQuery}>Clothes</ButtonCategory>
                    <ButtonCategory onClick={handleChangeQuery}>Social Media</ButtonCategory>
                </FavoritePhotosCategory>
                <TitleResults>Results for {query} :</TitleResults>
                <ContainerPhotos>
                    {search.length > 0 && search.map(photo => <Photo key={photo.id} src={photo.webformatURL} alt={photo.tags} />)}
                    {photosData.isFetching && <LoadingText>Loading images ...</LoadingText>}
                    {morePhotosData.isFetching && <LoadingMoreText>Loading more images ...</LoadingMoreText>}
                </ContainerPhotos>
                {query != "" && <ButtonMorePhotos onClick={handleViewMore}>View More</ButtonMorePhotos>}
            </AppPhotosContainer>
        </>);
}

export default PhotosApp;