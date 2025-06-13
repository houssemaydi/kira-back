import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { leaderboardPrizesService } from '../leaderboard-prizes/leaderboard-prizes.service';
import { GameIdentifiersService } from '../game-identifiers/game-identifiers.service';

import {
  LeaderboardDataDto,
  PlayerVerificationResponseDto,
} from './dto/player';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { Logger } from 'hygen';

@Injectable()
export class AffiliateDataService {
  constructor(
    // Dependencies here
    private readonly httpService: HttpService,
    private readonly leaderboardPrizesService: leaderboardPrizesService,
    private readonly gameIdentifiersService: GameIdentifiersService,
  ) {}
  private readonly PARTNER_USER_ID = process.env.PARTNER_USER_ID;
  private readonly PARTNER_API_TOKEN = process.env.PARTNER_API_TOKEN;
  private readonly API_URL_VERIFY = process.env.API_URL_VERIFY || '';
  private readonly API_URL_STATS = process.env.API_URL_STATS || '';
  private readonly logger = new Logger(AffiliateDataService.name);

  maskName(name: string): string {
    return name.slice(0, 3) + '*'.repeat(name.length - 3);
  }

  async validatePlayer(playerDto): Promise<any> {
    try {
      const { playerUserName } = playerDto;

      const response = await lastValueFrom(
        this.httpService.get(this.API_URL_VERIFY, {
          params: {
            username: playerUserName,
            affiliateId: this.PARTNER_USER_ID,
          },
          headers: {
            Authorization: `Bearer ${this.PARTNER_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }),
      );
      const resp: PlayerVerificationResponseDto =
        new PlayerVerificationResponseDto();
      resp.playerUserName = playerUserName;
      resp.isAffiliate = response.data.isAffiliate;

      return resp;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error during user validation',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async playerStats(playerStats): Promise<any> {
    try {
      const { playerUserName, startDate, endDate, affiliateId } = playerStats;
      const params = {
        userId: this.PARTNER_USER_ID,
        affiliateId: this.PARTNER_USER_ID,
        startDate: startDate, // Default to a predefined start date,
        endDate: endDate,
      };

      const response = await lastValueFrom(
        this.httpService.get(this.API_URL_STATS, {
          params: params,
          headers: { Authorization: `Bearer ${this.PARTNER_API_TOKEN}` },
        }),
      );

      if (response && response.data && Array.isArray(response.data)) {
        const userData = response.data.find(
          (user) =>
            user.username.toLowerCase() === playerUserName.toLowerCase(),
        );

        if (!userData) {
          console.log(`User "${playerUserName}" not found in the stats.`);
          return null;
        }

        return {
          playerUserName: playerUserName,
          totalWageredAmount: userData.wagered,
          totalWeightedAmount: userData.weightedWagered,
          favoriteGame: userData.favoriteGameTitle,
          rankLevelNumber: userData.rankLevelNumber,
          rankLevelImage: userData.rankLevelImage,
        };
      }
    } catch (error) {
      console.error('Error fetching data from API:', error.message);
      throw new HttpException(
        'Error fetching affiliate stats',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async leaderboardData(
    leaderboardData: {
      startDate: string | null;
      endDate: string | null;
      isCurrentMonth: boolean;
    },
    isPublic: boolean,
  ): Promise<any> {
    console.log(leaderboardData);
    const { isCurrentMonth } = leaderboardData;
    if (leaderboardData.startDate == null && leaderboardData.endDate == null) {
      if (isCurrentMonth) {
        leaderboardData.startDate = this.formatDateToString(
          startOfMonth(new Date()),
        );
        leaderboardData.endDate = this.formatDateToString(
          endOfMonth(new Date()),
        );
      } else {
        const lastMonth = subMonths(new Date(), 1);
        leaderboardData.startDate = this.formatDateToString(
          startOfMonth(lastMonth),
        );
        leaderboardData.endDate = this.formatDateToString(
          endOfMonth(lastMonth),
        );
      }
    }

    // Static array for leaderboard prizes
    const leaderboardPrizes = await this.leaderboardPrizesService.findById(
      'e15298c0-d969-4c83-9633-74efadd82160',
    );
    const leaderboardPrizesData =
      leaderboardPrizes?.leaderboardPrizes?.split(',') || [];
    try {
      const response = await lastValueFrom(
        this.httpService.get(this.API_URL_STATS, {
          headers: {
            Authorization: `Bearer ${this.PARTNER_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          params: {
            userId: this.PARTNER_USER_ID,
            startDate: leaderboardData.startDate,
            endDate: leaderboardData.endDate,
            gameIdentifiers: '-housegames:dice',
          },
        }),
      );

      let sortedLeaderboard: any[] = [];

      if (response && response.data && Array.isArray(response.data)) {
        sortedLeaderboard = [...response.data].sort(
          (a, b) => b.weightedWagered - a.weightedWagered,
        );
      } else {
        console.error('Error: leaderboard data is undefined or missing');
      }

      if (isPublic) {
        sortedLeaderboard = sortedLeaderboard.slice(0, 15);
        return {
          startDate: leaderboardData.startDate,
          endDate: leaderboardData.endDate,
          leaderboard: sortedLeaderboard.map((user, index) => ({
            username: this.maskName(user.username), // Masked username
            weightedWagered: user.weightedWagered.toFixed(2),
            rankLevelImage: user.rankLevelImage,
            prize: leaderboardPrizesData[index] || 0, // Assign prize if available, otherwise 0
          })),
        };
      }

      return {
        startDate: leaderboardData.startDate,
        endDate: leaderboardData.endDate,
        leaderboard: sortedLeaderboard.map((user, index) => ({
          username: user.username,
          weightedWagered: user.weightedWagered,
          rankLevelImage: user.rankLevelImage,
          prize: leaderboardPrizesData[index] || 0, // Assign prize if available, otherwise 0
        })),
      };
    } catch (error) {
      console.error('Error fetching data from API:', error.message);
      throw new Error('Error fetching leaderboard data');
    }
  }
  async fetchStatsByWager(leaderboardData: LeaderboardDataDto): Promise<any> {
    console.log(leaderboardData);
    try {
      const { data } = await lastValueFrom(
        this.httpService.get(this.API_URL_STATS, {
          params: {
            userId: this.PARTNER_USER_ID,
            startDate: leaderboardData.startDate,
            endDate: leaderboardData.endDate,
            gameIdentifiers: '-housegames:dice',
          },
          headers: {
            Authorization: `Bearer ${this.PARTNER_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      if (data && Array.isArray(data)) {
        const eligibleUsers = data
          .filter((user) => user.weightedWagered >= leaderboardData.wagerAmount)
          .sort((a, b) => b.weightedWagered - a.weightedWagered)
          .map((user) => ({
            username: user.username,
            weightedWagered: user.weightedWagered,
          }));

        if (eligibleUsers.length === 0) {
          console.log(
            `No users found with weightedWagered above ${leaderboardData.wagerAmount}.`,
          );
          return null;
        }

        console.log('.. Rank, Name, WeightedWager');
        console.log(eligibleUsers.join('\n'));

        return eligibleUsers;
      }

      return null;
    } catch (error) {
      console.log(`Error fetching data from API: ${error.message}`);
      throw new HttpException(
        'Error fetching affiliate stats',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  formatDateToString = (date: Date | null): string => {
    if (!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  async fetchMultipleProviders(
    highestXData: LeaderboardDataDto,
    isPublic: boolean,
  ): Promise<any> {
    // Fetch all rows from the game_identifiers table
    const gameIdentifiersData = await this.gameIdentifiersService.findAll();

    // Ensure gameIdentifiers is split into an array and filter out empty identifiers
    const formattedData = gameIdentifiersData.map((item) => ({
      gameIdentifiers: item.gameIdentifiers
        ? item.gameIdentifiers
            .split(',')
            .filter((identifier) => identifier !== '')
        : [],
      startDate: item.startDate,
      endDate: item.endDate,
    }));

    console.log(formattedData); // To inspect the formatted data

    try {
      const highestMultipliers = {};

      // Iterate through each item (line) of the formatted data
      for (const item of formattedData) {
        try {
          // Prepare to fetch data for each game identifier (slot)
          const highest = {
            startDate: item.startDate,
            endDate: item.endDate,
            data: item.gameIdentifiers.map((e) => ({
              username: '',
              payout: 0,
              gameId: '',
              gameTitle: '',
              wagered: 0,
              multiplier: 0,
              slot: e,
            })),
          };

          // Iterate through each slot (gameIdentifier)
          for (const gameIdentifier of item.gameIdentifiers) {
            try {
              // Make the HTTP request for each gameIdentifier (slot)
              const response = await lastValueFrom(
                this.httpService.get(this.API_URL_STATS, {
                  headers: {
                    Authorization: `Bearer ${this.PARTNER_API_TOKEN}`,
                    'Content-Type': 'application/json',
                  },
                  params: {
                    userId: this.PARTNER_USER_ID,
                    gameIdentifiers: gameIdentifier, // Pass the gameIdentifier (slot) for the request
                    startDate: item.startDate, // Use the specific startDate from the item
                    endDate: item.endDate, // Use the specific endDate from the item
                  },
                }),
              );

              const stats = response.data;

              // Process the response stats for each slot
              if (Array.isArray(stats) && stats.length > 0) {
                for (const stat of stats) {
                  const highestMultiplier = stat.highestMultiplier;
                  if (highestMultiplier && highestMultiplier.wagered >= 0.1) {
                    // Find the corresponding entry in highest.data based on slot
                    for (const entry of highest.data) {
                      if (entry.slot === gameIdentifier) {
                        if (highestMultiplier.multiplier > entry.multiplier) {
                          // Update the entry with the highest multiplier stats
                          entry.username = isPublic
                            ? this.maskName(stat.username)
                            : stat.username;
                          entry.payout = highestMultiplier.payout;
                          entry.gameId = highestMultiplier.gameId;
                          entry.gameTitle = highestMultiplier.gameTitle;
                          entry.wagered = highestMultiplier.wagered;
                          entry.multiplier = highestMultiplier.multiplier;
                        }
                      }
                    }
                  }
                }
              }
            } catch (error) {
              console.error(
                `Error fetching data for ${gameIdentifier}:`,
                error.message,
              );
            }
          }

          // Store the results for each time period (startDate, endDate)
          highestMultipliers[`${item.startDate}_${item.endDate}`] = highest;
        } catch (error) {
          console.error(
            `Error processing data for game identifiers ${item.gameIdentifiers}:`,
            error.message,
          );
        }
      }

      return highestMultipliers;
    } catch (error) {
      console.error('Unexpected error:', error.message);
      return { error: error.message };
    }
  }
}
