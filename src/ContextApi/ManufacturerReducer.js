export const initialState = {
    user : null,
    manufacturerproduct : [],
    sidebar: [],
    sidebarcontent : []
};


const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
        case 'SET_USER' :
            return{
                ...state,
                user: action.user
            }

        case 'ADD_MANUFACTURERPRODUCT':
            return{
                ...state,
                manufacturerproduct : action.item
            }

            case 'ADD_SIDEBARCONTENT' :
                return{
                    ...state,
                    sidebarcontent : action.item
                }

        default:
        return state;
    }
    };

export default reducer;