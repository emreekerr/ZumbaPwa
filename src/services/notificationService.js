// Web Push API için yardımcı fonksiyonlar
import { supabase } from '../supabase/supabaseClient';

// Service Worker'ı kaydet
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker başarıyla kaydedildi:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker kaydı başarısız:', error);
      return null;
    }
  }
  return null;
};

// Bildirim izni iste
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('Bu tarayıcı bildirimleri desteklemiyor.');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

// Push aboneliği oluştur
export const subscribeToPushNotifications = async (registration) => {
  try {
    // VAPID public key (gerçek uygulamada bu değer sunucudan gelmelidir)
    const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';
    
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });
    
    console.log('Push aboneliği başarılı:', subscription);
    
    // Kullanıcının abonelik bilgilerini Supabase'e kaydet
    const { user } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ push_subscription: subscription })
        .eq('id', user.id);
      
      if (error) {
        console.error('Abonelik bilgileri kaydedilemedi:', error);
      }
    }
    
    return subscription;
  } catch (error) {
    console.error('Push aboneliği başarısız:', error);
    return null;
  }
};

// Base64 URL'i Uint8Array'e dönüştür (Web Push API için gerekli)
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Tüm kullanıcılara bildirim gönder
export const sendNotificationToAll = async (title, body) => {
  try {
    // Tüm aktif kullanıcıların abonelik bilgilerini al
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, push_subscription')
      .filter('push_subscription', 'not.is', null)
      .eq('is_active', true);
    
    if (error) {
      throw error;
    }
    
    // Gerçek uygulamada, bu bilgiler sunucuya gönderilir ve sunucu tarafından bildirimler gönderilir
    console.log(`${profiles.length} kullanıcıya bildirim gönderilecek:`, { title, body });
    
    // Simülasyon: Yerel bildirim göster
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
    
    return profiles.length;
  } catch (error) {
    console.error('Bildirim gönderme hatası:', error);
    throw error;
  }
};

// Seçili kullanıcılara bildirim gönder
export const sendNotificationToSelected = async (title, body, userIds) => {
  try {
    if (!userIds || userIds.length === 0) {
      throw new Error('Bildirim gönderilecek kullanıcı seçilmedi');
    }

    // Seçili ve aktif kullanıcıların abonelik bilgilerini al
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, push_subscription')
      .filter('push_subscription', 'not.is', null)
      .eq('is_active', true)
      .in('id', userIds);
    
    if (error) {
      throw error;
    }
    
    // Gerçek uygulamada, bu bilgiler sunucuya gönderilir ve sunucu tarafından bildirimler gönderilir
    console.log(`${profiles.length} seçili kullanıcıya bildirim gönderilecek:`, { title, body });
    
    // Simülasyon: Yerel bildirim göster
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { 
        body,
        tag: 'selected-notification' // Aynı tag'e sahip bildirimlerin üst üste binmesini önler
      });
    }
    
    return profiles.length;
  } catch (error) {
    console.error('Seçili kullanıcılara bildirim gönderme hatası:', error);
    throw error;
  }
};

// Hedef seçimine göre bildirim gönder (tüm veya seçili kullanıcılar)
export const sendNotification = async (title, body, target, userIds = []) => {
  if (target === 'all') {
    return await sendNotificationToAll(title, body);
  } else if (target === 'selected') {
    return await sendNotificationToSelected(title, body, userIds);
  } else {
    throw new Error('Geçersiz bildirim hedefi');
  }
};
