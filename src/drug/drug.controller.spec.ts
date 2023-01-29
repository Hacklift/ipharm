import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DrugCategory } from '../models';
import { DRUGS } from '../fixtures/drug.fixtures';
import { DrugController } from './drug.controller';
import { DrugModule } from './drug.module';

describe('DrugController', () => {
  let drugController: DrugController;

  const mockRepository = {
    find:  jest.fn()
            .mockReturnValueOnce(DRUGS)
            .mockReturnValueOnce([DRUGS.filter(drug => drug.category === DrugCategory.PainKiller)]),
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
      it("calls drugRepository.find with the appropriate parameter", () => {
        expect(mockRepository.find.mock.calls[0][0]).toBeUndefined();
        expect(mockRepository.find).toHaveBeenCalledWith(undefined); // same as above, leaving it for learning purpuses
      });
    })
    describe("with filter parameters", () => {
      describe("when 0 drug is found", async () => {const param = {category: DrugCategory.PainKiller};
        
      });
      describe("when 1 drug is found", async () => {const param = {category: DrugCategory.PainKiller};
        it('should return an array', async () => {
          const result = await drugController.findDrugs(param);
          expect(result).toEqual([DRUGS[0]]);
          expect(result).toBeInstanceOf(Array);
        });
        it("calls drugRepository.find with the appropriate parameter", () => {
          expect(mockRepository.find).toHaveBeenCalledWith(param);
        });
      });
      describe("when multiple drugs are found", async () => {const param = {category: DrugCategory.PainKiller};
        
      });
    })
  });
});
