import express from "express";
const router = express.Router();

// what database should have:
const orderArg = [
  {
    _id: "1",
    status: "processing", // processing, completed, cancelled
    buyer: {
      buyerId: "3efsd4TFDfd",
      firstName: "Bishal",
      lastName: "Karki",
      email: "bishal@gmail.com",
      phone: "24356756432",
    },
    cart: [
      {
        productId: "2afdTREfdg34",
        productName: "Bishal",
        salesPrice: 234,
        quantity: 3,
        thumbnail: "http://placehold..",
        subTotal: 100,
      },
      {
        productId: "2afdTREfdg34",
        productName: "Bishal",
        salesPrice: 234,
        quantity: 3,
        thumbnail: "http://placehold..",
        subTotal: 100,
      },
      {
        productId: "2afdTREfdg34",
        productName: "Bishal",
        salesPrice: 234,
        quantity: 3,
        thumbnail: "http://placehold..",
        subTotal: 100,
      },
      {
        productId: "2afdTREfdg34",
        productName: "Bishal",
        salesPrice: 234,
        quantity: 3,
        thumbnail: "http://placehold..",
        subTotal: 100,
      },
    ],
    shipping: {
      firstName: "Bishal",
      lastName: "Karki",
      phone: "456756756",
      street: "23 biush street",
      suburb: "Sydney",
      postcode: "123",
      state: "WA",
      country: "Au",
    },
    cartTotal: 444,
    discount: 50,
    discountCode: "2dsfgb",
    totalAmount: 400, // cartTotal - discount
    paymentInfo: {
      status: "paid", // paid, pending,
      method: "cash", // cash, credit cart
      paidAmount: 344,
      transactionId: "23wewfesrtGFD",
      paidDate: "2015-03-23",
    },
  },
  {
    _id: "11",
    status: "processing", // processing, completed, cancelled
    buyer: {
      buyerId: "3efsd4TFDfd",
      firstName: "Bishal",
      lastName: "Karki",
      email: "bishal@gmail.com",
      phone: "24356756432",
    },
    cart: [
      {
        productId: "2afdTREfdg34",
        productName: "Bishal",
        salesPrice: 234,
        quantity: 3,
        thumbnail: "http://placehold..",
        subTotal: 100,
      },
      {
        productId: "2afdTREfdg34",
        productName: "Bishal",
        salesPrice: 234,
        quantity: 3,
        thumbnail: "http://placehold..",
        subTotal: 100,
      },
      {
        productId: "2afdTREfdg34",
        productName: "Bishal",
        salesPrice: 234,
        quantity: 3,
        thumbnail: "http://placehold..",
        subTotal: 100,
      },
      {
        productId: "2afdTREfdg34",
        productName: "Bishal",
        salesPrice: 234,
        quantity: 3,
        thumbnail: "http://placehold..",
        subTotal: 100,
      },
    ],
    shipping: {
      firstName: "Bishal",
      lastName: "Karki",
      phone: "456756756",
      street: "23 biush street",
      suburb: "Sydney",
      postcode: "123",
      state: "WA",
      country: "Au",
    },
    cartTotal: 444,
    discount: 50,
    discountCode: "2dsfgb",
    totalAmount: 400, // cartTotal - discount
    paymentInfo: {
      status: "paid", // paid, pending,
      method: "cash", // cash, credit cart
      paidAmount: 344,
      transactionId: "23wewfesrtGFD",
      paidDate: "2015-03-23",
    },
  },
];

// get all orders
router.get("/:_id?", (req, res, next) => {
  try {
    const { _id } = req.params;

    const orders = _id ? orderArg.filter((item) => item._id === _id) : orderArg;

    res.json({
      status: "success",
      message: "Order List",
      orders,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
