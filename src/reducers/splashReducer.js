const isExampleReducer = (state = false, action) => {
  switch (action.type) {
    case 'checkVersion':
      return action.isExample;
    default:
      return state;
  }
};
export default {
  isExample: isExampleReducer
};
