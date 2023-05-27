const express = require('express');
const router = express.Router();

let postsApi = require("../../../controller/api/v1/postapi");

router.get('/', postsApi.index);

router.delete('/:id', postsApi.destroy)



module.exports = router;