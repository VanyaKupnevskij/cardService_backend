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

    const calculatedResult = await this.service.calculate(validData);

    return res.status(STATUS.ok).json({ ...calculatedResult });
  };

  validate(input) {
    if (input.inflation === undefined || 
        input.inflation < 0 || 
        input.inflation > 100) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Inflation', input.inflation, 'is invalid'));
    }
    if (input.risk_politic === undefined || 
        input.risk_politic < 0 || 
        input.risk_politic > 10) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Risk politic', input.risk_politic, 'is invalid'));
    }
    if (input.risk_inflation === undefined || 
        input.risk_inflation < 0 || 
        input.risk_inflation > 10) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Risk inflation', input.risk_inflation, 'is invalid'));
    }
    if (input.risk_concuration === undefined || 
        input.risk_concuration < 0 || 
        input.risk_concuration > 10) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Risk concuration', input.risk_concuration, 'is invalid'));
    }
    if (input.risk_contract === undefined || 
        input.risk_contract < 0 || 
        input.risk_contract > 10) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Risk contract', input.risk_contract, 'is invalid'));
    }

    return input;
  }
}

export default CreateRecordAction;
