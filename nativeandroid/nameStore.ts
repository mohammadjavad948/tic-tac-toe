import {combine} from 'zustand/middleware';
import create from 'zustand';

export const useNameStore = create(
  combine({name: ''}, set => ({set: (name: any) => set(name)})),
);
