import prismaClient from '@/external/repository/prisma/prisma-client';
import app from '@/main/config/app';
import request from 'supertest';
import { clearPrismaDatabase } from './clear-database';

describe('Return bike route', () => {
  it('return bike should return 200', async () => {
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

    const bikeRentHistory = await prismaClient.bikeRentHistory.create({
      data: {
        status: 'RENTED',
        rentDate: new Date('2024-07-22 00:00:00'),
        returnDate: new Date('2024-07-24 00:00:00'),
        cost: 2300,
        bike: {
          connect: {
            id: bike.id,
          },
        },
        candidate: {
          connect: {
            id: candidate.id,
          },
        },
      },
    });

    await request(app)
      .post('/api/bikes/return')
      .set('authorization', 'a-token')
      .send({
        bikeRentHistoryId: bikeRentHistory.id,
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: bikeRentHistory.id,
            status: 'RETURNED',
          })
        );
      });
  });
});
