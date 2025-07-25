import './about.scss';
import Contact from '@/components/ui/Contact/Contact.jsx';

function About() {
  return (
    <div className="about-page">
      <div className="about-page__content">
        <h1 className="about-page__content__title">About My Session :</h1>
        <p className="about-page__content__text">
          My Session is a website designed to help you plan your strength training sessions. I'm a junior developer, and
          My Session is my first personal project. It will continue to evolve as I learn and grow. Many new features are
          on the way, and my goal is to eventually include other sports as well. For now, I'm focusing on weight
          training because it's the sport I practice myself, and I wanted to build a tool that meets my own needs.
        </p>
      </div>
      <Contact />
    </div>
  );
}

export default About;
