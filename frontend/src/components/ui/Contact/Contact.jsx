import { useState } from 'react';
import Collapse from '@/components/ui/Collapse/Collapse.jsx';
import TextArea from '@/components/ui/TextArea/TextArea.jsx';
import './contact.scss';

function Contact() {
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <section className="contact__section" id="contact">
      <Collapse title="Contact">
        <form className="contact__section__form">
          <label htmlFor="name">Name :</label>
          <input type="text" name="name" id="name" autoComplete="off" />
          <label htmlFor="email">Email :</label>
          <input type="email" name="email" id="email" autoComplete="off" />
          <label htmlFor="message">Message :</label>
          <TextArea
            value={message}
            onChange={handleChange}
            name="message"
            id="message"
            rows="4"
            maxLength="500"
            className="contact__section__form__textarea-style"
          />
          <button className="contact__section__form__button" type="submit">
            Send
          </button>
        </form>
      </Collapse>
    </section>
  );
}

export default Contact;
