// ========== Auth Controller Spec
// import all modules
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

describe('AuthController', () => {
  let authController: AuthController;
  const query = {
    username: 'jhondoe',
    password: 'Jh0nd03$',
  };

  beforeEach(async () => {
    const mockUserModel = {
      findOne: jest.fn(() => ({
        lean: jest.fn(() => ({ ...query })),
      })),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('Login Method', () => {
    it('should return response body', async () => {
      const result = await authController.login(query);
      expect(result.data).toEqual(query);
      expect(result.statusCode).toBe(200);
    });
  });
});
