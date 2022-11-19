import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { PokemonResponse } from './interfaces/pokemon-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon',
    );

    data.results.forEach(({ name, url }) => {
      const segments: string[] = url.split('/');
      const number: number = +segments[segments.length - 2];
    });
    return data.results;
  }
}
