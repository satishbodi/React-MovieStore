import Header from "../components/Header";
import Hero from "../components/Hero";
import NowPlaying from "../components/NowPlaying";
import Popular from "../components/Popular";
import TopRated from "../components/TopRated";
import Upcoming from "../components/Upcoming";

function Home() {
    return (
        <div>
            <Header />
            <Hero />
            <div style={{ marginRight: "30px", marginLeft: "30px" }}>
                <NowPlaying />
                <Upcoming />
                <Popular />
                <TopRated />
            </div>
        </div>
    );
}

export default Home;