import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useNavigate } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import '../assets/styles/Search.css'
import Header from "../components/Header";

function Search() {

    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=39d0cb9e523c82f8348e1a7d1bc15819&language=en-US`;

    const fetchSearchResults = async () => {
        let url = `${searchUrl}&page=${currentPage}`
        const res = await fetch(url);
        const d = await res.json();
        if (searchResults.length >0) {
            setSearchResults(oldArray => [...oldArray, d.results])
        } else {
            setSearchResults(d.results)
        }
    }

    useEffect(() => {
        fetchSearchResults();
    }, []);

    useEffect(() => {
        fetchSearchResults();
    }, [currentPage]);

    const onItemClick = (id) => {
        navigate(`/details/${id}`)
        console.log(id)
    }

    const fetchMoreResults = () => {
        setCurrentPage(currentPage + 1)
    }

    return (
        <div>
            <Header query={query}/>
            <div style={{ marginTop: "100px", marginRight: "50px", marginLeft: "50px" }}>
                <h3>Movies results for: {query}</h3>
                <InfiniteScroll
                    dataLength={searchResults.length}
                    next={() => fetchMoreResults()}
                    hasMore={true}>
                    
                    <div className="image-grid" style={{ marginTop: "30px" }}>
                        {searchResults.length &&
                        searchResults.map((dataObj, index) => (
                            <div onClick={() => onItemClick(dataObj.id)} style={{ width: "200px", marginRight: "15px", backgroundColor: "#E8E8E8", paddingBottom: "5px", marginBottom: "30px" }} className={"row"} key={index}>
                                <img style={{ width: "200px", height: "300px" }} alt="Image poster" src={`https://image.tmdb.org/t/p/w200${dataObj.poster_path}`} />
                                <p style={{ height: "30px", marginLeft: "10px", marginRight: "10px" }}> <b>{dataObj.title}</b> </p>
                            </div>
                        ))
                    }
                    </div>

                </InfiniteScroll>
            </div>
        </div>
    );
}

export default Search;