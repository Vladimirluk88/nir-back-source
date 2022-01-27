var url = require('url');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = req.query;
  let messageQuery = query["message"];
  let reqStr = url.parse(req.url, true);
    let str = `${reqStr.query.message}`;
    let setOfSymb = new Map();

    let arrStr = str.split("");

    arrStr.forEach((e) => {
        if (setOfSymb.has(e)) {
            let temp = setOfSymb.get(e) + 1;
            setOfSymb.delete(e);
            setOfSymb.set(e, temp);
        } else {
            setOfSymb.set(e, 1);
        }
    });

    let entropy = 0;
    let sizeOfStr = arrStr.length;
    for (let symbol of setOfSymb.keys()) {
        entropy +=
            (setOfSymb.get(symbol) / sizeOfStr) *
            Math.log2(setOfSymb.get(symbol) / sizeOfStr) *
            -1;
    }
  res.json({"calculatedEntropy": entropy});
});

module.exports = router;
