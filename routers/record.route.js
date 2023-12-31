import { Router } from 'express';

import GetAllRecordsAction from '../actions/record/GetAllRecordsAction.js';
import CreateRecordAction from '../actions/record/CreateRecordAction.js';
import GetRecordAction from '../actions/record/GetRecordAction.js';
import DeleteRecordAction from '../actions/record/DeleteRecordAction.js';
import UpdateRecordAction from '../actions/record/UpdateRecordAction.js';
import CalculateAction from '../actions/record/CalculateAction.js';

const router = new Router();

const getAllRecordsAction = new GetAllRecordsAction();
const createRecordAction = new CreateRecordAction();
const getRecordAction = new GetRecordAction();
const deleteRecordAction = new DeleteRecordAction();
const updateRecordAction = new UpdateRecordAction();
const calculateAction = new CalculateAction();

router.get('/', getAllRecordsAction.run);
router.post('/create', createRecordAction.run);
router.get('/:id', getRecordAction.run);
router.delete('/:id', deleteRecordAction.run);
router.put('/update/:id', updateRecordAction.run);
router.post('/calculate/', calculateAction.run);

export default router;
