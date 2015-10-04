var find = require('find-parent-dir');


find(__dirname, 'test.txt', function(err, result){
  console.log(err, result);
});