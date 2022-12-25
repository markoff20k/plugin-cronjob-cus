DELIMITER $$
CREATE TRIGGER update_user_commision 
    AFTER INSERT  ON tracking FOR EACH ROW
BEGIN
	DECLARE dem int;
    SELECT count(id) into dem from distributed where member_id = NEW.referral_id and currency_id = NEW.currency_id;
    if(dem > 0) then update distributed set amount = amount + NEW.total_commision, updated_at = sysdate() where member_id = NEW.member_id and currency_id = NEW.currency_id;
    else insert into distributed(member_id, currency_id, amount, created_at, updated_at) values(NEW.referral_id, NEW.currency_id, NEW.total_commision, NEW.scan_at, NEW.scan_at);
    end if;
END
$$
DELIMITER ;
