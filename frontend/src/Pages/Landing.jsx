import { Link } from "react-router-dom";
import bg from "../assets/chemistry-hero.png";

export default function Landing() {
  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="landing-overlay">

        <div className="landing-content">

          <h1>Chemical Calculator</h1>

          <h3>Your Ultimate Chemistry Toolkit</h3>

          <p>
            Instantly calculate molarity, dilutions, pH,
            and molar mass with ease.
          </p>

          <div className="landing-buttons">

            <Link to="/register">
              <button className="primary-btn">
                Get Started
              </button>
            </Link>

            <Link to="/login">
              <button className="secondary-btn">
                Login
              </button>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}