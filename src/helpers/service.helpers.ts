import { ApiGateway } from '@/adapters';
import { Services } from '@/enums';
import { IService } from '@/interfaces';

export const getService = {
  [Services.API_GATEWAY]: ApiGateway,
} as Record<Services, typeof IService>;
