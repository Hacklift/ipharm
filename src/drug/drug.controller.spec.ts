import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DrugCategory } from '../models';
import { DRUGS } from '../fixtures/drug.fixtures';
import { DrugController } from './drug.controller';
import { DrugModule } from './drug.module';

describe('DrugController', () => {
  let drugController: DrugController;

  const mockRepository = {
    find:  jest.fn().mockImplementation(() =>  DRUGS),
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

  describe('GET: /drugs', () => {
    describe("with no filter parameters", () => {
      it('should return an array', async () => {
        const result = await drugController.findDrugs();
        expect(result).toEqual(DRUGS);
        expect(result).toBeInstanceOf(Array);
      });
    })
    describe("with filter parameters", () => {
      it('should return an array', async () => {
        mockRepository.find.mockReturnValue(DRUGS.filter(drug => drug.category === DrugCategory.PainKiller));
        const result = await drugController.findDrugs({category: DrugCategory.PainKiller});
        expect(result).toEqual([DRUGS[0]]);
        expect(result).toBeInstanceOf(Array);
      });
    })
  });
});
