const isExampleReducer = (state = false, action) => {
  switch (action.type) {
    case 'EXAMPLE':
      return action.isExample;
    default:
      return state;
  }
};
export default {
  isExample: isExampleReducer
};
