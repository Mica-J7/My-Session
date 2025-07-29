import './about.scss';
import Contact from '@/components/ui/Contact/Contact.jsx';

function About() {
  return (
    <div className="about-page">
      <div className="about-page__content">
        <h2 className="about-page__content__title">About My Session :</h2>
        <p className="about-page__content__text">
          My Session is a website designed to help you plan your strength training sessions. I'm a junior developer, and
          My Session is my first personal project. It will continue to evolve as I learn and grow. Many new features are
          on the way, and my goal is to eventually include other sports as well. For now, I'm focusing on weight
          training because it's the sport I practice myself, and I wanted to build a tool that meets my own needs.
        </p>
        <p className="about-page__content__text">
          Feel free to contact me using the form at the bottom of the page for any questions or suggestions to improve
          the site.
        </p>
        <p className="about-page__content__text">
          <strong>And otherwise, thank you for using My Session ! Have a great workout !</strong>
        </p>
      </div>
      <Contact />
    </div>
  );
}

export default About;
