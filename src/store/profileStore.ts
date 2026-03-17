import { create } from 'zustand';

type ProfileState = {
  isProfileOpen: boolean;
};

type ProfileActions = {
  openProfile: () => void;
  closeProfile: () => void;
};

export const useProfileStore = create<ProfileState & ProfileActions>()(set => ({
  isProfileOpen: false,
  openProfile: () => set({ isProfileOpen: true }),
  closeProfile: () => set({ isProfileOpen: false }),
}));
