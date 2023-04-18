import { z } from 'zod';
import { type RouterOutputs } from '~/utils/api';


type allProjectOutputs = RouterOutputs['project']['getAll'];

export type Project = allProjectOutputs[number];
export const projectInput = z.object({ name: z.string() });