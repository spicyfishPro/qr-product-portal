# qr-product-portal

## Project setup

```
npm install
pip3 install segno
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

## Data update

Commit and push the CSV file to the repository. QR code and JSON file will be automatically updated.

## Data Conversion

**Data conversion will be automatically done.**

The CSV file should have the following format:

- Headers: ID, 产品介绍, 使用方法
- First line is skipped
- ID should be a number

The output JSON format will be an array of objects with the following structure:

```json
[
  {
    "ID": Number,
    "产品介绍": "string",
    "使用方法": "string"
  }
]
```

To run the conversion script manually, execute the following command:

```bash
cd data && node convert.js
```

This will read the CSV data, parse it, and write the JSON data to the specified output file.
