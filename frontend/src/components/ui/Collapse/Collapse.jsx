import { useState } from 'react';
import '@/components/ui/Collapse/collapse.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

function Collapse({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapse">
      <div className="collapse__header" onClick={toggleCollapse}>
        <h2>{title}</h2>
        <button>
          <FontAwesomeIcon icon={faChevronUp} className={`arrow-icon ${isOpen ? 'rotated' : ''}`} />
        </button>
      </div>
      <div className={`collapse__content ${isOpen ? 'open' : ''}`}>{children}</div>
    </div>
  );
}

export default Collapse;
