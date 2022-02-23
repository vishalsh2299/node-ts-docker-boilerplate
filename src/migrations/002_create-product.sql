
CREATE TABLE IF NOT EXISTS public.category(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR UNIQUE
)
INHERITS (public.__creation_log, public.__modification_log)
WITH (OIDS=FALSE);


CREATE TABLE IF NOT EXISTS public.products(
    id SERIAL NOT NULL,
    sku_id INTEGER CHECK(sku_id >=1 and sku_id <= 50),
    name VARCHAR,
    sequence_no SERIAL,
    id_category INTEGER,
    is_enabled boolean DEFAULT TRUE,
    CONSTRAINT fk_type FOREIGN KEY (id_category) REFERENCES public.category (id)
)
INHERITS (public.__creation_log, public.__modification_log)
WITH (OIDS=FALSE);
