'use client';
import React, { useState, useEffect } from 'react';
import { FaBell, FaRegClock, FaTrashAlt } from 'react-icons/fa';
import './page.css';

interface Notification {
  id: string;
  message: string;
  time: string;
}

const Notificacoes: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // criar notificacao e mandar pro localstorage pra salvar
  useEffect(() => {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      
      const initialNotifications = [
        { id: '1', message: 'Beber Água', time: '14:20' },
        { id: '2', message: 'Alongamento', time: '15:00' },
      ];
      setNotifications(initialNotifications);
      localStorage.setItem('notifications', JSON.stringify(initialNotifications));
    }
  }, []);

  // Salvar notificacao sempre q tiver uma nova ou ela mudar
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Remover notificacao por id
  const handleDelete = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
  };

  return (
    <div className="container">
      <main className="mainContent">
        <h1 className="title">Notificações</h1>

        {notifications.length === 0 ? (
          <p className="noNotifications">Você não possui notificações.</p>
        ) : (
          <div className="notificationsList">
            {notifications.map((notification) => (
              <div key={notification.id} className="notificationItem">
                <div className="notificationLeft">
                  <FaBell className="iconBell" />
                  <span>{notification.message}</span>
                </div>
                <div className="notificationRight">
                  <FaRegClock className="iconClock" />
                  <span className="time">{notification.time}</span>
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(notification.id)}
                    aria-label={`Remover notificação ${notification.message}`}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Notificacoes;
