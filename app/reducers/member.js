export default (state={members: []}, action) => {
    switch(action.type) {
      case 'MEMBERS_PAGE_LOADED':
        return {
          ...state,
          members: action.data.members,
        };
      case 'SUBMIT_MEMBER':
        return {
          ...state,
          members: ([action.data.members]).concat(state.members),
        };
   
      default:
        return state;
    }
  };