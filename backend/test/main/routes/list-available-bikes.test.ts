import { PrismaBikeRepository } from '@/external/repository/prisma/prisma-bike-repository';
import prismaClient from '@/external/repository/prisma/prisma-client';
import app from '@/main/config/app';
import { BikeBuilder } from '@test/builders/bike-builder';
import request from 'supertest';
import { clearPrismaDatabase } from './clear-database';

describe('List available bikes route', () => {
  it('list available bikes should return available bikes and 200', async () => {
    const bikeRepo = new PrismaBikeRepository();
    await clearPrismaDatabase();
    const candidate = await prismaClient.candidate.create({
      data: {
        email: 'first@candidate.com',
        name: 'First Candidate',
        token: 'a-token',
      },
    });

    const bikeInfo = new BikeBuilder().build();
    await bikeRepo.add({ candidateId: candidate.id, ...bikeInfo });

    await request(app)
      .get('/api/bikes/available')
      .set('authorization', 'a-token')
      .send({})
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(1);
      });
  });

  afterAll(async () => {
    await clearPrismaDatabase();
  });
});
