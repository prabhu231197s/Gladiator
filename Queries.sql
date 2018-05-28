CREATE TABLE `users` (
  `userid` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `age` int(50) NOT NULL,
  `weight` int(50) NOT NULL,
  `email` varchar(500) NOT NULL,
  `phonenumber` bigint(10) NOT NULL,
  `password` varchar(500) NOT NULL,
  `gender` varchar(500) NOT NULL DEFAULT 'Female',
  `dojo` int(10) NOT NULL,
  `points` int(100) DEFAULT '0',
  `belt` int(10) DEFAULT NULL,
  `eventcount` int(10) DEFAULT '0',
  `medalswon` int(10) DEFAULT '0',
  `admin` int(1) DEFAULT '0',
  `role` int(10) DEFAULT '1',
  `ecash` int(100) DEFAULT '0',
  `blockflag` int(1) DEFAULT '1',
  `loggedin` int(1) DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phonenumber` (`phonenumber`),
  KEY `role` (`role`),
  KEY `dojo` (`dojo`),
  KEY `belt` (`belt`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`roleid`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`dojo`) REFERENCES `dojo` (`dojoid`),
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`belt`) REFERENCES `belt` (`beltid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

truncate sessionstrore;

CREATE TABLE `dojo` (
  `dojoid` int(50) NOT NULL,
  `dojo` varchar(50) NOT NULL,
  `city` int(10) NOT NULL,
  PRIMARY KEY (`dojoid`),
  KEY `city` (`city`),
  CONSTRAINT `dojo_ibfk_1` FOREIGN KEY (`city`) REFERENCES `city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table tokenMap(
`id` int(255) not null primary key auto_increment,
`email` varchar(500) not null unique,
`token` varchar(500) not null,
Foreign Key(email) references users(email)
);

create table sessionStore(
`id` int(255) not null primary key auto_increment,
`email` varchar(500) not null,
`sessionid` varchar(500) not null,
`sessiontoken` varchar(500) not null,
`expiry` bigint(50) not null
);

select * from eventmap;

select * from sessionstore;
select * from users;
set foreign_key_checks=1;
drop table users;
select * from cashrequests;
select * from tokenmap;

CREATE TABLE `roles` (
  `roleId` int(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY (`roleid`),
  UNIQUE KEY `role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `belt` (
  `beltid` int(50) NOT NULL,
  `belt` varchar(50) NOT NULL,
  PRIMARY KEY (`beltid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

select * from roles;
select * from dojo;
select * from city;
select * from belt;

create table tokenmap(
`id` int(255) not null primary key auto_increment,
`email` varchar(255) not null,
`token` varchar(255) not null,
`expiry` bigint(50) not null,
foreign key(email) references users(email)
);

create table cashrequests(
`id` int(255) not null primary key auto_increment,
`email` varchar(500) not null,
`cash` float not null,
`paid` int(10) not null default 0
);

create table events(
`id` int(255) not null primary key auto_increment,
`eventname` varchar(500) not null unique,
`gender` varchar(500) not null,
`category` int(255) not null,
`cash` float not null,
foreign key(category) references category(id)
);

create table category(
`id` int(255) not null primary key auto_increment,
`category` varchar(500) not null
);


select * from events;
select * from users;
select * from eventmap;

create table query(
`id` int(255) not null primary key auto_increment,
`name` varchar(500) not null,
`email` varchar(500) not null,
`address` varchar(500) not null,
`comments` varchar(500) not null
);

select * from query;
select * from sessionstore;
select * from users;


truncate sessionstore;

select * from tokenmap;
select * from users;

select * from users;

select * from events where eventname='Kata';

create table eventmap(
`id` int(255) not null primary key auto_increment,
`event` int(255) not null,
`email` varchar(500) not null,
foreign key(email) references users(email),
foreign key(event) references events(id)
);
drop table eventmap;

CREATE TABLE `city` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;