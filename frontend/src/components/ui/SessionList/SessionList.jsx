import Session from '../Session/Session.jsx';

const mockSessions = [
  {
    id: 1,
    name: 'Séance Full Body',
    exercises: [
      { id: 1, name: 'Développé couché', sets: 4, reps: 10, weight: 80, rest: 90 },
      { id: 2, name: 'Squat', sets: 3, reps: 12, weight: 100, rest: 120 },
    ],
  },
  {
    id: 2,
    name: 'Séance Cardio',
    exercises: [{ id: 3, name: 'Course à pied', sets: 1, reps: 1, weight: 0, rest: 0 }],
  },
];

function SessionList() {
  return (
    <div>
      {mockSessions.map((session) => (
        <Session key={session.id} {...session} />
      ))}
    </div>
  );
}

export default SessionList;
