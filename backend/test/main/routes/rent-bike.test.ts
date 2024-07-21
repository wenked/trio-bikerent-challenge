import prismaClient from '@/external/repository/prisma/prisma-client';
import app from '@/main/config/app';
import request from 'supertest';
import { clearPrismaDatabase } from './clear-database';

describe('Rent bike route', () => {
  it('rent bike should return 200', async () => {
    await clearPrismaDatabase();
    const candidate = await prismaClient.candidate.create({
      data: {
        email: 'first@candidate.com',
        name: 'First Candidate',
        token: 'a-token',
      },
    });

    const bike = await prismaClient.bike.create({
      data: {
        type: 'All terrain bike',
        name: 'Kent Flexer',
        maxLoad: 70,
        bodySize: 26,
        rate: 10,
        description: 'Nice bike.',
        ratings: 4.9,
        candidate: {
          connect: {
            id: candidate.id,
          },
        },
        imageUrls: {
          create: [
            {
              url: 'https://cremecycles.com/images/glowne/14.jpg',
            },
          ],
        },
      },
    });

    await request(app)
      .post('/api/bikes/rent')
      .set('authorization', 'a-token')
      .send({
        bikeId: bike.id,
        rentDate: '2024-07-22 00:00:00',
        returnDate: '2024-07-24 00:00:00',
      })
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            bikeId: bike.id,
            candidateId: candidate.id,
            status: 'RENTED',
            cost: 2300,
          })
        );
      });
  });

  afterAll(async () => {
    await clearPrismaDatabase();
  });
});
