import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import loadQuery from '../queries/loadQuery.js';

const createQuery = loadQuery('records/create');
const getAllQuery = loadQuery('records/getAll');
const getQuery = loadQuery('records/get');
const updateQuery = loadQuery('records/update');
const getLastYear = loadQuery('records/getLastYear');

class RecordRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newData) {
    await connection.query(createQuery, [
      newData.id,
      newData.date,
      newData.production_valumes,
      newData.unit_price,
      newData.unit_cost,
      newData.meterials_cost,
      newData.energy_cost,
      newData.equipment_cost,
      newData.amortization,
      newData.marketing,
      newData.labor_cost,
      newData.transportation_cost,
      newData.insurance,
      newData.taxation
    ]);

    return this.getById(newData.id);
  }

  async update(newData) {
    await connection.query(updateQuery, [
      newData.date,
      newData.production_valumes,
      newData.unit_price,
      newData.unit_cost,
      newData.meterials_cost,
      newData.energy_cost,
      newData.equipment_cost,
      newData.amortization,
      newData.marketing,
      newData.labor_cost,
      newData.transportation_cost,
      newData.insurance,
      newData.taxation,

      newData.id
    ]);

    return this.getById(newData.id);
  }

  async getById(id) {
    const items = await connection.query(getQuery, [id]);

    return items[0][1][0];
  }

  async getAll() {
    const items = await connection.query(getAllQuery);

    return items[0][1];
  }
  
  async getLastYear() {
    const items = await connection.query(getLastYear);

    return items[0][1];
  }

  async delete(id) {
    const result = await connection.query('DELETE FROM records WHERE id = ?', [id]);

    return result[0].affectedRows > 0;
  }
}

export default RecordRepository;
