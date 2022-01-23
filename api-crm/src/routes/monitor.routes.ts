const express = require('express');
const router = express.Router();

import { monitor } from './../controllers/monitor.controller';

router.get('/', monitor);

module.exports = router;