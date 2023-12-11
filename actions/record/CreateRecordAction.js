import IAction from '../IAction.js';
import { STATUS } from '../../config/enums.js';

import RecordService from '../../services/RecordService.js';
import RecordRepository from '../../repositories/RecordRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class CreateRecordAction extends IAction {
  constructor() {
    super();

    this.service = new RecordService(new RecordRepository());
  }

  run = async (req, res) => {
    let validData = this.validate({ ...req.body });

    const createdItem = await this.service.create(validData);

    return res.status(STATUS.created).json({ ...createdItem });
  };

  validate(input) {
    return input;
  }
}

export default CreateRecordAction;
