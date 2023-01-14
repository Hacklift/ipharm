import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DrugController } from './drug.controller';
import { DrugModule } from './drug.module';

describe('DrugController', () => {
  let drugController: DrugController;

  const mockRepository = {
    find:  jest.fn().mockImplementation(() => [])
  };

  beforeEach(async () => {
    const drug: TestingModule = await Test.createTestingModule({
      imports: [DrugModule]
    })
    .overrideProvider(getModelToken('Drug'))
    .useValue(mockRepository)
    .compile();

    drugController = drug.get<DrugController>(DrugController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(drugController.getHello()).toBe('Hello World!');
    });
  });

  describe('GET: /drug', () => {
    it('should return "Hello World!"', async () => {
      expect(await drugController.findDrugs()).toEqual([]);
    });
  });
});
