export default (state={projects: []}, action) => {
  switch(action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        projects: action.data.projects,
      };
    case 'SUBMIT_PROJECT':
      return {
        ...state,
        projects: ([action.data.projects]).concat(state.projects),
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((project) => project._id !== action.id),
      };
    case 'SET_EDIT':
      return {
        ...state,
        projectToEdit: action.project,
      };
    case 'EDIT_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project) => {
          if(project._id === action.data.project._id) {
            return {
              ...action.data.project,
            }
          }
          return project;
        }),
        projectToEdit: undefined,
      }
    default:
      return state;
  }
};