const url = {
    BASE_URL: "https://localhost:7270/api/",

    AUTH: {
        REGISTER: "AUTH/register",
        LOGIN: "AUTH/login",
        FORGOT_PASSWORD: "AUTH/forgot-password",
        PROFILE: "AUTH/profile",
        UPDATE_PROFILE: "AUTH/update-profile",
        CHANGE_PASSWORD: "AUTH/change-password",
        RESET_PASSWORD: "AUTH/reset-password",
    },

    ARTIST: {
        LIST:"Artists",
        DETAIL: "Artists/{}",
    },

    ARTWORK: {
        LIST:"ArtWorks/GetAllArtWorksOffer",
        DETAIL: "ArtWorks/{}",
    },

    OFFER: {
        CREATE: "Offers/CreateOfferUser",
        MY_OFFER: "Offers/get-by-user",
        DETAIL: "Offers/detailForUser",
        UPDATE_PAYMENT:"Offers/update-status-Admin/{}"
    },

    FAVORITE: {
        BY_USER: "Favorites/get-by-user",
        ADD: "Favorites/addtofavorite",
        REMOVE: "Favorites/removefavorite",
    },

    REGISTER_ARTIST: {
        CREATE: "Admin/request-artist", 
    },

    FOLLOW: {
        BY_USER: "Follows/get-by-user-follow",
        ADD: "Follows/addtofollow",
        REMOVE: "Follows/removefollow",
    },

    PAYPAL: {
        DETAIL: "Offers/detailForUser"
    },

}; 
export default url;