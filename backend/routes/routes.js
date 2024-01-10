// import express 
import express from "express";
// import functions from controller 
import {
    showFoods,
    showFoodById,
    createFood,
    updateFood,
    deleteFood,
} from "../controllers/food.js";

import {
    showAUser,
    createAccount,
    SendMail,
    allUsers,
    getId,
    SendRegistrazione
} from "../controllers/user.js";

import {
    addItems,
    getItem,
    updateItem,
    allItems,
    deleteItem,
    deleteItems
} from "../controllers/cart.js";

import {
    createBooking
} from "../controllers/booktable.js";

import {
    createBillDetails, deleteBillById, getBillDetailsById
} from "../controllers/billdetails.js";

import {
    showNewestStatusId,
    createBillStatus,
    getAllBillsByUser,
    getAllBillsByBill,
    getAllBills,
    updateBillStatus,
    updateBillPaid,
    cancelBillStatus,
    deleteBill
} from "../controllers/billstatus.js";

import {
    importAnagrafica
} from "../controllers/callFromEsagra.js";

import {
    importEsauriti
} from "../controllers/callFromEsagra.js";


import {
    getSagraSig,
    createSagra,
    updateSagraCodaeInfo

} from "../controllers/catalogo.js";

import {
    PredinuovoId,
    checkquantita,
    createDettaglio,
    createPrenotazione,
    getAllPrenotGtId
} from "../controllers/prenotazioni.js";

// init express router
const router = express.Router();


////////////////////////// FOOD ////////////////////////////////
// get all Food
router.get("/api/foods", showFoods);

// get single Food 
router.get("/api/foods/:id", showFoodById);

// create Food
router.post("/api/foods", createFood);

// update Food 
router.put("/api/foods/:id", updateFood);

// delete Food
router.delete("/api/foods/:id", deleteFood);



////////////////////////// USER ////////////////////////////////

// get new id
router.get("/api/users/new", getId)

// get all user
router.get("/api/users", allUsers)

// get user
router.get("/api/users/:name", showAUser);

// create account
router.post("/api/users/", createAccount);

// send mail ordine completato
router.post("/api/mail/", SendMail)

// send mail registrazione
router.post("/api/mail/registrazione/", SendRegistrazione)


////////////////////////// CART ////////////////////////////////
// add to cart
router.post("/api/cartItem", addItems);

// get a item in cart
router.get("/api/cartItem/:user_id/:food_id", getItem);

// get all items by user id
router.get("/api/cartItem/:id", allItems);

// update item qty
router.put("/api/cartItem/", updateItem);

// delete a item in cart
router.delete("/api/cartItem/:user_id/:food_id", deleteItem);

// delete all items in cart
router.delete("/api/cartItem/:id", deleteItems);



////////////////////////// Booking ////////////////////////////////
router.post("/api/booking", createBooking);

////////////////////////// Prenotazione ////////////////////////////////
router.post("/api/prenotazione", createPrenotazione);
router.get("/api/prenotazione/new", PredinuovoId);
router.get("/api/prenotazione/check", checkquantita);

router.post("/api/prenotazione/dettaglio", createDettaglio);
router.get("/api/prenotazione/allgt/:id", getAllPrenotGtId);


////////////////////////// Bill Details ////////////////////////////////
router.post("/api/billdetails", createBillDetails);
router.get("/api/billdetails/:id", getBillDetailsById);
router.delete("/api/billdetails/delete/:id", deleteBillById)



////////////////////////// Bill Status ////////////////////////////////
router.get("/api/billstatus/new", showNewestStatusId);
router.post("/api/billstatus", createBillStatus);
router.get("/api/billstatus/user/:id", getAllBillsByUser);
router.get("/api/billstatus/bill/:id", getAllBillsByBill);
router.get("/api/billstatus", getAllBills);
router.put("/api/billstatus/:id", updateBillStatus);
router.put("/api/billstatus/paid/:id", updateBillPaid);
router.put("/api/billstatus/cancel/:id", cancelBillStatus);
router.delete("/api/billstatus/delete/:id", deleteBill)

////////////////////////// Catalogo /////////////////////////////
//recupera sagra in base alla sigla
router.get("/api/sagra/:sigla", getSagraSig);
router.post("/api/catalogosagre", createSagra);
router.put("/api/sagracodaeinfo/:id", updateSagraCodaeInfo);



////////////////////////// Bill Details ////////////////////////////////
router.post("/api/importfood", importAnagrafica);


////////////////////////// Esauriti ////////////////////////////////
router.post("/api/importesauriti", importEsauriti);


// export default router
export default router;








