function flatten(arr) {
    var flat = [];
    arr.forEach(function (item) {
        if (item.forEach) {
            [].push.apply(flat, exports.flatten(item));
            return;
        }
        flat.push(item);
    });
    return flat;
}
exports.flatten = flatten;
