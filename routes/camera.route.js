var express = require('express');
var router = express.Router();

const { CameraController } = require('../controllers/index');

/* [GET] Get all cameras */
router.get('/', CameraController.getCameras);

router.get('/class', CameraController.getClass);

/* [GET] Get camera detail by ID */
router.get('/:id', CameraController.getCamera);

/* [POST] Create a new camera */
router.post('/create', CameraController.postCreateCamera);

/* [PUT] Update camera by ID */
router.put('/update/:id', CameraController.putUpdateCamera);

/* [DELETE] Delete camera by ID */
router.delete('/delete/:id', CameraController.deleteCamera);

/* [DELETE] Delete all cameras */
router.delete('/delete', CameraController.deleteAllCameras);

module.exports = router;
