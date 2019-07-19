# Host: localhost  (Version: 5.5.53)
# Date: 2019-07-19 13:38:31
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "code"
#

CREATE TABLE `code` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `value` char(3) DEFAULT NULL,
  `url` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

#
# Data for table "code"
#

REPLACE INTO `code` VALUES (1,'309','1'),(2,'356','2'),(3,'378','3'),(4,'419','4'),(5,'487','5'),(6,'414','6'),(7,'322','7'),(8,'431','8'),(9,'305','9'),(10,'496','10'),(11,'352','11'),(12,'500','12'),(13,'400','13'),(14,'385','14'),(15,'376','15'),(16,'411','16'),(17,'491','17'),(18,'391','18'),(19,'313','19'),(20,'468','20'),(21,'396','21'),(22,'408','22'),(23,'401','23'),(24,'383','24'),(25,'466','25'),(26,'440','26');

#
# Structure for table "user_infor"
#

CREATE TABLE `user_infor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` smallint(6) NOT NULL,
  `uname` varchar(8) NOT NULL,
  `uphone` char(11) DEFAULT NULL,
  `utel` char(12) DEFAULT NULL,
  `uicon` varchar(64) DEFAULT 'upload/user/default_icon.png',
  `uadd` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uname` (`uname`),
  KEY `uid` (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

#
# Data for table "user_infor"
#

REPLACE INTO `user_infor` VALUES (1,1,'张三',NULL,NULL,'upload/user/default_icon.png',NULL),(2,2,'李四',NULL,NULL,'upload/user/default_icon.png',NULL),(3,3,'赵武',NULL,NULL,'upload/user/default_icon.png',NULL),(4,4,'马陆',NULL,NULL,'upload/user/default_icon.png',NULL),(5,5,'杨大局',NULL,NULL,'upload/user/default_icon.png',NULL),(6,6,'杨凯廷',NULL,NULL,'upload/user/default_icon.png',NULL),(7,7,'李晓宇',NULL,NULL,'upload/user/default_icon.png',NULL),(8,8,'李芬',NULL,NULL,'upload/user/default_icon.png',NULL),(9,9,'叶波',NULL,NULL,'upload/user/default_icon.png',NULL),(10,10,'王之兰',NULL,NULL,'upload/user/default_icon.png',NULL),(11,11,'',NULL,NULL,'upload/user/default_icon.png',NULL),(12,12,'张思义',NULL,NULL,'upload/user/default_icon.png',NULL);

#
# Structure for table "user_reg"
#

CREATE TABLE `user_reg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(8) NOT NULL,
  `upwd` varchar(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uname` (`uname`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

#
# Data for table "user_reg"
#

REPLACE INTO `user_reg` VALUES (1,'张三','123456'),(2,'李四','123456'),(3,'赵武','123456'),(4,'马陆','123456'),(5,'杨大局','123456'),(6,'杨凯廷','123456'),(7,'李晓宇','123456'),(8,'李芬','123456'),(9,'叶波','123456'),(10,'王之兰','123456'),(11,'',''),(12,'张思义','123456');
