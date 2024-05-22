import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/${userId}`);
        setUserData(response.data.userDetails);
      } catch (err) {
        setError('Error al obtener los datos del usuario');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-profile-container">
      <h2>Perfil de usuario</h2>
      <div className="user-details">
        <div className="user-detail">
          <strong>Nombre:</strong> {userData.name}
        </div>
        <div className="user-detail">
          <strong>Apellido:</strong> {userData.surname}
        </div>
        <div className="user-detail">
          <strong>Correo electrónico:</strong> {userData.email}
        </div>
        <div className="user-detail">
          <strong>Teléfono:</strong> {userData.phone}
        </div>
        <div className="user-detail">
          <strong>Nombre de usuario:</strong> {userData.username}
        </div>
        <div className="user-detail">
          <strong>Rol:</strong> {userData.role}
        </div>
      </div>
    </div>
  );
};