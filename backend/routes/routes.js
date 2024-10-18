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
    allUsers,
    updateUserauthlevel,
    Userdelete,
    Errors
} from "../controllers/user.js";

import {
    SendCoferma,
    SendMail,
    SendRegistrazione,
    Sendsegnalazione
} from "../controllers/mail.js";

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
    createBillDetails,
     deleteBillById, 
     getBillDetailsById
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
    deleteBill,
    getAllBillsGtId,
    deleteAllBill

} from "../controllers/billstatus.js";

import {
    importAnagrafica,
    importEsauriti,
    deleteAllEsauriti
} from "../controllers/callFromEsagra.js";


import {
    getSagraId,
    createSagra,
    updateSagraCodaeInfo,
    allSagre,
    updateControlOrdini,
    GetControlOrdini,
    KeepAlive,
    GetControlVisibilita,
    GetControlObbligo,
    updateControlVisibilita,
    updateControlObbligo,
} from "../controllers/catalogo.js";

import {
    PredinuovoId,
    PutAction,
    Totsum,
    checkquantita,
    createDettaglio,
    createPrenotazione,
    getAllPrenotGtId,
    deleteAllBook,
    getAllPrenot,    
    getPrenDetailsById,
    SumPerOrdine,
    cancelBookstatus,
    cancelBookdetails
} from "../controllers/prenotazioni.js";
import { Infolog } from "../log/loggerModel.js";
import { InserisciErrore, allErrori } from "../controllers/errore.js";
import { getAllCategorie } from "../controllers/categorie.js";

// init express router
const router = express.Router();


////////////////////////// FOOD ////////////////////////////////
// get all Food
router.get("/api/foods", showFoods);

// get single Food 
router.get("/api/foods/:idsagra/:id", showFoodById);

// create Food
router.post("/api/foods", createFood);

// update Food 
router.put("/api/foods/:idsagra/:id", updateFood);

// delete Food
router.delete("/api/foods/:idsagra/:id", deleteFood);



////////////////////////// USER ////////////////////////////////

// get all user
router.get("/api/users", allUsers)

// get user
router.get("/api/users/:id/:email", showAUser);

// create account
router.post("/api/users/", createAccount);

// create account
router.post("/api/users/error/", Errors);

// update authlevel
router.put("/api/users/:idsagra/update/", updateUserauthlevel);

router.delete("/api/users/delete/:email/:idsagra", Userdelete);


////////////////////////// MAIL ////////////////////////////////

// send mail ordine completato
router.post("/api/mail/", SendMail)

// send mail registrazione
router.post("/api/mail/registrazione/", SendRegistrazione)

// send mail conferma
router.post("/api/mail/confirm/", SendCoferma)

// send mail sengalazione
router.post("/api/mail/sengalazione/", Sendsegnalazione)


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
router.get("/api/prenotazione/:idsagra/sum", Totsum);
router.get("/api/prenotazione/:idsagra/sumordine", SumPerOrdine);

router.get("/api/prenotazione/:idsagra/new", PredinuovoId);
router.get("/api/prenotazione/:idsagra/:id", getPrenDetailsById);
router.get("/api/getprenotazione/:idsagra/:id", getAllPrenot);
router.get("/api/prenotazione/:idsagra/check", checkquantita);

router.post("/api/prenotazione", createPrenotazione);
router.post("/api/prenotazione/dettaglio", createDettaglio);
router.get("/api/prenotazione/allgt/:idsagra/:id", getAllPrenotGtId);
router.delete("/api/prenotazioni/:idsagra/delete", deleteAllBook);
router.put("/api/prenotazione/:idsagra/status", PutAction);
router.delete("/api/prenotazioni/status/delete/:idsagra/:id", cancelBookstatus);
router.delete("/api/prenotazioni/details/delete/:idsagra/:id", cancelBookdetails);

////////////////////////// Bill Details ////////////////////////////////
router.post("/api/billdetails", createBillDetails);
router.get("/api/billdetails/:idsagra/:id", getBillDetailsById);
router.delete("/api/billdetails/delete/:idsagra/:id", deleteBillById)



////////////////////////// Bill Status ////////////////////////////////
router.get("/api/billstatus/:idsagra/new", showNewestStatusId);
router.post("/api/billstatus", createBillStatus);
router.get("/api/billstatus/user/:idsagra/:id", getAllBillsByUser);
router.get("/api/billstatus/bill/:idsagra/:id", getAllBillsByBill);
router.get("/api/:idsagra/billstatus", getAllBills);
router.put("/api/billstatus/:idsagra/:id", updateBillStatus);
router.put("/api/billstatus/paid/:idsagra/:id", updateBillPaid);
router.put("/api/billstatus/cancel/:idsagra/:id", cancelBillStatus);
router.delete("/api/billstatus/delete/:idsagra/:id", deleteBill)
router.get("/api/billstatus/allgt/:idsagra/:id", getAllBillsGtId);
router.delete("/api/billstatus/:idsagra/delete", deleteAllBill)

////////////////////////// Catalogo /////////////////////////////
//recupera sagra in base alla sigla
router.get("/api/sagra/ute/:ordine", allSagre);
router.get("/api/sagra/keepalive", KeepAlive)
router.get("/api/sagra/:idsagra", getSagraId);
router.get("/api/sagra/controlli/:idsagra", GetControlOrdini);
router.get("/api/sagra/visibilita/:idsagra", GetControlVisibilita);
router.get("/api/sagra/obbligo/:idsagra", GetControlObbligo);
router.post("/api/catalogosagre", createSagra);
router.put("/api/sagracodaeinfo/:idsagra", updateSagraCodaeInfo);
router.put("/api/:idsagra/sagraComand", updateControlOrdini);
router.put("/api/:idsagra/sagraVisibilita", updateControlVisibilita)
router.put("/api/:idsagra/sagraObbligo", updateControlObbligo)

////////////////////////////// Categorie /////////////////////////////
router.get("/api/:idsagra/categorie", getAllCategorie);

////////////////////////// Bill Details ////////////////////////////////
router.post("/api/importfood", importAnagrafica);


/////////////////////////  Errore /////////////////////////////////////
router.get("/api/:idsagra/errori", allErrori)
router.post("/api/posterrore", InserisciErrore)


////////////////////////// Esauriti ////////////////////////////////
router.post("/api/importesauriti", importEsauriti);
router.delete("/api/:idsagra/deleteesauriti", deleteAllEsauriti);

////////////////////////// Log ////////////////////////////////
router.post("/api/log", Infolog)

// export default router
export default router;








