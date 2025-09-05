import { FaEnvelope, FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import '../main/Home.css'
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="col">
          <div className="title">About</div>
          <div className="text">
            Voluptatem accusantium doloremque laudantium, totam rem aperiam...
          </div>
        </div>
        <div className="col">
          <div className="title">Contact</div>
          <div className="c-item">
            <FaLocationArrow />
            <div className="text">
              Kayaloram Rd, Punnamada, Kottankulangara, Alappuzha, Kerala, 688006
            </div>
          </div>
          <div className="c-item">
            <FaMobileAlt />
            <div className="text">Phone: 01009014597</div>
          </div>
          <div className="c-item">
            <FaEnvelope />
            <div className="text">Email: mohnud0987@gmail.com</div>
          </div>
        </div>
        <div className="col">
          <div className="title">Categories</div>
          <span className="text">Headphones</span>
          <span className="text">Smart Watches</span>
          <span className="text">Bluetooth Speakers</span>
          <span className="text">Wireless Earbuds</span>
          <span className="text">Home Theatre</span>
          <span className="text">Projectors</span>
        </div>
        <div className="col">
          <div className="title">Pages</div>
          <span className="text">Home</span>
          <span className="text">About</span>
          <span className="text">Privacy Policy</span>
          <span className="text">Returns</span>
          <span className="text">Terms & Conditions</span>
          <span className="text">Contact Us</span>
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-bar-content">
          <span className="text">
            M-A-K-E 2025 CREATED BY mahmoud. PREMIUM E-COMMERCE SOLUTIONS.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer
