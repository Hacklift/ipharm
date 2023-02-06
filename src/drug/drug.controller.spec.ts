import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DrugCategory } from '../models';
import { DRUGS } from '../fixtures/drug.fixtures';
import { DrugController } from './drug.controller';
import { DrugModule } from './drug.module';

describe('DrugController', () => {
  let drugController: DrugController;
  const newDrug = {
    name: 'cofflin',
    producer: 'Test Producer 3',
    quantity: 4,
    category: DrugCategory.CoughSyrub
  };
  class mockRepository {
    constructor() {}
    static find = jest.fn().mockImplementation(() => DRUGS)
    save = jest.fn().mockImplementation( () =>  {
      return {
        id: 'Test-Id-7',
        ...newDrug
      };
    });
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
      it('should return an array of drugs', async () => {
        const result = await drugController.findDrugs();
        expect(result).toEqual(DRUGS); // returns all drugs
      });
    });
  });

    describe("with filter parameters", () => {
      it('should return an array of filterd drugs by category', async () => {
        mockRepository.find.mockReturnValue(DRUGS.filter(drug => drug.category === DrugCategory.PainKiller));
        const result = await drugController.findDrugs({category: DrugCategory.PainKiller});
        expect(result).toEqual(DRUGS.filter(drug => drug.category === DrugCategory.PainKiller)); // returns 3 drugs 
        console.log ("result3: ", result);
      });

      it('should return an array of filterd drugs by quantity', async () => {
        mockRepository.find.mockReturnValue(DRUGS.filter(drug => drug.quantity === 5));
        const result = await drugController.findDrugs({quantity: 5});
        expect(result).toEqual(DRUGS.filter(drug => drug.quantity === 5)); // returns 2 drugs 
        console.log ("result2: ", result);
      });

      it('should return an array of filterd drugs by id', async () => {
        mockRepository.find.mockReturnValue(DRUGS.filter(drug => drug.id === "Test-Id-1"));
        const result = await drugController.findDrugs({id: "Test-Id-1"});
        expect(result).toEqual(DRUGS.filter(drug => drug.id === "Test-Id-1")); // returns 1 drug 
        console.log ("result1: ", result);
      });

      it('should return an array of filterd drugs by name', async () => {
        mockRepository.find.mockReturnValue(DRUGS.filter(drug => drug.name === "Amatem"));
        const result = await drugController.findDrugs({name: "Amatem"});
        expect(result).toEqual(DRUGS.filter(drug => drug.name === "Amatem")); // returns 0 drug 
        console.log ("result0: ", result);
      });
    });
  
  describe('POST: /drug', () => {

    it('should create a new drug', async() => {
      expect(await drugController.createDrug(newDrug)).toEqual({
        id: 'Test-Id-7',
        ...newDrug, 
      });
    });
  });
});
