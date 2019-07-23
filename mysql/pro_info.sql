SET NAMES UTF8;
SHOW DATABASES;

USE qianli;


CREATE TABLE pro_infor(
    id INT PRIMARY KEY AUTO_INCREMENT,
    typeId INT NOT NULL,
    brandId INT NOT NULL,

    pname VARCHAR(32) UNIQUE NOT NULL,
    pedition VARCHAR(32),
    pcolor VARCHAR(16),
    pImg VARCHAR(64) DEFAULT 'upload/product/default_icon.png',
    pslogan VARCHAR(32),
    isHot BOOL,
    createTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(typeId) REFERENCES pro_type(id),
    FOREIGN KEY(brandId) REFERENCES pro_brand(id)
);
SHOW TABLES;