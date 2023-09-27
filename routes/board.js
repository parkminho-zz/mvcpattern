var express = require('express');
var router = express.Router();
var boardcontroller = require('../controller/board_controller')


router.get('/list',boardcontroller.getboardlist);
router.get('/list/search',boardcontroller.getsearchboard);
router.get('/write',boardcontroller.boardcreateform);
router.get('/:board_num',boardcontroller.getdetailboardlist);
router.get('/:board_num/modify',boardcontroller.getmodifyboard);
router.get('/update')

router.post('/write',boardcontroller.boardcreate);
router.post('/:board_num/modify',boardcontroller.postmodifyboard);
router.post('/:board_num/delete',boardcontroller.postdeleteboard);

module.exports = router;