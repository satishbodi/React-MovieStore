import '../assets/styles/Header.css'

function Header() {
    return (
        <div className="header">
            <h2 style={{paddingRight:"30px"}}> Movie Store </h2>
            <input style={{ width: "300px", height: "30px" }}type="text" name="search" />
            <button style={{ marginLeft: "10px", wiidth: "50px", height: "30px", backgroundColor:"#0047AB", color:"#FFFFFF"}} type="submit" >Search</button>
        </div>
    );
}
export default Header