import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateLoginHistoryDto } from './dto/create-login-history.dto';
import { UpdateLoginHistoryDto } from './dto/update-login-history.dto';
import { LoginHistoryRepository } from './infrastructure/persistence/login-history.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { LoginHistory } from './domain/login-history';

@Injectable()
export class LoginHistoriesService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly loginHistoryRepository: LoginHistoryRepository,
  ) {}

  async create(createLoginHistoryDto: CreateLoginHistoryDto) {
    // Do not remove comment below.
    // <creating-property />

    let user: User | null | undefined = undefined;

    if (createLoginHistoryDto.user) {
      const userObject = await this.userService.findById(
        createLoginHistoryDto.user.id,
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    } else if (createLoginHistoryDto.user === null) {
      user = null;
    }

    return this.loginHistoryRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ip: createLoginHistoryDto.ip,

      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.loginHistoryRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: LoginHistory['id']) {
    return this.loginHistoryRepository.findById(id);
  }

  findByIds(ids: LoginHistory['id'][]) {
    return this.loginHistoryRepository.findByIds(ids);
  }

  findAllByIp(ip: string) {
    return this.loginHistoryRepository.findAllByIp(ip);
  }

  async update(
    id: LoginHistory['id'],

    updateLoginHistoryDto: UpdateLoginHistoryDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let user: User | null | undefined = undefined;

    if (updateLoginHistoryDto.user) {
      const userObject = await this.userService.findById(
        updateLoginHistoryDto.user.id,
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    } else if (updateLoginHistoryDto.user === null) {
      user = null;
    }

    return this.loginHistoryRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ip: updateLoginHistoryDto.ip,

      user,
    });
  }

  remove(id: LoginHistory['id']) {
    return this.loginHistoryRepository.remove(id);
  }
}
