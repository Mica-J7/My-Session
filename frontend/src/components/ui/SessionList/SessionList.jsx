import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './sessionlist.scss';
import Session from '../Session/Session.jsx';
import SessionCreator from '../Modals/SessionCreator.jsx';
import ExerciseCreator from '../Modals/ExerciseCreator.jsx';

function SessionList() {
  const [sessions, setSessions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [sessionToEdit, setSessionToEdit] = useState(null);
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  const buttonRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const MODAL_HEIGHT = 200;

  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem('token');
      if (!token) return; // Si pas connecté, on ne fetch pas

      try {
        const res = await fetch('http://localhost:3000/api/sessions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Unauthorized');
        }

        const data = await res.json();
        setSessions(data.sessions);
      } catch (error) {
        console.error('Error during session fetch :', error);
      }
    };

    fetchSessions();
  }, []);

  const openSessionModal = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.top + rect.height / 2 - MODAL_HEIGHT / 2 + window.scrollY,
        left: rect.left + rect.width + 16, // 16px de marge vers la droite
      });
    }
    setModalIsOpen(true);
  };

  const editSessionModal = (sessionId, session) => {
    setSelectedSessionId(sessionId); // si on s'en sert ailleurs
    setSessionToEdit(session); // pour pré-remplir le formulaire
    setEditingSession(true); // mode "édition"
    setModalIsOpen(true); // on affiche la modale
  };

  const handleOpenExerciseModal = (sessionId) => {
    setSelectedSessionId(sessionId);
    setExerciseModalOpen(true);
  };

  const handleEditExerciseModal = (sessionId, exercise) => {
    setSelectedSessionId(sessionId);
    setExerciseToEdit(exercise);
    setExerciseModalOpen(true);
  };

  const handleAddSession = (newSessionFromApi) => {
    setSessions([...sessions, newSessionFromApi]);
    setModalIsOpen(false);
  };

  const handleEditSession = async (updatedSessionData) => {
    try {
      const res = await fetch(`http://localhost:3000/api/sessions/${updatedSessionData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedSessionData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Actualiser localement la liste de sessions
      setSessions((prev) => prev.map((s) => (s._id === data.session._id ? data.session : s)));

      setModalIsOpen(false);
      setSessionToEdit(null);
      setEditingSession(false);
    } catch (err) {
      console.error('Session update failed :', err.message);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Suppression failed');
      }
      console.log(data.message);
      setSessions((prev) => prev.filter((session) => session._id !== sessionId));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddExercise = (sessionId, exerciseData) => {
    const updatedSessions = sessions.map((session) => {
      if (session._id === sessionId) {
        return {
          ...session,
          exercises: [...session.exercises, exerciseData],
        };
      }
      return session;
    });

    setSessions(updatedSessions);
  };

  const handleUpdateExercise = (sessionId, updatedExercise) => {
    const updatedSessions = sessions.map((session) => {
      if (session._id === sessionId) {
        return {
          ...session,
          exercises: session.exercises.map((ex) => (ex._id === updatedExercise._id ? updatedExercise : ex)),
        };
      }
      return session;
    });
    setSessions(updatedSessions);
  };

  const handleDeleteExercise = async (sessionId, exerciseId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/exercises/${exerciseId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Suppression failed.');
      }
      console.log(data.message);
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session._id === sessionId
            ? { ...session, exercises: session.exercises.filter((ex) => ex._id !== exerciseId) }
            : session,
        ),
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="session-list">
      <h1 className="session-list__title">All sessions :</h1>

      <div className="session-list__grid">
        {sessions.map((session) => (
          <Session
            key={session._id}
            session={session}
            onEditSession={editSessionModal}
            onDeleteSession={handleDeleteSession}
            onAddExercise={handleAddExercise}
            onOpenExerciseModal={handleOpenExerciseModal}
            onEditExercise={handleEditExerciseModal}
            onDeleteExercise={handleDeleteExercise}
          />
        ))}

        <button ref={buttonRef} className="session-list__button" onClick={openSessionModal}>
          <FontAwesomeIcon icon={faPlus} className="session-list__button--icon" />
          <span>New session</span>
        </button>

        <SessionCreator
          isOpen={modalIsOpen}
          onRequestClose={() => {
            setModalIsOpen(false);
            setSessionToEdit(null);
            setEditingSession(false);
          }}
          onCreate={handleAddSession}
          onEditSession={handleEditSession}
          mode={editingSession ? 'edit' : 'create'}
          initialSessionData={sessionToEdit}
          position={modalPosition}
        />

        <ExerciseCreator
          isOpen={exerciseModalOpen}
          onRequestClose={() => {
            setExerciseModalOpen(false);
            setExerciseToEdit(null);
          }}
          onCreate={handleAddExercise}
          onUpdate={handleUpdateExercise}
          sessionId={selectedSessionId}
          mode={exerciseToEdit ? 'edit' : 'create'}
          initialExerciseData={exerciseToEdit}
        />
      </div>
    </div>
  );
}

export default SessionList;
