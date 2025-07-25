import SessionList from '@/components/ui/SessionList/SessionList.jsx';
import Contact from '@/components/ui/Contact/Contact.jsx';

function Home() {
  return (
    <div className="home-page">
      <SessionList />
      <Contact />
    </div>
  );
}

export default Home;
