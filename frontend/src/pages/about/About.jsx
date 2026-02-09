import React from "react";
import "./about.css";
import aboutImg from "../../assets/about-img.jpg";

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        {/* Left content */}
        <div className="about-content">
          <h2>About Us</h2>
          <p className="tagline">
            Learn smarter. Grow faster. Build your future.
          </p>

           <p>
  We are an e-learning platform committed to making high-quality education
  accessible to everyone, regardless of background or experience level.
  Our courses are thoughtfully designed by industry experts and experienced
  educators to bridge the gap between theory and real-world application.
  Through structured lessons, hands-on projects, and practical examples,
  we help learners build strong foundations, gain confidence, and develop
  job-ready skills. Our flexible learning approach allows students to learn
  at their own pace while staying aligned with current industry trends,
  empowering them to achieve their academic and career goals effectively.
</p>

          <div className="about-features">
            <div className="feature">🎓 Expert-Led Courses</div>
            <div className="feature">📚 Practical Learning</div>
            <div className="feature">⏰ Learn at Your Own Pace</div>
            <div className="feature">🚀 Career-Focused Skills</div>
          </div>
        </div>

        {/* Right image */}
        <div className="about-image">
          <img src={aboutImg} alt="Online Learning" />
        </div>
      </div>
    </div>
  );
};

export default About;
