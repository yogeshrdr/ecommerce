export const initialState = {
    user : null,
    mobileCarousel : [],
    desktopCarousel : [],
    homeproduct : [],
    sidebar: [],
    sidebarcontent : []
};


const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER' :
            return{
                ...state,
                user: action.user
            }

        case 'ADD_MOBILECAROUSEL':
            return{
                ...state,
                mobileCarousel : action.item
            }

        case 'ADD_DESKTOPCAROUSEL' :
                return{
                    ...state,
                    desktopCarousel : action.item
                }

        case 'ADD_HOMEPRODUCT' :
            return{
                ...state,
                homeproduct : action.item
            }

        default:
        return state;
    }
    };

export default reducer;