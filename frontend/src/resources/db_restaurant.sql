-- db_restaurant.billdetails definition

CREATE TABLE `billdetails` (
  `id_sagra` varchar(5) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `food_id` varchar(5) NOT NULL,
  `item_qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_sagra`,`bill_id`,`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.billstatus definition

CREATE TABLE `billstatus` (
  `id_sagra` varchar(5) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `bill_tavolo` varchar(255) DEFAULT NULL,
  `bill_coperti` text DEFAULT NULL,
  `bill_when` varchar(255) DEFAULT NULL,
  `bill_method` varchar(255) DEFAULT NULL,
  `bill_discount` int(11) DEFAULT NULL,
  `bill_delivery` int(11) DEFAULT NULL,
  `bill_total` float DEFAULT NULL,
  `bill_paid` varchar(255) DEFAULT NULL,
  `bill_status` int(11) DEFAULT NULL,
  `TipoCassa` varchar(1) DEFAULT NULL,
  `Nominativo` varchar(50) DEFAULT NULL,
  `bill_note` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_sagra`,`bill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.bookstatus definition

CREATE TABLE `bookstatus` (
  `id_sagra` varchar(5) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `book_tavolo` varchar(255) DEFAULT NULL,
  `book_coperti` text DEFAULT NULL,
  `book_when` varchar(255) DEFAULT NULL,
  `book_method` varchar(255) DEFAULT NULL,
  `book_discount` int(11) DEFAULT NULL,
  `book_delivery` int(11) DEFAULT NULL,
  `book_total` float DEFAULT NULL,
  `book_paid` varchar(255) DEFAULT NULL,
  `book_status` int(11) DEFAULT NULL,
  `book_tipocassa` varchar(1) DEFAULT NULL,
  `book_nominativo` varchar(50) DEFAULT NULL,
  `book_phone` varchar(50) DEFAULT NULL,
  `book_note` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_sagra`,`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.booktable definition

CREATE TABLE `booktable` (
  `id_sagra` varchar(5) NOT NULL,
  `book_id` int(5) NOT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `book_phone` varchar(255) DEFAULT NULL,
  `book_people` int(11) DEFAULT NULL,
  `book_tables` int(11) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `book_when` varchar(255) DEFAULT NULL,
  `book_note` text DEFAULT NULL,
  PRIMARY KEY (`id_sagra`,`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.cart definition

CREATE TABLE `cart` (
  `user_id` varchar(20) NOT NULL,
  `food_id` varchar(5) NOT NULL,
  `item_qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.catalogo_sagre definition

CREATE TABLE `catalogo_sagre` (
  `id_sagra` varchar(5) NOT NULL,
  `descrizione` varchar(255) NOT NULL,
  `desc_prefix` varchar(10) DEFAULT NULL,
  `flgPrenotazioni` tinyint(1) NOT NULL DEFAULT 0,
  `flgTavoli` tinyint(1) NOT NULL DEFAULT 0,
  `flgAsporto` tinyint(1) NOT NULL DEFAULT 0,
  `flgEliminacode` tinyint(1) NOT NULL DEFAULT 0,
  `info` varchar(255) NOT NULL,
  `flgInfo` tinyint(1) NOT NULL DEFAULT 0,
  `numcoda` int(10) unsigned NOT NULL DEFAULT 99,
  `nstartprt` int(10) unsigned NOT NULL DEFAULT 500,
  `linkSito` varchar(100) DEFAULT NULL,
  `StrOrdini` varchar(10) NOT NULL DEFAULT '011',
  `MaskVisibilita` varchar(10) NOT NULL DEFAULT '1111000110',
  `MaskObbligo` varchar(10) NOT NULL DEFAULT '1100000100',
  PRIMARY KEY (`id_sagra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- db_restaurant.errors definition

CREATE TABLE `errors` (
  `id_sagra` varchar(5) NOT NULL,
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `tiposegnalazione` varchar(50) NOT NULL,
  `tipoerr` varchar(50) NOT NULL,
  `descrizione` varchar(500) NOT NULL,
  `telefono` varchar(25) DEFAULT NULL,
  `modello` varchar(25) DEFAULT NULL,
  `os` varchar(25) DEFAULT NULL,
  `versioneos` varchar(25) DEFAULT NULL,
  `browser` varchar(25) DEFAULT NULL,
  `versionebr` varchar(25) DEFAULT NULL,
  `Webkit` varchar(25) DEFAULT NULL,
  `versionewk` varchar(25) DEFAULT NULL,
  `connessione` varchar(100) DEFAULT NULL,
  `err_ora` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`,`id_sagra`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.esauriti definition

CREATE TABLE `esauriti` (
  `id_sagra` varchar(5) NOT NULL,
  `food_id` varchar(5) NOT NULL,
  `QtaDisponibile` int(10) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_sagra`,`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.food definition

CREATE TABLE `food` (
  `id_sagra` varchar(5) NOT NULL,
  `food_id` varchar(5) NOT NULL,
  `food_name` varchar(255) DEFAULT NULL,
  `food_star` varchar(255) DEFAULT NULL,
  `food_vote` varchar(255) DEFAULT NULL,
  `food_price` varchar(255) DEFAULT NULL,
  `food_discount` varchar(255) DEFAULT NULL,
  `food_desc` varchar(255) DEFAULT NULL,
  `food_status` varchar(255) DEFAULT NULL,
  `food_type` varchar(255) DEFAULT NULL,
  `food_category` varchar(255) DEFAULT NULL,
  `food_src` varchar(255) DEFAULT NULL,
  `IdReparto` varchar(1) DEFAULT NULL,
  `FlgDisabled` tinyint(1) DEFAULT 0,
  `FlgValidita` tinyint(1) DEFAULT 0,
  `DataInizioValidita` varchar(10) DEFAULT NULL,
  `DataFineValidita` varchar(10) DEFAULT NULL,
  `FlgPrenotabile` tinyint(1) DEFAULT 0,
  `DataFinePRT` varchar(10) DEFAULT NULL,
  `FlgVariante` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id_sagra`,`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.reparti definition

CREATE TABLE `reparti` (
  `id_sagra` varchar(5) NOT NULL,
  `idReparto` varchar(5) NOT NULL,
  `descReparto` varchar(25) NOT NULL,
  `peso` int(5) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_sagra`,`idReparto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.`user` definition

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(50) DEFAULT NULL,
  `user_password` varchar(50) DEFAULT NULL,
  `id_sagra` varchar(5) NOT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `authlevel` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`,`id_sagra`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.bookdetails definition

CREATE TABLE `bookdetails` (
  `id_sagra` varchar(5) NOT NULL,
  `book_id` int(11) NOT NULL,
  `food_id` varchar(5) NOT NULL,
  `item_qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_sagra`,`book_id`,`food_id`),
  CONSTRAINT `bookdetails_FK` FOREIGN KEY (`id_sagra`,`book_id`) REFERENCES `bookstatus` (`id_sagra`,`book_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;