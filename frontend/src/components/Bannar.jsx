
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import p1 from '../assets/photo7.png'
import p2 from '../assets/photo2.png'
import p3 from '../assets/photo3.png'
import p4 from '../assets/phot4.png'
import p5 from '../assets/photo5.png'
import p6 from '../assets/photo6.webp'

const Bannar = () => {
    return (
        <div>
            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={p1} alt="Slide 1" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={p2} alt="Slide 2" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={p3} alt="Slide 3" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src={p4} alt="Slide 4" />
                    <p className="legend">Legend 4</p>
                </div>
                <div>
                    <img src={p5} alt="Slide 5" />
                    <p className="legend">Legend 5</p>
                </div>
                <div>
                    <img src={p6} alt="Slide 6" />
                    <p className="legend">Legend 6</p>
                </div>
            </Carousel>
        </div>
    );
};

export default Bannar;