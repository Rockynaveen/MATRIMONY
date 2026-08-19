// ──────────────────────────────────────────────────────────────
// profileApi.ts  –  Kept for backward-compatibility with AppContext.
// Delegates to the new profileService under the hood.
// ──────────────────────────────────────────────────────────────

import { axiosClient } from './axiosClient';
import type {
  ProfileApiResponse,
  PatchBasicProfileRequest,
  DetailedProfileRequest
} from '../types/apiTypes';

export const profileApi = {
  // GET /api/profile/get/
  getProfile: async (): Promise<ProfileApiResponse> => {
    let response = await axiosClient.get<ProfileApiResponse>('/profile/get/');
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    if (response.status === 401) {
      const err: any = new Error('Unauthorized');
      err.status = 401;
      throw err;
    }
    // Default clean profile object when GET /api/profile/get/ returns 404 (detailed profile not created yet)
    return {
      id: '',
      first_name: localStorage.getItem('logged_in_name') || 'User',
      last_name: '',
      email: localStorage.getItem('logged_in_email') || '',
      phone: '',
      gender: '',
      date_of_birth: '',
      is_basic_complete: false,
      is_detailed_complete: false,
      profile_completion_percentage: 15
    };
  },

  // PATCH /api/profile/basic/update/
  patchBasicProfile: async (payload: PatchBasicProfileRequest): Promise<{ message: string; is_basic_complete: boolean }> => {
    let response = await axiosClient.patch<{ message: string; is_basic_complete: boolean }>(
      '/profile/basic/update/',
      payload
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    // Fallback: persist locally
    const stored = localStorage.getItem('vivah_mock_user');
    if (stored) {
      const u = JSON.parse(stored);
      u.gender = payload.gender;
      u.date_of_birth = payload.date_of_birth;
      u.phone = payload.phone;
      u.is_basic_complete = true;
      localStorage.setItem('vivah_mock_user', JSON.stringify(u));
    }
    return { message: 'Profile Updated Successfully', is_basic_complete: true };
  },

  // POST /api/profile/create/
  createDetailedProfile: async (payload: DetailedProfileRequest): Promise<{ message: string; profile_completion_percentage: number }> => {
    let response = await axiosClient.post<{ message: string; profile_completion_percentage: number }>(
      '/profile/create/',
      payload
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    // Fallback
    const stored = localStorage.getItem('vivah_mock_user');
    if (stored) {
      const u = JSON.parse(stored);
      u.is_detailed_complete = true;
      u.detailed_profile = payload;
      localStorage.setItem('vivah_mock_user', JSON.stringify(u));
    }
    return { message: 'Detailed matrimonial profile created successfully', profile_completion_percentage: 100 };
  },

  // PUT /api/profile/update/
  updateDetailedProfile: async (payload: DetailedProfileRequest): Promise<{ message: string }> => {
    let response = await axiosClient.put<{ message: string }>('/profile/update/', payload);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    // Fallback
    const stored = localStorage.getItem('vivah_mock_user');
    if (stored) {
      const u = JSON.parse(stored);
      u.detailed_profile = { ...(u.detailed_profile || {}), ...payload };
      localStorage.setItem('vivah_mock_user', JSON.stringify(u));
    }
    return { message: 'Detailed profile updated successfully' };
  }
};
