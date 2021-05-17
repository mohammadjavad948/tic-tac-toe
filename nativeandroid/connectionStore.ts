import {combine} from 'zustand/middleware';
import create from 'zustand';

export const useConnectionStore = create(
  combine({connect: false}, set => ({set: (connect: any) => set(connect)})),
);
