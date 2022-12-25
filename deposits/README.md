# LuKuTex Cronjob


## 1. License

Please note, that LuKuTex API license only allows Commercial use of this component. Please contact us at bussiness@lukutex.com.

## 2. Install dependencies

```bash
$ npm install
```

## 3. Run in developement mode

```bash
$ npm run dev
```
This command will also start an api backend on localhost for helping development.
Default local address: http://localhost:3000

## 4. Database

CREATE TABLE `parent_currencies` (
  `id` varchar(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `blockchain_key` varchar(32) DEFAULT NULL,
  `type` varchar(30) NOT NULL DEFAULT 'coin',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `child_currencies` (
  `id` varchar(10) NOT NULL,
  `parent_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `blockchain_key` varchar(32) DEFAULT NULL,
  `type` varchar(30) NOT NULL DEFAULT 'coin',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `deposit_tracking` (
  `deposit_id` int NOT NULL,
  `member_id` int NOT NULL,
  `amount` decimal(32,16) NOT NULL,
  `parent_currency` varchar(10) NOT NULL,
  `child_currency` varchar(10) NOT NULL,
  `parent_balance` decimal(32,16) NOT NULL,
  `child_balance` decimal(32,16) NOT NULL,
  `new_parent_balance` decimal(32,16) NOT NULL,
  `new_child_balance` decimal(32,16) NOT NULL,
  `scan_at` datetime NOT NULL,
  PRIMARY KEY (`deposit_id`),
  CONSTRAINT `fk_deposit_id` FOREIGN KEY (`deposit_id`) REFERENCES `peatio_production`.`deposits` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
