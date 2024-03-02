import axios from "axios";
import { createContext } from "react";

export let Cartcontext = createContext()

export default function CartcontextProvider(props){
    
    let headers = {
        token : localStorage.getItem('userToken')
    }
    function addToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
            
            productId
        } ,{
            headers
        })
        .then((response) => response)
        .catch((err) => err)
    }
    function addToWishlist(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            
            productId
        } ,{
            headers
        })
        .then((response) => response)
        .catch((err) => err)
    }
    function checkOutSession(cartId ,shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` , {
            
        shippingAddress
        } ,{
            headers
        })
        .then((response) => response)
        .catch((err) => err)
    }
    function getCartItems(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
        })
        .then((response) => response)
        .catch((err) => err)
    }
    function getWishlistItems(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            headers
        })
        .then((response) => response)
        .catch((err) => err)
    }
    function deleteCartItems(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            headers
        })
        .then((response) => response)
        .catch((err) => err)
    }
    function deleteWishlistItems(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {
            headers
        })
        .then((response) => response)
        .catch((err) => err)
    }
    function deleteAllItems(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
        })
        .then((response) => response)
        .catch((err) => err)
    }
    function updateCartItems(productId , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
        {
            count 
        }, {
            headers
        })
        .then((response) => response)
        .catch((err) => err)
    }

    return <Cartcontext.Provider value={{addToCart , getCartItems ,deleteCartItems ,updateCartItems ,checkOutSession ,deleteAllItems ,addToWishlist ,getWishlistItems ,deleteWishlistItems}}>
        {props.children}
    </Cartcontext.Provider>
}
