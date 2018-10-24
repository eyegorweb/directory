exports.getContact = function(id) {
  return Promise.resolve({
    id,
    firstName: "Eduardo"
  });
};
