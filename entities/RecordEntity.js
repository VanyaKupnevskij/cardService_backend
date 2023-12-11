import IEntity from './IEntity.js';

class RecordEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.date = new Date(Date.now());
    this.production_valumes = 0;
    this.unit_price = 0;
    this.unit_cost = 0;
    this.meterials_cost = 0;
    this.energy_cost = 0;
    this.equipment_cost = 0;
    this.amortization = 0;
    this.marketing = 0;
    this.labor_cost = 0;
    this.transportation_cost = 0;
    this.insurance = 0;
    this.taxation = 0;
  }
}

export default RecordEntity;
