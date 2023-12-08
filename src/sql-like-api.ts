function wrap() {
  let id = 1;
  function eq(value: number) {
    return this.id === value;
  }

  return {
    where: function (cb) {
      return cb({ eq });
    },
  };
}

wrap().where(({}) => ({}));
