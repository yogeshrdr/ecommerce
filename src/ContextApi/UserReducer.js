export const initialState = {
    sidebar: [],
    user : null,
    sidebarcontent : [],
    desktopCarousel : [],
    mobileCarousel: [],
    homeproduct: [],
    cart: [],
    orderhistory : [],
    address : []
};

export const getCartTotal = (cart) => cart?.reduce((amount, item) => parseInt(item.productQuanitiy) *parseInt(item.productPrice) + amount, 0);

export const getCartItemTotal = (cart) => cart?.reduce((amount, item) => parseInt(item.productQuanitiy) + amount , 0);

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER' :
            return{
                ...state,
                user: action.user
            }

        case 'ADD_SIDEBARCONTENT' :
            return{
                ...state,
                sidebarcontent : action.item
            }

        case 'ADD_DESKTOPCAROUSEL' :
            return{
                ...state,
                desktopCarousel : action.item
            }

        case 'ADD_MOBILECAROUSEL' :
            return{
                ...state,
                mobileCarousel : action.item
            }

        case 'ADD_HOMEPRODUCT' :
            return{
                ...state,
                homeproduct : action.item
            }

        case 'ADD_CART' :
            return {
                ...state,
                cart : action.item
            }

            case 'ADD_ADDRESS' :
            return {
                ...state,
                address : action.item
            }

            case 'ADD_ORDERS' :
            return {
                ...state,
                orderhistory : action.item
            }
            
        default:
        return state;
    }
    };

export default reducer;