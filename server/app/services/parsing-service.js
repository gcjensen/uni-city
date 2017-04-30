const csv = require('csvtojson');

const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    const csvFilePath = `./server/data/${file}`;
    let data = [];
    csv()
      .fromFile(csvFilePath)
      .on('json',(obj) => {
          data.push(obj);
      })
      .on('done',(error)=>{
          resolve(data);
      });
    });
}

module.exports.parseCSV = parseCSV;
