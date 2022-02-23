INSERT INTO public.category (name)
VALUES ('electronics'),('cloths'),('fashion accessories'),('footwear'),('gadgets'),('personal care'),('others');

INSERT INTO public.products
(sku_id, name, id_category)
SELECT 
random() * 49 + 1,
'Product ' || n as name,
floor(random()*((SELECT COUNT(*) FROM public.category)-1))+1
FROM generate_series(1, 1000) as n;