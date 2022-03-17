CREATE VIEW view_product_data AS
SELECT
    products.id,
    products.name,
    products.sku_id,
    products.sequence_no,
    json_build_object(
            'id', category.id,
            'name', category.name
        ) as category,
    products.is_enabled,
    json_build_object(
            'id', users.id,
            'name', users.username
        ) as created_by,
    products.created_date,
    json_build_object(
            'id', u.id,
            'name', u.username
        ) as modified_by,
    products.modified_date
FROM products
LEFT OUTER JOIN category ON products.id_category = category.id
LEFT OUTER JOIN users ON users.id = products.created_by
LEFT OUTER JOIN users as u ON u.id = products.modified_by;