/**
 * Converts CSV data to JSON format
 * Reads data from 'data/data.csv' and writes to 'public/products.json'
 *
 * @requires fs - Node.js file system module
 * @requires csv-parser - CSV parsing module
 *
 * CSV Format:
 * - Headers: ID, 产品介绍(Product Introduction), 使用方法(Usage Method)
 * - First line is skipped
 *
 * Output JSON Format:
 * [
 *   {
 *     ID: number,
 *     产品介绍: string,
 *     使用方法: string
 *   }
 * ]
 *
 * @throws {Error} If CSV parsing fails or file operations fail
 */

const fs = require("fs");
const csv = require("csv-parser");

const results = [];

fs.createReadStream("data.csv")
  .pipe(
    csv({
      headers: ["ID", "产品名称", "产品介绍", "使用方法"],
      skipLines: 1, // 修改为1，跳过第一行
    })
  )
  .on("data", (data) => {
    // 调试输出原始数据
    console.log("原始数据:", data);

    results.push({
      ID: parseInt(data.ID, 10),
      产品名称: data.产品名称,
      产品介绍: data.产品介绍,
      使用方法: data.使用方法,
    });
  })
  .on("end", () => {
    console.log("转换结果:", results);
    fs.writeFileSync("../public/products.json", JSON.stringify(results));
    console.log("转换完成，共处理", results.length, "条记录");
  })
  .on("error", (err) => {
    console.error("CSV解析错误:", err);
  });
