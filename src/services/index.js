import { NaturaApiServices } from "./NaturaApiServices";

const api = new NaturaApiServices();

export const registerUser = async (body) => {

    await api.makeHttpRequest({
        url: "/user",
        method: "POST",
        data: body
    }).then((res) => {
        localStorage.setItem('user', JSON.stringify(res))
    }).catch((err) => {
        alert(err.response.data)
    })
}

export const createCart = async () => {
    await api.makeHttpRequest({
        url: "/cart",
        method: "POST"
    }).then((res) => {
        localStorage.setItem('cart', JSON.stringify(res))
    }).catch((err) => {
        console.log(err.response.data)
        return err.response.data
    })
}

export const addItems = async (body) => {
    return await api.makeHttpRequest({
        url: "/item",
        method: "POST",
        data: body
    }).then((res) => {
        localStorage.setItem('cart', JSON.stringify(res));
        return res;
    })
}

export const updateItems = async (id, quantity) => {
    return await api.makeHttpRequest({
        url: `/item/${id}`,
        method: "PUT",
        data: {
            quantity
        }
    }).then((res) => {
        localStorage.setItem('cart', JSON.stringify(res));
        return res;
    })
}

export const deleteItem = async (id) => {
    return await api.makeHttpRequest({
        url: `/item/${id}`,
        method: "DELETE"
    }).then((res) => {
        let cart = api.getCart();
        let items = cart?.items;
        items = items.filter((c) => c.id !== id);

        cart = {
            ...cart,
            items
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
    })
}

export const getCategory = async () => {
    return await api.makeHttpRequest({
        url: "/category",
        method: "GET"
    }).then((res) => {
        return res;
    }).catch((err) => {
        console.log(err.response.data)
        return err.response.data
    })
}

export const getProducts = async ({
    page,
    perPage,
    text,
    categoryId
}) => {

    return await api.makeHttpRequest({
        url: "/product",
        method: "GET",
        params: {
            page,
            perPage,
            text,
            categoryId
        }
    }).then((res) => {
        return res?.products;
    })
}

export const getVoucher = async (text) => {
    return await api.makeHttpRequest({
        url: `/voucher?name=${text}`,
        method: "GET"
    }).then((res) => {
        return res;
    })
}