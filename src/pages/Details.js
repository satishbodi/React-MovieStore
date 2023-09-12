import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useNavigate } from "react-router-dom";

function Details() {
    const { id } = useParams();
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=39d0cb9e523c82f8348e1a7d1bc15819&language=en-US`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=39d0cb9e523c82f8348e1a7d1bc15819&language=en-US`;
    const similarUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=39d0cb9e523c82f8348e1a7d1bc15819&language=en-US`;
    const [data, setData] = useState([]);
    const [credits, setCredits] = useState([]);
    const [simiilar, setSimilar] = useState([]);
    const navigate = useNavigate();

    const fetchMovieInfo = async () => {
        const res = await fetch(url);
        const d = await res.json();
        return setData(d);
    }

    const fetchCreditsInfo = async () => {
        const res = await fetch(creditsUrl);
        const d = await res.json();
        const result =  d.cast.filter(item => 
            item.known_for_department == "Acting"
        )
        return setCredits(result);
    }

    const fetchSimilarInfo = async () => {
        const res = await fetch(similarUrl);
        const d = await res.json();
        return setSimilar(d.results);
    }

    useEffect(() => {
        fetchMovieInfo();
        fetchCreditsInfo();
        fetchSimilarInfo();
    }, []);

    const onItemClick = (id) => {
        navigate(`/details/${id}`)
        console.log(id)
    }

    return (
        <div>
            <img alt="Image poster" style={{ width: "100%", height: "400px", objectFit: "cover" }} src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} />
            <div style={{ alignItems:"center", display:"flex", width: "fit-content", marginTop: "50px", marginLeft: "10%", marginRight: "10%" }}>
                <img alt="Image poster" src={`https://image.tmdb.org/t/p/w300${data.poster_path}`} />
                <div style={{ marginLeft: "20px" }} >
                    <h1 style={{ marginBottom: "50px" }}>{data.original_title}</h1>
                    <p>{data.overview}</p>
                    <p><i>Released on {data.release_date}</i></p>
                </div>
            </div>

            <div style={{ marginTop: "100px", marginRight: "50px", marginLeft: "50px" }}>
                <h3>Cast</h3>
                <ScrollMenu>
                    {credits.length &&
                        credits.map((dataObj, index) => (
                            //if (dataObj.known_for_department=="Acting") {
                            <div style={{ width: "200px", marginRight: "15px", backgroundColor: "#E8E8E8", paddingBottom: "5px", marginBottom: "30px" }} className={"row"} key={index}>
                                <img alt="Image poster" src={`https://image.tmdb.org/t/p/w200${dataObj.profile_path}`} />
                                <p style={{ height: "30px", marginLeft: "10px", marginRight: "10px" }}> <b>{dataObj.name}</b> as <i>{dataObj.character}</i></p>
                        </div>
                            //}
                        ))
                    }
                </ScrollMenu>
            </div>

            <div style={{ marginTop: "100px", marginRight: "50px", marginLeft: "50px" }}>
                <h3>Similar</h3>
                <ScrollMenu>
                    {simiilar.length &&
                        simiilar.map((dataObj, index) => (
                            <div onClick={() => onItemClick(dataObj.id)} style={{ width: "200px", marginRight: "15px", backgroundColor: "#E8E8E8", paddingBottom: "5px", marginBottom: "30px" }} className={"row"} key={index}>
                                <img alt="Image poster" src={`https://image.tmdb.org/t/p/w200${dataObj.poster_path}`} />
                                <p style={{ height: "30px", marginLeft: "10px", marginRight: "10px" }}> <b>{dataObj.title}</b></p>
                            </div>
                        ))
                    }
                </ScrollMenu>
            </div>

        
        </div>
    );
}

export default Details;