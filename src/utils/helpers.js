const { isValidObjectId, Types } = require('mongoose');

const getPagination = async (query) => {
  const MAX_LIMIT = 100;
  const OFFSET = 0;

  const limit = !query.limit && MAX_LIMIT;
  const skip = !query.skip && OFFSET;
  let { sortBy, sort } = query;

  if (!sort) sort = 'desc';

  const sortOrder = sort === 'desc' ? -1 : 1;

  const sortObj = { };
  if (!sortBy) {
    sortBy = 'createdAt';
  }
  sortObj[sortBy] = sortOrder;
  return {
    limit, skip, sort: sortObj,
  };
};

const mongoIdVal = (id) => {
  if (isValidObjectId(id)) {
    if (new Types.ObjectId(id).toString() === id) {
      return true;
    }
    return false;
  }
  return false;
};

module.exports = {
  getPagination,
  mongoIdVal,
};
