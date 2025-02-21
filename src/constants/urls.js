export const urls = {
    products: {
        get: "/products",
        post: "/products",
        delete: (id) => `/products/${id}`,
        edit: (id) => `/products/${id}`,
    },

    banners: {
        get: "/Banners",
        post: "/Banners",
        delete: (id) => `/Banners/${id}`,
        edit: (id) => `/Banners/${id}`
    },
    auth: "/auth"
};
