# qr-product-portal

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Data Conversion

The project includes a script to convert CSV data to JSON format. The script reads data from 'data/data.csv' and writes the converted data to 'public/products.json'. The CSV file should have the following format:

- Headers: ID, 产品介绍(Product Introduction), 使用方法(Usage Method)
- First line is skipped
- ID should be a number
- 产品介绍 and 使用方法 should be strings

The output JSON format will be an array of objects, where each object represents a product with the following structure:

```json
[
  {
    "ID": number,
    "产品介绍": "string",
    "使用方法": "string"
  }
]
```

To run the conversion script, execute the following command:

```bash
node data/convert.js
```

This will read the CSV data, parse it, and write the JSON data to the specified output file.
