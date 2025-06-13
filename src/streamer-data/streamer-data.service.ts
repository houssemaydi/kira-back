import { Injectable } from '@nestjs/common';
import { CreatestreamerDataDto } from './dto/create-streamer-data.dto';
import { UpdatestreamerDataDto } from './dto/update-streamer-data.dto';
import { streamerDataRepository } from './infrastructure/persistence/streamer-data.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { streamerData } from './domain/streamer-data';

@Injectable()
export class streamerDataService {
  constructor(
    // Dependencies here
    private readonly streamerDataRepository: streamerDataRepository,
  ) {}

  async create(createstreamerDataDto: CreatestreamerDataDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.streamerDataRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      discord: createstreamerDataDto.discord,

      tiktok: createstreamerDataDto.tiktok,

      twitter: createstreamerDataDto.twitter,

      instagram: createstreamerDataDto.instagram,

      streamerlogo: createstreamerDataDto.streamerlogo,

      roobetCode: createstreamerDataDto.roobetCode,

      streamerName: createstreamerDataDto.streamerName,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.streamerDataRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: streamerData['id']) {
    return this.streamerDataRepository.findById(id);
  }

  findByIds(ids: streamerData['id'][]) {
    return this.streamerDataRepository.findByIds(ids);
  }

  async update(
    id: streamerData['id'],

    updatestreamerDataDto: UpdatestreamerDataDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.streamerDataRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      discord: updatestreamerDataDto.discord,

      tiktok: updatestreamerDataDto.tiktok,

      twitter: updatestreamerDataDto.twitter,

      instagram: updatestreamerDataDto.instagram,

      streamerlogo: updatestreamerDataDto.streamerlogo,

      roobetCode: updatestreamerDataDto.roobetCode,

      streamerName: updatestreamerDataDto.streamerName,
    });
  }

  remove(id: streamerData['id']) {
    return this.streamerDataRepository.remove(id);
  }
}
