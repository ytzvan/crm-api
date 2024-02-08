import { IsString, Matches } from 'class-validator';
import { Company } from '../../companies/companies.entity';

export class CreateSuperAdminDto {
  email: string;
  @IsString()
  /*@Matches(
    /^(?=\S*?[A-Z])(?=\S*?[0-9])(?=\S*?[!@#$%^&*()_+{}|;':"<>?`~-])\S{10,30}$/,
    {
      message:
        'Password must be of atleast 10 chars and must contain at least 1 uppercase letter, 1 digit, 1 special symbol and no white spaces.',
    },
  )*/
  password: string;
  firstName: string;
  lastName: string;
  primaryPhone: string;
  isActive: boolean;
  companyName: string;
}
