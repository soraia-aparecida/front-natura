import React, { useState, useEffect } from "react"
import { registerUser, createCart, addItems, updateItems, getCategory, deleteItem } from "../services"
import GlobalStateContext from "./GlobalStateContext";
import { NaturaApiServices } from "../services/NaturaApiServices";

const GlobalState = (props) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState([]);
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);

    const api = new NaturaApiServices();

    // const requestLogin = async (body, navigate) => {
    //     const user = 
    //     await registerNewUser(body, navigate)
    // }

    const registerNewUser = async (body, navigate) => {
        const authData = api.getAuthData();

        if (body?.isGuest && !authData?.user) {
            await registerUser(body, navigate);
        }
    }

    const createNewCart = async () => {
        const cart = api.getCart();
        setCart(cart);
        if (!cart?.id) {
            await createCart();
        }
    }

    const addItem = async (productId, quantity) => {
        let cart = api.getCart();
        if (!cart) {
            cart = await createNewCart()
        }
        const res = await addItems({ cartId: cart.id, productId, quantity });
        setCart(res);
        return res;
    }

    const updateItem = async (productId, quantity) => {
        const res = await updateItems(productId, quantity);
        setCart(res);
        return res;
    }

    const removeItem = async (productId) => {
        const res = await deleteItem(productId);
        setCart(res);
        return res;
    }

    const getCategories = async () => {
        const res = await getCategory();
        setCategory(res?.categories);
        return res;
    }

    useEffect(() => {
        async function fetchData() {
            const body = {
                isGuest: true,
                profile: "user"
            }
            await registerNewUser(body);
            await createNewCart();
            await getCategories();
        }
        fetchData();
    }, []);

    const states = { cart, loading, products, category }
    const setters = { setCart, setLoading, setProducts, setCategory }
    const requests = { registerNewUser, addItem, updateItem, getCategories, removeItem }

    return (
        <GlobalStateContext.Provider value={{ states, setters, requests }}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalState;