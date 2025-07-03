import { useState } from 'react';
import './sessionlist.scss';
import Session from '../Session/Session.jsx';

/*const mockSessions = [
  {
    id: 1,
    name: 'Séance Full Body',
    exercises: [
      { id: 1, name: 'Développé couché', sets: 4, reps: 10, weight: 80, rest: 90 },
      {
        id: 2,
        name: 'Squat',
        sets: 3,
        reps: 12,
        weight: 100,
        rest: 120,
        note: 'Ceci est une information sur cet exercice',
      },
      {
        id: 3,
        name: 'Squat',
        sets: 3,
        reps: 12,
        weight: 100,
        rest: 120,
        note: 'Ceci est une information sur cet exercice',
      },
      {
        id: 4,
        name: 'Squat',
        sets: 3,
        reps: 12,
        weight: 100,
        rest: 120,
        note: 'Ceci est une information',
      },
      {
        id: 5,
        name: 'Fentes',
        sets: 3,
        reps: 12,
        weight: 100,
        rest: 120,
        note: 'Ceci est une information sur cet exercice mais elle est gavée longue pour rien',
      },
      {
        id: 6,
        name: 'Fentes',
        sets: 3,
        reps: 12,
        weight: 100,
        rest: 120,
        note: 'Ceci est une information sur cet exercice mais elle est gavée longue pour rien',
      },
      {
        id: 7,
        name: 'Fentes',
        sets: 3,
        reps: 12,
        weight: 100,
        rest: 120,
        note: 'Ceci est une information sur cet exercice mais elle est gavée longue pour rien',
      },
      {
        id: 8,
        name: 'Fentes',
        sets: 3,
        reps: 12,
        weight: 100,
        rest: 120,
        note: 'Ceci est une information sur cet exercice mais elle est gavée longue pour rien',
      },
    ],
  },
];*/

function SessionList() {
  const [sessions, setSessions] = useState([]);

  const handleAddSession = () => {
    const newSession = {
      id: Date.now(),
      name: 'New session',
      exercises: [],
    };
    setSessions([...sessions, newSession]);
  };

  return (
    <div className="session-list">
      <h1 className="session-list__title">All Sessions :</h1>

      <button onClick={handleAddSession}>Add session</button>

      <div className="session-list__grid">
        {sessions.map((session) => (
          <Session key={session.id} name={session.name} exercises={session.exercises} />
        ))}
      </div>
    </div>
  );
}

export default SessionList;
