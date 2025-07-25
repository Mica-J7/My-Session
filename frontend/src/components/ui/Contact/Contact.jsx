import './contact.scss';

function Contact() {
  return (
    <section className="contact__section" id="contact">
      <h2>Contact :</h2>
      <form className="contact__section__form">
        <label for="name">Name :</label>
        <input type="text" name="name" id="name" autocomplete="off" />
        <label for="email">Email :</label>
        <input type="email" name="email" id="email" autocomplete="off" />
        <label for="message">Message :</label>
        <textarea name="message" id="message" cols="30" rows="5" />
        <button className="contact__section__form__button" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}

export default Contact;
