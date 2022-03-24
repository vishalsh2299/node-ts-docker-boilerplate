/* ============================================================================================== */
/* FUNCTION: __current_user()                                                                     */
/* ============================================================================================== */
DROP FUNCTION IF EXISTS public.__current_user ();

CREATE OR REPLACE FUNCTION public.__current_user()
RETURNS INTEGER AS
    $BODY$
DECLARE
	UserID INTEGER = -1;
BEGIN
	SELECT id
	INTO STRICT
	UserID FROM public.users WHERE username = current_setting
	('testingdb.username');
RETURN UserID;

EXCEPTION
WHEN UNDEFINED_OBJECT THEN
RETURN (SELECT id
FROM public.users
WHERE username = 'user_default');

WHEN NO_DATA_FOUND THEN
RETURN (SELECT id
FROM public.users
WHERE username = 'user_default');

WHEN TOO_MANY_ROWS THEN
RETURN (SELECT id
FROM public.users
WHERE username = 'user_default');
END;
    $BODY$
LANGUAGE plpgsql VOLATILE
COST 100;



/* ============================================================================================== */
/* INHERITED TABLE: __creation_log                                                                */
/* ============================================================================================== */
DROP TABLE IF EXISTS public.__creation_log;

CREATE TABLE public.__creation_log (
  created_by integer NOT NULL DEFAULT __current_user (),
  created_date timestamp NOT NULL DEFAULT TIMEZONE('UTC'::text, NOW())
)
WITH (
  OIDS = FALSE
);

ALTER TABLE public.__creation_log OWNER TO CURRENT_USER;


/* ============================================================================================== */
/* INHERITED TABLE: __modification_log                                                            */
/* ============================================================================================== */
DROP TABLE IF EXISTS public.__modification_log;

CREATE TABLE public.__modification_log (
  modified_by integer,
  modified_date timestamp
)
WITH (
  OIDS = FALSE
);

COMMENT ON TABLE public.__modification_log IS 'This TABLE is for inheritance use only. It is NOT intended to contain its own data.';

ALTER TABLE public.__modification_log OWNER TO CURRENT_USER;


/* ============================================================================================== */
/* TRIGGER FUNCTION: set_modified_by_user_at_date()                                               */
/* ============================================================================================== */
DROP FUNCTION IF EXISTS public.set_modified_by_user_at_date ();

CREATE OR REPLACE FUNCTION public.set_modified_by_user_at_date ()
  RETURNS TRIGGER
  AS $BODY$
BEGIN
  NEW.modified_date = NOW() AT TIME ZONE 'UTC';
  NEW.modified_by = __current_user ();
  RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql
VOLATILE
COST 100;

ALTER FUNCTION public.set_modified_by_user_at_date () OWNER TO CURRENT_USER;


/*==============================================================*/
/* TABLE: users                                                 */
/*==============================================================*/
CREATE TABLE public.users (
  id serial NOT NULL,
  username varchar NOT NULL,
  hashpass varchar NOT NULL,
  CONSTRAINT pk_users PRIMARY KEY (id),
  CONSTRAINT ak_user_username UNIQUE (username)
)
INHERITS (
  public.__creation_log,
  public.__modification_log
)
WITH (
  OIDS = FALSE
);


INSERT INTO public.users (created_by, id, username, hashpass) 
  VALUES (1, 1, 'user_default', 'user_default');