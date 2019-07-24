# Host: localhost  (Version: 5.5.53)
# Date: 2019-07-24 18:02:49
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
# Structure for table "pro_brand"
#

CREATE TABLE `pro_brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `BrandName` varchar(32) NOT NULL DEFAULT '',
  `BrandEnName` varchar(32) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

#
# Data for table "pro_brand"
#

REPLACE INTO `pro_brand` VALUES (1,'华为','huawei'),(2,'OPPO','oppo'),(3,'VIVO','vivo'),(4,'小米','xiaomi'),(5,'苹果','apple,iphone');

#
# Structure for table "pro_detail"
#

CREATE TABLE `pro_detail` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "pro_detail"
#


#
# Structure for table "pro_infor"
#

CREATE TABLE `pro_infor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeId` int(11) NOT NULL,
  `brandId` int(11) NOT NULL,
  `pname` varchar(32) NOT NULL,
  `pedition` varchar(32) DEFAULT NULL,
  `pcolor` varchar(16) DEFAULT NULL,
  `unitPrice` decimal(10,2) DEFAULT NULL,
  `salePrice` decimal(10,2) DEFAULT NULL,
  `pImg` varchar(64) DEFAULT '/upload/product/default_icon.png',
  `pslogan` varchar(32) DEFAULT NULL,
  `isHot` tinyint(1) DEFAULT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pname` (`pname`),
  KEY `typeId` (`typeId`),
  KEY `brandId` (`brandId`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

#
# Data for table "pro_infor"
#

REPLACE INTO `pro_infor` VALUES (1,1,1,'华为P30 PRO','全网通8G+128G','天空之镜',5499.00,5288.00,'/upload/product/0002.png','超感光徕卡三摄',1,'2019-07-23 16:55:17'),(2,1,1,'华为P30','全网通8G+64G','赤茶橘',3999.00,3888.00,'/upload/product/0001.png','逆光智能自拍',1,'2019-07-23 16:55:37'),(3,1,5,'Apple iPhone XR','内存128G','黑色',6499.00,5399.00,'/upload/product/0003.png','无线充电|面容ID|双卡双待',1,'2019-07-23 17:30:51'),(4,1,5,'Apple iPhone 7','公开版128GB','玫瑰金色',3299.00,2949.00,'/upload/product/0004.png','A10芯|ios系统|指纹识别',0,'2019-07-24 15:19:54'),(5,1,2,'OPPO Reno','官方标配6G+128G','星云紫',2599.00,2488.00,'/upload/product/0005.png','美颜自拍|双卡双待',1,'2019-07-24 15:17:03'),(6,1,2,'OPPO K3','标准版8G+128G','晨曦白',1899.00,1699.00,'/upload/product/0006.png','升降摄像头|VOOC闪充',0,'2019-07-24 15:19:30'),(7,1,3,'vivo Z5x','官方标配6G+128G','极光色',1698.00,1598.00,'/upload/product/0007.png','极点全面屏|强续航',1,'2019-07-24 15:21:39'),(8,1,3,'vivo iQQQ Neo','官方标配6G+128G','碳纤黑',1998.00,1899.00,'/upload/product/0008.png','液冷散热|超大电池',0,'2019-07-24 15:24:13'),(9,1,4,'小米MI 8','官方标配6G+128G','黑色',1888.00,1799.00,'/upload/product/0009.png','全面屏|后置双摄|屏下指纹',0,'2019-07-24 15:27:29');

#
# Structure for table "pro_type"
#

CREATE TABLE `pro_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(8) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Data for table "pro_type"
#

REPLACE INTO `pro_type` VALUES (1,'手机'),(2,'平板'),(3,'电脑'),(4,'鼠标'),(5,'键盘'),(6,'耳机');

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
