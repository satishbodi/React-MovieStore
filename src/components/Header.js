import '../assets/styles/Header.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function Header({ query }) {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const onItemClick = () => {
        console.log(search)
        if (search.length) {
            navigate(`/search/${search}`)
        }
    }

    const onTitleClick = () => {
        navigate(`/`)
    }

    return (
        <div className="header">
            <h1 onClick={() => onTitleClick() } style={{paddingRight:"30px"}}> Movie Store </h1>
            <input onChange={(e) => setSearch(e.target.value)} style={{ width: "500px", height: "30px" }} type="text" value= {query} name="search" />
            <button onClick={() => onItemClick()}  style={{ marginLeft: "10px", wiidth: "50px", height: "30px", backgroundColor:"#0047AB", color:"#FFFFFF"}} type="submit" >Search</button>
        </div>
    );
}
export default Header