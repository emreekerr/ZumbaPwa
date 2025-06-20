import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { getAllActiveUsers } from '../../supabase/supabaseClient';
import { sendNotification } from '../../services/notificationService';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationBody, setNotificationBody] = useState('');
  const [sendingNotification, setSendingNotification] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [notificationTarget, setNotificationTarget] = useState('all'); // 'all' veya 'selected'

  useEffect(() => {
    fetchUsers();
  }, []);

  // Tüm seçim durumunu değiştirdiğimizde
  useEffect(() => {
    if (selectAll) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  }, [selectAll, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const activeUsers = await getAllActiveUsers();
      setUsers(activeUsers);
    } catch (error) {
      console.error('Kullanıcılar alınamadı:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        // Kullanıcı zaten seçiliyse, seçimden kaldır
        const newSelected = prev.filter(id => id !== userId);
        // Eğer tüm kullanıcılar seçili değilse, "Tümünü Seç" işaretini kaldır
        if (newSelected.length !== users.length) {
          setSelectAll(false);
        }
        return newSelected;
      } else {
        // Kullanıcı seçili değilse, seçime ekle
        const newSelected = [...prev, userId];
        // Eğer tüm kullanıcılar seçiliyse, "Tümünü Seç" işaretini ekle
        if (newSelected.length === users.length) {
          setSelectAll(true);
        }
        return newSelected;
      }
    });
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();
    
    if (!notificationTitle || !notificationBody) {
      setNotificationStatus({
        type: 'error',
        message: 'Lütfen başlık ve içerik alanlarını doldurun.'
      });
      return;
    }

    // Hedef kullanıcıları belirle
    const targetUserIds = notificationTarget === 'all' 
      ? users.map(user => user.id) 
      : selectedUsers;

    if (notificationTarget === 'selected' && targetUserIds.length === 0) {
      setNotificationStatus({
        type: 'error',
        message: 'Lütfen en az bir kullanıcı seçin veya "Tüm Kullanıcılar" seçeneğini işaretleyin.'
      });
      return;
    }

    setSendingNotification(true);
    setNotificationStatus(null);

    try {
      // Gerçek bildirim gönderme işlemi
      await sendNotification(
        notificationTitle, 
        notificationBody, 
        notificationTarget, 
        targetUserIds
      );
      
      setNotificationStatus({
        type: 'success',
        message: `${targetUserIds.length} kullanıcıya bildirim gönderildi.`
      });
      
      // Formu sıfırla
      setNotificationTitle('');
      setNotificationBody('');
    } catch (error) {
      setNotificationStatus({
        type: 'error',
        message: 'Bildirim gönderilirken bir hata oluştu: ' + error.message
      });
    } finally {
      setSendingNotification(false);
    }
  };

  return (
    <div className="admin-panel">
      <Header />
      <main className="admin-content">
        <div className="admin-container">
          <h1>Admin Panel</h1>
          
          <section className="admin-section">
            <h2>Aktif Kullanıcılar</h2>
            {loading ? (
              <p>Kullanıcılar yükleniyor...</p>
            ) : (
              <div className="users-table-container">
                <div className="table-actions">
                  <div className="select-all-container">
                    <input
                      type="checkbox"
                      id="selectAll"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    <label htmlFor="selectAll">Tümünü Seç</label>
                  </div>
                  <div className="selected-count">
                    {selectedUsers.length > 0 && (
                      <span>{selectedUsers.length} kullanıcı seçildi</span>
                    )}
                  </div>
                </div>
                <table className="users-table">
                  <thead>
                    <tr>
                      <th className="checkbox-column">Seç</th>
                      <th>Ad</th>
                      <th>Soyad</th>
                      <th>E-posta</th>
                      <th>Kayıt Tarihi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id} className={selectedUsers.includes(user.id) ? 'selected-row' : ''}>
                          <td className="checkbox-column">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => handleUserSelect(user.id)}
                            />
                          </td>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
                          <td>{user.email}</td>
                          <td>{new Date(user.created_at).toLocaleDateString('tr-TR')}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-data">
                          Aktif kullanıcı bulunamadı.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          
          <section className="admin-section">
            <h2>Bildirim Gönder</h2>
            <form onSubmit={handleSendNotification} className="notification-form">
              <div className="notification-target">
                <div className="form-group radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="targetAll"
                      name="notificationTarget"
                      value="all"
                      checked={notificationTarget === 'all'}
                      onChange={() => setNotificationTarget('all')}
                    />
                    <label htmlFor="targetAll">Tüm Kullanıcılar</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="targetSelected"
                      name="notificationTarget"
                      value="selected"
                      checked={notificationTarget === 'selected'}
                      onChange={() => setNotificationTarget('selected')}
                    />
                    <label htmlFor="targetSelected">Seçili Kullanıcılar ({selectedUsers.length})</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="notificationTitle">Bildirim Başlığı</label>
                <input
                  id="notificationTitle"
                  type="text"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  placeholder="Bildirim başlığını girin"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="notificationBody">Bildirim İçeriği</label>
                <textarea
                  id="notificationBody"
                  value={notificationBody}
                  onChange={(e) => setNotificationBody(e.target.value)}
                  placeholder="Bildirim içeriğini girin"
                  rows="4"
                  required
                />
              </div>
              {notificationStatus && (
                <div className={`notification-status ${notificationStatus.type}`}>
                  {notificationStatus.message}
                </div>
              )}
              <button 
                type="submit" 
                className="send-notification-button"
                disabled={sendingNotification}
              >
                {sendingNotification ? 'Gönderiliyor...' : 'Bildirim Gönder'}
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
