import { axiosClient } from './axiosClient';
import type {
  MatchResponseSchema,
  InterestResponseSchema,
  InterestSendSchema,
  InterestUpdateSchema,
  ShortlistCreateSchema,
  IgnoreCreateSchema,
  BlockCreateSchema,
  MessageResponseSchema
} from '../types/matching.types';

export const matchingApi = {
  getRecommendations: async (): Promise<MatchResponseSchema[]> => {
    const res = await axiosClient.get<MatchResponseSchema[]>('/matching/recommendations');
    return res.data || [];
  },

  sendInterest: async (payload: InterestSendSchema): Promise<InterestResponseSchema> => {
    const res = await axiosClient.post<InterestResponseSchema>('/matching/interest/send', payload);
    return res.data;
  },

  getSentInterests: async (): Promise<InterestResponseSchema[]> => {
    const res = await axiosClient.get<InterestResponseSchema[]>('/matching/interest/sent');
    return res.data || [];
  },

  getReceivedInterests: async (): Promise<InterestResponseSchema[]> => {
    const res = await axiosClient.get<InterestResponseSchema[]>('/matching/interest/received');
    return res.data || [];
  },

  updateInterest: async (interestId: number, payload: InterestUpdateSchema): Promise<InterestResponseSchema> => {
    const res = await axiosClient.put<InterestResponseSchema>(`/matching/interest/${interestId}/update`, payload);
    return res.data;
  },

  getInterest: async (interestId: number): Promise<InterestResponseSchema> => {
    const res = await axiosClient.get<InterestResponseSchema>(`/matching/interest/${interestId}`);
    return res.data;
  },

  deleteInterest: async (interestId: number): Promise<MessageResponseSchema> => {
    const res = await axiosClient.delete<MessageResponseSchema>(`/matching/interest/${interestId}`);
    return res.data;
  },

  addToShortlist: async (payload: ShortlistCreateSchema): Promise<MessageResponseSchema> => {
    const res = await axiosClient.post<MessageResponseSchema>('/matching/shortlist/add', payload);
    return res.data;
  },

  getShortlist: async (): Promise<MatchResponseSchema[]> => {
    const res = await axiosClient.get<MatchResponseSchema[]>('/matching/shortlist');
    return res.data || [];
  },

  removeFromShortlist: async (userId: number): Promise<MessageResponseSchema> => {
    const res = await axiosClient.delete<MessageResponseSchema>(`/matching/shortlist/remove/${userId}`);
    return res.data;
  },

  addToIgnore: async (payload: IgnoreCreateSchema): Promise<MessageResponseSchema> => {
    const res = await axiosClient.post<MessageResponseSchema>('/matching/ignore/add', payload);
    return res.data;
  },

  getIgnoredProfiles: async (): Promise<MatchResponseSchema[]> => {
    const res = await axiosClient.get<MatchResponseSchema[]>('/matching/ignore');
    return res.data || [];
  },

  removeFromIgnore: async (userId: number): Promise<MessageResponseSchema> => {
    const res = await axiosClient.delete<MessageResponseSchema>(`/matching/ignore/remove/${userId}`);
    return res.data;
  },

  blockProfile: async (payload: BlockCreateSchema): Promise<MessageResponseSchema> => {
    const res = await axiosClient.post<MessageResponseSchema>('/matching/block/add', payload);
    return res.data;
  },

  getBlockedProfiles: async (): Promise<MatchResponseSchema[]> => {
    const res = await axiosClient.get<MatchResponseSchema[]>('/matching/block');
    return res.data || [];
  },

  unblockProfile: async (userId: number): Promise<MessageResponseSchema> => {
    const res = await axiosClient.delete<MessageResponseSchema>(`/matching/block/remove/${userId}`);
    return res.data;
  }
};
export default matchingApi;
