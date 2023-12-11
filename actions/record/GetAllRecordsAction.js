import IAction from '../IAction.js';

import RecordService from '../../services/RecordService.js';
import RecordRepository from '../../repositories/RecordRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';
import UID from '../../lib/UID.js';

class GetAllRecordsAction extends IAction {
  constructor() {
    super();

    this.service = new RecordService(new RecordRepository());
  }

  run = async (req, res) => {
    const validData = this.validate({ ...req.query });

    const items = await this.service.getAll(validData);

    return res.json(items);
  };

  validate(input) {
    return input;
  }
}

export default GetAllRecordsAction;
