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

  calculateBuisnesValues = (records) => {
    let resultRecords = [...records];
    const additionalInfo = {
      year: {},
      month: {},
      day: {},
    };

    for (let record of resultRecords) {
      const year = new Date(record.date).getFullYear();
      const month = new Date(record.date).getMonth() + 1;
      const day = new Date(record.date).getDate();

      additionalInfo.year[year] = {
        income: (additionalInfo.year[year]?.income || 0) + record.income,
        costs: (additionalInfo.year[year]?.costs || 0) + record.costs,
        already_paid: (additionalInfo.year[year]?.already_paid || 0) + record.already_paid,
      };

      additionalInfo.month[month] = {
        income: (additionalInfo.month[month]?.income || 0) + record.income,
        costs: (additionalInfo.month[month]?.costs || 0) + record.costs,
        already_paid: (additionalInfo.month[month]?.already_paid || 0) + record.already_paid,
      };

      additionalInfo.day[day] = {
        income: (additionalInfo.day[day]?.income || 0) + record.income,
        costs: (additionalInfo.day[day]?.costs || 0) + record.costs,
        already_paid: (additionalInfo.day[day]?.already_paid || 0) + record.already_paid,
      };

      for (const [keyYear, infoYear] of Object.entries(additionalInfo.year)) {
        const { margin, marginality, profitability } = this.calculateRowBuisnesValue(
          infoYear.income,
          infoYear.costs,
        );

        additionalInfo.year[keyYear].margin = margin;
        additionalInfo.year[keyYear].marginality = marginality;
        additionalInfo.year[keyYear].profitability = profitability;
      }
      for (const [keyMonth, infoMonth] of Object.entries(additionalInfo.month)) {
        const { margin, marginality, profitability } = this.calculateRowBuisnesValue(
          infoMonth.income,
          infoMonth.costs,
        );

        additionalInfo.month[keyMonth].margin = margin;
        additionalInfo.month[keyMonth].marginality = marginality;
        additionalInfo.month[keyMonth].profitability = profitability;
      }
      for (const [keyDay, infoDay] of Object.entries(additionalInfo.day)) {
        const { margin, marginality, profitability } = this.calculateRowBuisnesValue(
          infoDay.income,
          infoDay.costs,
        );

        additionalInfo.day[keyDay].margin = margin;
        additionalInfo.day[keyDay].marginality = marginality;
        additionalInfo.day[keyDay].profitability = profitability;
      }
    }

    return { resultRecords, additionalInfo };
  };

  calculateRowBuisnesValue = (income, costs) => {
    const margin = income - costs;
    const marginality = (margin / income) * 100;
    const profitability = (margin / income) * 100;

    return { margin, marginality, profitability };
  };
}

export default RecordService;
