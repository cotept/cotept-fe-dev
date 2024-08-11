// The root-level request handlers combine
// all the domain-based handlers into a single

import { achievementHandlers } from '@mocks/handlers/achievement';
import { userHandlers } from '@mocks/handlers/user';

// network description array.
export const handlers = [...userHandlers, ...achievementHandlers];
