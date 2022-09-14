import express from "express";

const router = express.Router();

const ordersArg = [
  {
    _id: 1,
    status: "processing", // processing, delivered, cancelled
    buyer: {
      buyerId: 1,
      fName: "bishal",
      lName: "karki",
      email: "bishal@dds.ccc",
      phone: "123456789",
    },
    cart: [
      {
        productId: 1,
        productName: "product 1",
        salesPrice: 100,
        qty: 1,
        thumbnail: "https://www.google.com",
        subTotal: 100,
      },
      {
        productId: 2,
        productName: "product 2",
        salesPrice: 200,
        qty: 2,
        thumbnail: "https://www.google.com",
        subTotal: 400,
      },
    ],
    shipping: {
      shippingId: 1,
      fName: "bishal",
      lName: "karki",
      phone: "123456789",
      address: "1234, 5th Ave, New York, NY, 10001",
      street: "1234, 5th Ave",
      city: "Sydney",
      state: "NSW",
      country: "Australia",
      zip: "2000",
    },
    cartTotal: 450,
    discount: 60,
    discountCode: "",
    total: 390,
    paymentInfo: {
      status: "paid", // paid, pending, failed
      paymentMethod: "cod", // cod, paypal, stripe
      paidAmount: 390,
      transactionId: "1234567890",
    },
  },
  {
    _id: 1,
    status: "processing", // processing, delivered, cancelled
    buyer: {
      buyerId: 1,
      fName: "bishal",
      lName: "karki",
      email: "bishal@dds.ccc",
      phone: "123456789",
    },
    cart: [
      {
        productId: 1,
        productName: "product 1",
        salesPrice: 100,
        qty: 1,
        thumbnail: "https://www.google.com",
        subTotal: 100,
      },
      {
        productId: 2,
        productName: "product 2",
        salesPrice: 200,
        qty: 2,
        thumbnail: "https://www.google.com",
        subTotal: 400,
      },
    ],
    shipping: {
      shippingId: 1,
      fName: "bishal",
      lName: "karki",
      phone: "123456789",
      address: "1234, 5th Ave, New York, NY, 10001",
    },
    cartTotal: 450,
    discount: 60,
    discountCode: "",
    total: 390,
    paymentInfo: {
      status: "paid", // paid, pending, failed
      paymentMethod: "cod", // cod, paypal, stripe
      paidAmount: 390,
      transactionId: "1234567890",
    },
  },
  {
    _id: 1,
    status: "processing", // processing, delivered, cancelled
    buyer: {
      buyerId: 1,
      fName: "bishal",
      lName: "karki",
      email: "bishal@dds.ccc",
      phone: "123456789",
    },
    cart: [
      {
        productId: 1,
        productName: "product 1",
        salesPrice: 100,
        qty: 1,
        thumbnail: "https://www.google.com",
        subTotal: 100,
      },
      {
        productId: 2,
        productName: "product 2",
        salesPrice: 200,
        qty: 2,
        thumbnail: "https://www.google.com",
        subTotal: 400,
      },
    ],
    shipping: {
      shippingId: 1,
      fName: "bishal",
      lName: "karki",
      phone: "123456789",
      address: "1234, 5th Ave, New York, NY, 10001",
    },
    cartTotal: 450,
    discount: 60,
    discountCode: "",
    total: 390,
    paymentInfo: {
      status: "paid", // paid, pending, failed
      paymentMethod: "cod", // cod, paypal, stripe
      paidAmount: 390,
      transactionId: "1234567890",
    },
  },
  {
    _id: 1,
    status: "processing", // processing, delivered, cancelled
    buyer: {
      buyerId: 1,
      fName: "bishal",
      lName: "karki",
      email: "bishal@dds.ccc",
      phone: "123456789",
    },
    cart: [
      {
        productId: 1,
        productName: "product 1",
        salesPrice: 100,
        qty: 1,
        thumbnail: "https://www.google.com",
        subTotal: 100,
      },
      {
        productId: 2,
        productName: "product 2",
        salesPrice: 200,
        qty: 2,
        thumbnail: "https://www.google.com",
        subTotal: 400,
      },
    ],
    shipping: {
      shippingId: 1,
      fName: "bishal",
      lName: "karki",
      phone: "123456789",
      address: "1234, 5th Ave, New York, NY, 10001",
    },
    cartTotal: 450,
    discount: 60,
    discountCode: "",
    total: 390,
    paymentInfo: {
      status: "paid", // paid, pending, failed
      paymentMethod: "cod", // cod, paypal, stripe
      paidAmount: 390,
      transactionId: "1234567890",
    },
  },
  {
    _id: 1,
    status: "processing", // processing, delivered, cancelled
    buyer: {
      buyerId: 1,
      fName: "bishal",
      lName: "karki",
      email: "bishal@dds.ccc",
      phone: "123456789",
    },
    cart: [
      {
        productId: 1,
        productName: "product 1",
        salesPrice: 100,
        qty: 1,
        thumbnail: "https://www.google.com",
        subTotal: 100,
      },
      {
        productId: 2,
        productName: "product 2",
        salesPrice: 200,
        qty: 2,
        thumbnail: "https://www.google.com",
        subTotal: 400,
      },
    ],
    shipping: {
      shippingId: 1,
      fName: "bishal",
      lName: "karki",
      phone: "123456789",
      address: "1234, 5th Ave, New York, NY, 10001",
    },
    cartTotal: 450,
    discount: 60,
    discountCode: "",
    total: 390,
    paymentInfo: {
      status: "paid", // paid, pending, failed
      paymentMethod: "cod", // cod, paypal, stripe
      paidAmount: 390,
      transactionId: "1234567890",
    },
  },
  {
    _id: 1,
    status: "processing", // processing, delivered, cancelled
    buyer: {
      buyerId: 1,
      fName: "bishal",
      lName: "karki",
      email: "bishal@dds.ccc",
      phone: "123456789",
    },
    cart: [
      {
        productId: 1,
        productName: "product 1",
        salesPrice: 100,
        qty: 1,
        thumbnail: "https://www.google.com",
        subTotal: 100,
      },
      {
        productId: 2,
        productName: "product 2",
        salesPrice: 200,
        qty: 2,
        thumbnail: "https://www.google.com",
        subTotal: 400,
      },
    ],
    shipping: {
      shippingId: 1,
      fName: "bishal",
      lName: "karki",
      phone: "123456789",
      address: "1234, 5th Ave, New York, NY, 10001",
    },
    cartTotal: 450,
    discount: 60,
    discountCode: "",
    total: 390,
    paymentInfo: {
      status: "paid", // paid, pending, failed
      paymentMethod: "cod", // cod, paypal, stripe
      paidAmount: 390,
      transactionId: "1234567890",
    },
  },
];

router.get("/:_id?", (req, res, next) => {
  try {
    const { _id } = req.params;
    const orders = _id
      ? ordersArg.filter((item) => item._id == _id)[0]
      : ordersArg;
    res.json({
      status: "success",
      message: "Welcome to the API",
      orders,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
