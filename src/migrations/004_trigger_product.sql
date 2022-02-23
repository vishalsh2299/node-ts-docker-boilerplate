
DROP TRIGGER IF EXISTS modified_by_changes on products;

/* ============================================================================================== */
/* TRIGGER FUNCTION: set_modified_by_user_at_date() bind to gems table                                             */
/* ============================================================================================== */
CREATE TRIGGER modified_by_changes
BEFORE UPDATE
ON products
FOR EACH ROW
EXECUTE PROCEDURE public.set_modified_by_user_at_date();

