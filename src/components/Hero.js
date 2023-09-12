import '../assets/styles/Hero.css'
import SimpleImageSlider from "react-simple-image-slider";

function Hero() {
    const images = [
        { url: "https://image.tmdb.org/t/p/original/d8duYyyC9J5T825Hg7grmaabfxQ.jpg" },
        { url: "https://image.tmdb.org/t/p/original/zZDkgOmFMVYpGAkR9Tkxw0CRnxX.jpg" },
        { url: "https://image.tmdb.org/t/p/original/itH1Wlzwf6yTNa7fVkYMVUwXlhR.jpg" },
    ];
    return (
        <div className="hero">
            <SimpleImageSlider
                width={"100%"}
                height={500}
                images={images}
                showBullets={true}
                showNavs={true}
                loop={true}
                autoPlay={true}
            />
        </div>
    )
}
export default Hero