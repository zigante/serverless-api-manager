import { Services } from '@/enums';
import { IService } from '@/interfaces';
import { ApiGateway } from '@/services';

export const getService = {
  [Services.API_GATEWAY]: ApiGateway,
} as Record<Services, typeof IService>;
