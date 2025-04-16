'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { getProfile, uploadAvatar, deleteAvatar } from '/services/auth';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        if (data.avatar) {
          setAvatar(data.avatar);
        }
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push('/auth/login');
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      await uploadAvatar(formData);
      setAvatar(URL.createObjectURL(file));  // Обновляем аватар на клиенте
    } catch (err) {
      setError('Failed to upload avatar');
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar();
      setAvatar(null);  // Удаляем аватар на клиенте
    } catch (err) {
      setError('Failed to delete avatar');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Email: {profile?.email}</p>
      <p>Username: {profile?.username}</p>

      {/* Отображение аватара */}
      {avatar ? (
        <div>
          <img src={avatar} alt="Avatar" width="100" height="100" />
          <button onClick={handleDeleteAvatar}>Delete Avatar</button>
        </div>
      ) : (
        <p>No avatar uploaded</p>
      )}

      {/* Форма для загрузки аватара */}
      <input type="file" onChange={handleAvatarChange} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
