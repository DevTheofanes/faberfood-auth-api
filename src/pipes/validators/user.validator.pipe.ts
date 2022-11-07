import { PipeTransform, BadRequestException } from '@nestjs/common';
import { IUpdateUser, IUserParams } from 'src/domain/services';
import { CreateAccountSchema, UpdateAccountSchema } from './schemas';

export class CreateUserValidatorPipe implements PipeTransform<IUserParams> {
  public transform(value: IUserParams): IUserParams {
    const result = CreateAccountSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class UpdateAccountValidatorPipe implements PipeTransform<IUpdateUser> {
  public transform(value: IUpdateUser): IUpdateUser {
    const result = UpdateAccountSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
