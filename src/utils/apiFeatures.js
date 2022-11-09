class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {


    this.query = this.query.find({$match: { $or: [{ 'sku': { $regex:  request.query.val, $options: 'i'} }, { 'title': { $regex:  request.query.val, $options: 'i'} }] }});
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    //eliminemos los campos que vienen de otras consultas
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    //Filtro avanzado para precio
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
