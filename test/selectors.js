const log = o => console.log(JSON.stringify(o, null, 4))

const productsAsArray = state => Object.values(state.products);

const mappedProducts = state =>
    state.map(product => {
        const { id, name, price } = product;
        return { id, name, price };
    });

// 001
const getProducts = state =>
    mappedProducts(productsAsArray(state));

// 002
const getProductsInStock = state =>
    mappedProducts(productsAsArray(state)
        .filter(product => product.inStock));

// 003
const getProduct = (state, productID) =>
    state.products[productID] ? state.products[productID] : null;

// 004
const getBasket = state => Object.keys(state.basket).map(productId => {
        const { id, name, quantity, subtotal } = {
            ...getProduct(state, productId),
            subtotal: getProduct(state, productId).price * state.basket[productId],
            quantity: state.basket[productId],
        };
        return { id, name, quantity, subtotal };
    });

// 005
const getBasketTotal = state =>
    getBasket(state).reduce((a, b) => a.subtotal + b.subtotal);

const brandList = state =>
    productsAsArray(state)
        .map(prod => prod.brand)
            .filter((el, index, self) => index === self.indexOf(el));

// 006
const getProductsByBrand = state =>
    brandList(state)
        .reduce((initialVal, cur) => ({
            ...initialVal,
            [cur]: [
                ...productsAsArray(state)
                    .filter(prod => prod.brand === cur)
            ]
        }), {});

module.exports = {
    getProducts,
    getProductsInStock,
    getProduct,
    getBasket,
    getBasketTotal,
    getProductsByBrand,
};
