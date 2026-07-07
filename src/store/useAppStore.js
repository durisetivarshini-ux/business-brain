import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      // User Profile
      user: {
        name: 'Varshini',
        role: 'Chief Operating Officer (COO)',
        email: 'varshini@businessbrain.ai',
        phone: '+1 (555) 019-2834',
        location: 'San Francisco, CA',
        avatarUrl: null
      },
      updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),

      // Application Data
      crmLeads: [
        { id: '1', name: 'Acme Corp', status: 'Negotiation', value: '$45,000', lastContact: '2 hours ago' },
        { id: '2', name: 'Global Tech', status: 'Proposal', value: '$120,000', lastContact: '1 day ago' },
        { id: '3', name: 'Nexus Industries', status: 'Closed Won', value: '$85,000', lastContact: '3 days ago' },
      ],
      addCrmLead: (lead) => set((state) => ({ crmLeads: [lead, ...state.crmLeads] })),
      removeCrmLead: (id) => set((state) => ({ crmLeads: state.crmLeads.filter(l => l.id !== id) })),

      // Settings
      settings: {
        notificationsEnabled: true,
        darkMode: true,
        language: 'en'
      },
      updateSettings: (data) => set((state) => ({ settings: { ...state.settings, ...data } })),
    }),
    {
      name: 'business-brain-storage', // local storage key
    }
  )
);
