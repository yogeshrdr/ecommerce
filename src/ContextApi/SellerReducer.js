export const initialState = {
    user : null,
    sellerproduct : [],
    orderhistory : [],
};


const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
        case 'SET_USER' :
            return{
                ...state,
                user: action.user
            }

        case 'ADD_SELLERPRODUCT':
            return{
                ...state,
                sellerproduct : action.item
            }
        
        case 'EMPTY_SELLERPRODUCT':
            return{
                ...state,
                sellerproduct : []
            }

            case 'ADD_ORDERS':
                return{
                    ...state,
                    orderhistory : action.item
                }
        
        default:
        return state;
    }
    };

export default reducer;