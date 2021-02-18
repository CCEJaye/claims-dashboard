CREATE TABLE IF NOT EXISTS `claims` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `year` INT DEFAULT NULL,
  `month` TEXT DEFAULT NULL,
  `total_from_start` INT DEFAULT NULL,
  `brought_forward` INT DEFAULT NULL,
  `new_claims` INT DEFAULT NULL,
  `previous_backlog` INT DEFAULT NULL,
  `reopened_in_month` INT DEFAULT NULL,
  `closed` INT DEFAULT NULL,
  `carried_forward` INT DEFAULT NULL,
  `settled_at_nil` INT DEFAULT NULL,
  `settled_claims` INT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `claims` (`year`, `month`, `total_from_start`, `brought_forward`, `new_claims`, `previous_backlog`, `reopened_in_month`, `closed`, `carried_forward`, `settled_at_nil`, `settled_claims`) VALUES
	(2020, "October", 8, 2, 15, 0, 0, 12, 3, 10, 11),
	(2020, "November", 5, 3, 8, 0, 1, 7, 1, 5, 7),
	(2020, "December", 4, 1, 21, 3, 3, 15, 0, 10, 12),
	(2021, "January", 7, 0, 12, 1, 0, 12, 2, 11, 11),
	(2021, "February", 5, 2, 3, 0, 3, 1, 0, 1, 1),
	(2021, "March", 6, 2, 14, 1, 2, 9, 1, 8, 5);