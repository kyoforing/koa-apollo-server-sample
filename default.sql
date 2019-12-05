CREATE TABLE `authors` (
  `author_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `text` varchar(45) DEFAULT NULL,
  `status` enum('DRAFT','PUBLIC') DEFAULT 'DRAFT',
  PRIMARY KEY (`post_id`),
  KEY `fk_author_idx` (`author_id`),
  CONSTRAINT `fk_author` FOREIGN KEY (`author_id`) REFERENCES `authors` (`author_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
