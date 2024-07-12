const check = require('./checkLib');


let paginationWithFromTo = (searchParameter, fromParameter, toParameter) => {
    let search = check.isEmpty(searchParameter) ? "" : searchParameter;
    let from = check.isEmpty(fromParameter) ? 1 : fromParameter;
    let to = check.isEmpty(toParameter) ? 25 : toParameter;
    let pageSize = Number((to - from) + 1);
    let offset = Number(from - 1);
    return { search, offset, pageSize };
}


module.exports = {
    paginationWithFromTo: paginationWithFromTo
}