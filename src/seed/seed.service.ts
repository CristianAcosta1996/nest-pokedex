import { Injectable } from '@nestjs/common';

import { PokemonResponse } from './interfaces/pokemon-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';

import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly httpAdapter: AxiosAdapter,
  ) {}

  async executeSeed() {
    this.pokemonService.removeMany();

    const pokemonsToInsert: { name: string; number: number }[] = [];

    const data = await this.httpAdapter.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    data.results.forEach(async ({ name, url }) => {
      const segments: string[] = url.split('/');
      const number: number = +segments[segments.length - 2];

      pokemonsToInsert.push({ name, number });

      return;
    });

    await this.pokemonService.createMany(pokemonsToInsert);

    return 'seed executed';
  }
}
