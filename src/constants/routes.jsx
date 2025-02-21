import { Banners, Brands, Categories, Dashboard, Products } from "../pages";

export const routes = [
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/banners",
        element: <Banners />
    },
    {
        path: "/brands",
        element: <Brands />
    },
    {
        path: "/categories",
        element: <Categories />
    },
    {
        path: "/products",
        element: <Products />
    },
]