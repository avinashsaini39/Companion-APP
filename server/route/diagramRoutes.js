import express from 'express';
import {
  createDiagram,
  getDiagrams,
  updateDiagram,
  deleteDiagram,
} from '../controller/diagramController.js';
import { protect } from '../middleware/Protect.js';

const router = express.Router();

router.route('/').post(protect, createDiagram).get(protect, getDiagrams);
router.route('/:diagramId').put(protect, updateDiagram).delete(protect, deleteDiagram);

export default router;
