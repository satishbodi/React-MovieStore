import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function ActorDetails() {
    const { id } = useParams();
    const actorDetailsUrl = `https://api.themoviedb.org/3/person/${id}?api_key=39d0cb9e523c82f8348e1a7d1bc15819&language=en-US`;
    const actorMoviesUrl = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=39d0cb9e523c82f8348e1a7d1bc15819&language=en-US`;
    const [actorDetails, setActorDetails] = useState([]);
    const [actorMovies, setActorMovies] = useState([]);
    const navigate = useNavigate();

    const fetchActoDetails = async () => {
        const res = await fetch(actorDetailsUrl);
        const d = await res.json();
        return setActorDetails(d);
    }

    const fetchActorMovies = async () => {
        const res = await fetch(actorMoviesUrl);
        const d = await res.json();
        return setActorMovies(d.cast);
    }

    useEffect(() => {
        fetchActoDetails();
        fetchActorMovies();
    }, []);

    const onItemClick = (id) => {
        navigate(`/details/${id}`)
        console.log(id)
    }

    return (
        <div>
            <Header />
            <div style={{ alignItems:"center", display:"flex", width: "fit-content", marginTop: "50px", marginLeft: "10%", marginRight: "10%" }}>
                <img alt="Image poster" src={`https://image.tmdb.org/t/p/w300${actorDetails.profile_path}`} />
                <div style={{ marginLeft: "20px" }} >
                    <h1 style={{ marginBottom: "50px" }}>{actorDetails.name}</h1>
                    <p>{actorDetails.biography}</p>
                    <p><i>Born on: {actorDetails.birthday}</i></p>
                    <p><i>Place of Birth: {actorDetails.place_of_birth}</i></p>
                </div>
            </div>

            <div style={{ marginTop: "100px", marginRight: "50px", marginLeft: "50px" }}>
                <h3>Movies</h3>
                <ScrollMenu>
                    {actorMovies.length &&
                        actorMovies.map((dataObj, index) => (
                            <div onClick={() => onItemClick(dataObj.id)} style={{ width: "200px", marginRight: "15px", backgroundColor: "#E8E8E8", paddingBottom: "5px", marginBottom: "30px" }} className={"row"} key={index}>
                                <img style={{ width: "200px", height: "300px" }} alt="Image poster" src={`https://image.tmdb.org/t/p/w200${dataObj.poster_path}`} />
                                <p style={{ height: "30px", marginLeft: "10px", marginRight: "10px" }}> <b>{dataObj.title}</b> <i>({dataObj.release_date.slice(0, 4)})</i></p>
                            </div>
                        ))
                    }
                </ScrollMenu>
            </div>
        </div>
    );
}

export default ActorDetails;