import { UseCase } from '@core/common/usecase/UseCase';
import { GetUserPort } from '../port/usecase/GetUserPort';
import { UserUseCaseDto } from './dto/UserUseCaseDto';

export interface GetUserCase extends UseCase<GetUserPort, UserUseCaseDto> {}
