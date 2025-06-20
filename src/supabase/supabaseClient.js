import { createClient } from '@supabase/supabase-js';

// Supabase URL ve API anahtarı için ortam değişkenleri
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Supabase istemcisini oluştur
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Kullanıcı profil bilgilerini getir
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Profil bilgileri alınamadı:', error.message);
    return null;
  }
};

// Kullanıcı profil bilgilerini güncelle
export const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Profil güncellenemedi:', error.message);
    return null;
  }
};

// Tüm aktif kullanıcıları getir (admin için)
export const getAllActiveUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_active', true);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Kullanıcılar alınamadı:', error.message);
    return [];
  }
};
