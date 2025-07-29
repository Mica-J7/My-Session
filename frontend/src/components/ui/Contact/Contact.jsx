import './contact.scss';

function Contact() {
  return (
    <section className="contact__section" id="contact">
      <h2>Contact :</h2>
      <form className="contact__section__form">
        <label htmlFor="name">Name :</label>
        <input type="text" name="name" id="name" autoComplete="off" />
        <label htmlFor="email">Email :</label>
        <input type="email" name="email" id="email" autoComplete="off" />
        <label htmlFor="message">Message :</label>
        <textarea name="message" id="message" cols="30" rows="5" />
        <button className="contact__section__form__button" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}

export default Contact;
