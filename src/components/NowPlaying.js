import { useEffect, useState } from "react"
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useNavigate } from "react-router-dom";

function NowPlaying() {
    const url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=39d0cb9e523c82f8348e1a7d1bc15819";
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchInfo = async () => {
        const res = await fetch(url);
        const d = await res.json();
        return setData(d.results);
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    if (!data.length) {
        return <div className="info"> There Is No Data</div>;
    }

    const onItemClick = (id) => {
        navigate(`/details/${id}`)
        console.log(id)
    }

    if (data.length) {
        return (
            <>
                <h3 style={{marginTop: "50px"}}>NowPlaying</h3>
                <ScrollMenu>
                    {data.length &&
                            data.map((dataObj, index) => (
                                <div onClick={() => onItemClick(dataObj.id)} style={{ width: "200px", marginRight:"15px",backgroundColor: "#E8E8E8", paddingBottom: "5px", marginBottom: "30px" }} className={"row"} key={index}>
                                    <img alt="Image poster" src={`https://image.tmdb.org/t/p/w200${dataObj.poster_path}`} />
                                    <p style={{ height: "30px", marginLeft: "10px", marginRight: "10px" }}> <b>{dataObj.title}</b></p>
                                </div>
                            ))
                    }
                </ScrollMenu>
            </>
        );
    }
}
export default NowPlaying