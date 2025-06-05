import React, { useEffect, useState } from 'react';
import './Profile.css';

const defaultProfile = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone: '+1234567890',
  avatar: '',
  backupEmail: '',
  role: 'User',
  joinDate: '2024-01-01T10:00:00Z',
  verified: true,
  lastLogin: new Date().toISOString(),
  sold: 120,
  bought: 45,
  language: 'en',
  sound: true,
  notifications: true,
  twoFA: false,
  googleLinked: true,
};

const Profile = () => {
  const [user, setUser] = useState(defaultProfile);
  const [editing, setEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const saveUser = (updated) => {
    setUser(updated);
    localStorage.setItem('userProfile', JSON.stringify(updated));
  };

  const handleEdit = () => setEditing(true);
  const handleSave = () => {
    setEditing(false);
    saveUser(user);
    alert('Profile updated');
  };

  const downloadData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(user));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'profile_data.json');
    downloadAnchor.click();
  };

  const handleAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...user, avatar: reader.result };
      saveUser(updated);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className={`profile-page ${darkMode ? 'dark' : ''}`}>
      <h2>👤 User Profile</h2>

      <div className="profile-section">
        <img src={user.avatar || '/default-avatar.png'} alt="Avatar" className="avatar" />
        <input type="file" onChange={handleAvatar} />
      </div>

      <div className="profile-info">
        {editing ? (
          <>
            <input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <input value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
            <input placeholder="Backup Email" value={user.backupEmail} onChange={(e) => setUser({ ...user, backupEmail: e.target.value })} />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phone}</p>
            <p><b>Backup Email:</b> {user.backupEmail || 'Not set'}</p>
            <p><b>Role:</b> {user.role}</p>
            <p><b>Joined:</b> {new Date(user.joinDate).toLocaleString()}</p>
            <p><b>Verified:</b> {user.verified ? 'Yes' : 'No'}</p>
            <p><b>Last Login:</b> {new Date(user.lastLogin).toLocaleString()}</p>
            <p><b>Language:</b> {user.language}</p>
            <p><b>Google Linked:</b> {user.googleLinked ? 'Yes' : 'No'}</p>
            <p><b>Progress:</b> {`${Math.floor((Object.values(user).filter(Boolean).length / 12) * 100)}% Complete`}</p>
            <button onClick={handleEdit}>Edit Profile</button>
          </>
        )}

        <div className="profile-activity">
          <p><b>Sold:</b> {user.sold} kg</p>
          <p><b>Bought:</b> {user.bought} kg</p>
        </div>

        <div className="profile-settings">
          <label><input type="checkbox" checked={user.notifications} onChange={(e) => saveUser({ ...user, notifications: e.target.checked })} /> Notifications</label>
          <label><input type="checkbox" checked={user.sound} onChange={(e) => saveUser({ ...user, sound: e.target.checked })} /> Sound</label>
          <label><input type="checkbox" checked={user.twoFA} onChange={(e) => saveUser({ ...user, twoFA: e.target.checked })} /> Two-Factor Auth</label>
          <label><input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} /> Dark Mode</label>
        </div>

        <div className="profile-extra">
          <p><b>App Version:</b> 1.0.0</p>
          <p><b>Device:</b> {navigator.userAgent}</p>
          <button onClick={downloadData}>Download Data (JSON)</button>
          <button onClick={() => alert('Password Changed')}>Change Password</button>
          <button onClick={() => alert('Account Deleted')}>Delete Account</button>
          <button onClick={() => alert('QR Code Coming Soon')}>Show QR Code</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
