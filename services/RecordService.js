import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import RecordEntity from '../entities/RecordEntity.js';

class RecordService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (itemData) => {
    let item = new RecordEntity();
    item.date = itemData.date ?? new Date(Date.now());
    item.production_valumes = itemData.production_valumes;
    item.unit_price = itemData.unit_price;
    item.unit_cost = itemData.unit_cost;
    item.meterials_cost = itemData.meterials_cost;
    item.energy_cost = itemData.energy_cost;
    item.equipment_cost = itemData.equipment_cost;
    item.amortization = itemData.amortization;
    item.marketing = itemData.marketing;
    item.labor_cost = itemData.labor_cost;
    item.transportation_cost = itemData.transportation_cost;
    item.insurance = itemData.insurance;
    item.taxation = itemData.taxation;

    const createdItem = await this.repository.insert(item);

    return createdItem;
  };

  update = async (itemData) => {
    let item = new RecordEntity(itemData.id);
    item.date = itemData.date ?? new Date(Date.now());
    item.production_valumes = itemData.production_valumes;
    item.unit_price = itemData.unit_price;
    item.unit_cost = itemData.unit_cost;
    item.meterials_cost = itemData.meterials_cost;
    item.energy_cost = itemData.energy_cost;
    item.equipment_cost = itemData.equipment_cost;
    item.amortization = itemData.amortization;
    item.marketing = itemData.marketing;
    item.labor_cost = itemData.labor_cost;
    item.transportation_cost = itemData.transportation_cost;
    item.insurance = itemData.insurance;
    item.taxation = itemData.taxation;

    const updatedItem = await this.repository.update(item);

    return updatedItem;
  };

  getAll = async () => {
    const items = await this.repository.getAll();

    return items;
  };

  getById = async (id) => {
    const item = await this.repository.getById(id);

    return item;
  };

  deleteById = async (id) => {
    const isSeccessful = await this.repository.delete(id);
    if (!isSeccessful) {
      throw new AppError(ERROR_PRESETS.DELETE_ENTITY_BY_ID(id));
    }
  };

  calculate = async (inputData) => {
    let input = {
      year: inputData.year ?? new Date(Date.now()).getFullYear() + 1,
      inflation: inputData.inflation ?? 0,
      risk_politic: inputData.risk_politic ?? 0,
      risk_inflation: inputData.risk_inflation ?? 0,
      risk_concuration: inputData.risk_concuration ?? 0,
      risk_contract: inputData.risk_contract ?? 0
    }

    const lastYearData = await this.repository.getLastYear(input.year);

    return this.calculate(input, lastYearData);
  }

  calculate = (input, lastYearData) => {
    let calculatedResult = {
      lastYear: {
        proceeds: 0,
        cost_price: 0,
        income: 0,
        operating_income: 0,
        net_income: 0
      },
      selectYear: {
        proceeds: 0,
        cost_price: 0,
        income: 0,
        operating_income: 0,
        net_income: 0
      }
    };

    for (let record in lastYearData) {
      
    }

    return calculatedResult;
  };
}

export default RecordService;
