-- create table users
CREATE TABLE users (
  id_user serial NOT NULL PRIMARY KEY, 
  name varchar(45) NOT NULL, 
  lastname varchar(45) NOT NULL, 
  username varchar(45) NOT NULL UNIQUE, 
  email varchar(100) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  isadmin boolean NOT NULL DEFAULT FALSE,
  islogged boolean NOT NULL DEFAULT FALSE,
  last_logged_date TIMESTAMPTZ NOT NULL,
  image varchar(255)
);
--create table categories
CREATE TABLE categories (
    id_category serial NOT NULL PRIMARY KEY,
    name varchar(45) NOT NULL UNIQUE 
);

--create table providers
CREATE TABLE providers (
    id_provider serial NOT NULL PRIMARY KEY,
    name varchar(45) NOT NULL UNIQUE, 
    cif varchar(45) NOT NULL UNIQUE,
    address varchar(100) NOT NULL UNIQUE
);

--create table product with providerID
CREATE TABLE products (
    id_product serial NOT NULL PRIMARY KEY,
    name varchar(45) NOT NULL UNIQUE, 
    price int NOT NULL,
    description varchar NOT NULL,
    id_category int NOT NULL,
    id_provider int NOT NULL,
    FOREIGN KEY (id_category) REFERENCES categories(id_category) ON DELETE CASCADE,
    FOREIGN KEY (id_provider) REFERENCES providers(id_provider) ON DELETE CASCADE,
    image varchar(255) NOT NULL
);


--Read todos los usuarios
SELECT id_user, name, lastname, username, image, password, isadmin
FROM users

--Buscar ususarios por email
SELECT id_user, name, lastname, username, image, password, isadmin
FROM public.users
WHERE email='email@jonas.com'

--Crear usuario
INSERT INTO public.users(name, lastname, username, email, password, image, isadmin, islogged)
VALUES 
('Tomás', 'T', 'tomy', 'email@tomas.com', '123456', 'imagentomas.jpg', false, false);

--Actualizar usuarios por email
UPDATE users 
SET 
    name='Jony',
    lastname='Villanueva',
    username='jonybravo',
    email='email@jonas.com',
    password='123456',
    image='imagenjonas.jpg',
    isadmin='false'
WHERE email='email@jonas.com'

--Borrar usuario
DELETE FROM users
WHERE email='email@jonas.com'

-- add categories
INSERT INTO categories (name)
VALUES 
('Agua y refrescos'), 
('Arroz, legumbres y pasta'), 
('Bodega'), 
('Carne'), 
('Cereales y galletas'), 
('Charcutería y quesos'), 
('Fruta y verdura'), 
('Huevos, leche y mantequilla'), 
('Pan y bollería'), 
('Pasta y arroz')

-- add providers
INSERT INTO providers (name, cif, address)
VALUES 
    ('Agua Pura S.A.', 'A12345678', 'Calle Agua 1, Madrid' ),
    ('Refrescos del Sur S.L.', 'B23456789', 'Avenida Limón 24, Sevilla' ),
    ('Jugos Naturales SL', 'C34567890', 'Calle Naranja 8, Valencia' ),
    ('Pasta y Legumbres S.A.', 'D45678901', 'Calle Pasta 12, Barcelona' ),
    ('Aceites Finos SL', 'E56789012', 'Avenida Oliva 9, Córdoba' ),
    ('Vinos y Vinagres SL', 'F67890123', 'Calle Vino 15, Logroño' ),
    ('Carnes del Norte SL', 'G78901234', 'Calle Res 18, Bilbao' ),
    ('Charcutería Ibérica S.A.', 'H89012345', 'Calle Jamón 20, Salamanca' ),
    ('Quesos Manchegos S.L.', 'I90123456', 'Avenida Queso 5, Ciudad Real' ),
    ('Frutas Frescas S.L.', 'J01234567', 'Calle Manzana 30, Murcia' ),
    ('Verduras del Campo S.A.', 'K12345678', 'Avenida Tomate 7, Almería' ),
    ('Lácteos del Valle S.L.', 'L23456789', 'Calle Leche 11, Oviedo' ),
    ('Huevo Fresco SL', 'M34567890', 'Avenida Huevo 4, Zaragoza' ),
    ('Mantequillas Artesanas SL', 'N45678901', 'Calle Mantequilla 22, Pamplona' ),
    ('Pescados del Mar S.A.', 'O56789012', 'Calle Pescado 2, Vigo' ),
    ('Panadería Artesanal SL', 'P67890123', 'Avenida Pan 10, Toledo' ),
    ('Pastelería Dulce SL', 'Q78901234', 'Calle Pastel 19, Granada' ),
    ('Limpieza Total S.A.', 'R89012345', 'Calle Limpieza 25, Santander' ),
    ('Hogar Limpio SL', 'S90123456', 'Avenida Limpieza 17, Burgos' ),
    ('Mariscos del Atlántico S.A.', 'T01234567', 'Calle Marisco 14, A Coruña' ),
    ('Agua y Refrescos Unidos S.L.', 'U12345678', 'Avenida Agua 28, Málaga' ),
    ('Legumbres del País SL', 'V23456789', 'Calle Lentejas 3, Salamanca' ),
    ('Aceites y Vinagres Gourmet SL', 'W34567890', 'Avenida Gourmet 16, Tarragona'),
    ('Carnes Premium S.A.', 'X45678901', 'Calle Res 6, Barcelona' ),
    ('Quesos y Charcutería SL', 'Y56789012', 'Calle Queso 21, Valladolid' ),
    ('Frutas del Valle SL', 'Z67890123', 'Avenida Fruta 13, Valencia' ),
    ('Verduras Frescas S.A.', 'A89012345', 'Calle Verdura 8, Huelva' ),
    ('Lácteos Naturales SL', 'B90123456', 'Avenida Leche 12, León' ),
    ('Huevos de Oro SL', 'C01234567', 'Calle Huevo 29, Jaén' ),
    ('Mariscos y Pescados SL', 'D12345678', 'Avenida Marisco 20, Cádiz')



   INSERT INTO products (name, id_category, price, description, id_provider, image)
VALUES
    ('Agua Mineral 1L', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 1.00,'Agua mineral natural', (SELECT id_provider FROM providers WHERE name='Agua Pura S.A.'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Refresco de Cola 330ml', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 0.80,'Refresco sabor cola', (SELECT id_provider FROM providers WHERE name='Refrescos del Sur S.L.'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Zumo de Naranja 1L', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 1.50,'Zumo de naranja natural', (SELECT id_provider FROM providers WHERE name='Jugos Naturales SL'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Agua con Gas 500ml', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 1.20,'Agua mineral con gas', (SELECT id_provider FROM providers WHERE name='Agua Pura S.A.'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Refresco de Limón 330ml', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 0.80,'Refresco sabor limón', (SELECT id_provider FROM providers WHERE name='Refrescos del Sur S.L.'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Zumo de Manzana 1L', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 1.50,'Zumo de manzana natural', (SELECT id_provider FROM providers WHERE name='Jugos Naturales SL'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Agua Mineral 5L', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 2.50,'Agua mineral natural', (SELECT id_provider FROM providers WHERE name='Agua y Refrescos Unidos S.L.'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Refresco de Naranja 330ml', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 0.80,'Refresco sabor naranja', (SELECT id_provider FROM providers WHERE name='Refrescos del Sur S.L.'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Zumo Multifrutas 1L', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 1.50,'Zumo de múltiples frutas', (SELECT id_provider FROM providers WHERE name='Jugos Naturales SL'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Agua Mineral 2L', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 1.50,'Agua mineral natural', (SELECT id_provider FROM providers WHERE name='Agua Pura S.A.'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Refresco de Uva 330ml', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 0.80,'Refresco sabor uva', (SELECT id_provider FROM providers WHERE name='Refrescos del Sur S.L.'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Zumo de Piña 1L', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 1.50,'Zumo de piña natural', (SELECT id_provider FROM providers WHERE name='Jugos Naturales SL'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Agua Mineral con Limón 1L', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 1.20,'Agua mineral con sabor a limón', (SELECT id_provider FROM providers WHERE name='Agua y Refrescos Unidos S.L.'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Refresco de Manzana 330ml', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 0.80,'Refresco sabor manzana', (SELECT id_provider FROM providers WHERE name='Refrescos del Sur S.L.'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Zumo de Melocotón 1L', (SELECT id_category FROM categories WHERE name='Agua y refrescos'), 1.50,'Zumo de melocotón natural', (SELECT id_provider FROM providers WHERE name='Jugos Naturales SL'), 'https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg'),
    ('Arroz Integral 1kg', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 2.00,'Arroz integral de grano largo', (SELECT id_provider FROM providers WHERE name='Pasta y Legumbres S.A.'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Lentejas 500g', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 1.50,'Lentejas pardinas', (SELECT id_provider FROM providers WHERE name='Legumbres del País SL'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Pasta de Trigo 500g', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 1.20,'Pasta de trigo sémola', (SELECT id_provider FROM providers WHERE name='Pasta y Legumbres S.A.'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Garbanzos 500g', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 1.50,'Garbanzos secos', (SELECT id_provider FROM providers WHERE name='Legumbres del País SL'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Arroz Basmati 1kg', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 2.50,'Arroz basmati aromático', (SELECT id_provider FROM providers WHERE name='Pasta y Legumbres S.A.'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Judías Blancas 500g', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 1.80,'Judías blancas secas', (SELECT id_provider FROM providers WHERE name='Legumbres del País SL'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Espaguetis 500g', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 1.20,'Espaguetis de trigo', (SELECT id_provider FROM providers WHERE name='Pasta y Legumbres S.A.'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Alubias Rojas 500g', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 1.80,'Alubias rojas secas', (SELECT id_provider FROM providers WHERE name='Legumbres del País SL'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Arroz Jazmín 1kg', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 2.50,'Arroz jazmín aromático', (SELECT id_provider FROM providers WHERE name='Pasta y Legumbres S.A.'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Lentejas Rojas 500g', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 1.50,'Lentejas rojas partidas', (SELECT id_provider FROM providers WHERE name='Legumbres del País SL'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Macarrones 500g', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 1.20,'Macarrones de trigo', (SELECT id_provider FROM providers WHERE name='Pasta y Legumbres S.A.'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Garbanzos Cocidos 500g', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 1.50,'Garbanzos cocidos en conserva', (SELECT id_provider FROM providers WHERE name='Legumbres del País SL'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Arroz Arborio 1kg', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 3.00,'Arroz especial para risotto', (SELECT id_provider FROM providers WHERE name='Pasta y Legumbres S.A.'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Judías Verdes 500g', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 1.80,'Judías verdes frescas', (SELECT id_provider FROM providers WHERE name='Legumbres del País SL'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Fideos 500g', (SELECT id_category FROM categories WHERE name='Arroz, legumbres y pasta'), 1.20,'Fideos de trigo', (SELECT id_provider FROM providers WHERE name='Pasta y Legumbres S.A.'),'https://st3.depositphotos.com/23848204/35714/i/600/depositphotos_357141038-stock-photo-chickpeas-corn-rice-bread-slices.jpg' ),
    ('Aceite de Oliva 1L', (SELECT id_category FROM categories WHERE name='Bodega'), 5.00,'Aceite de oliva extra virgen', (SELECT id_provider FROM providers WHERE name='Aceites Finos SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Vinagre de Vino 500ml', (SELECT id_category FROM categories WHERE name='Bodega'), 2.00,'Vinagre de vino tinto', (SELECT id_provider FROM providers WHERE name='Vinos y Vinagres SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Aceitunas Verdes 200g', (SELECT id_category FROM categories WHERE name='Bodega'), 1.50,'Aceitunas verdes sin hueso', (SELECT id_provider FROM providers WHERE name='Aceites Finos SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Vino Tinto 750ml', (SELECT id_category FROM categories WHERE name='Bodega'), 8.00,'Vino tinto reserva', (SELECT id_provider FROM providers WHERE name='Vinos y Vinagres SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Aceite de Girasol 1L', (SELECT id_category FROM categories WHERE name='Bodega'), 2.50,'Aceite de girasol refinado', (SELECT id_provider FROM providers WHERE name='Aceites Finos SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Vinagre de Manzana 500ml', (SELECT id_category FROM categories WHERE name='Bodega'), 2.00,'Vinagre de manzana', (SELECT id_provider FROM providers WHERE name='Vinos y Vinagres SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Aceitunas Negras 200g', (SELECT id_category FROM categories WHERE name='Bodega'), 1.50,'Aceitunas negras sin hueso', (SELECT id_provider FROM providers WHERE name='Aceites Finos SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Vino Blanco 750ml', (SELECT id_category FROM categories WHERE name='Bodega'), 8.00,'Vino blanco seco', (SELECT id_provider FROM providers WHERE name='Vinos y Vinagres SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Aceite de Coco 500ml', (SELECT id_category FROM categories WHERE name='Bodega'), 4.50,'Aceite de coco virgen', (SELECT id_provider FROM providers WHERE name='Aceites Finos SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Vinagre Balsámico 500ml', (SELECT id_category FROM categories WHERE name='Bodega'), 3.00,'Vinagre balsámico de Módena', (SELECT id_provider FROM providers WHERE name='Vinos y Vinagres SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Aceitunas Rellenas 200g', (SELECT id_category FROM categories WHERE name='Bodega'), 2.00,'Aceitunas rellenas de pimiento', (SELECT id_provider FROM providers WHERE name='Aceites Finos SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Vino Rosado 750ml', (SELECT id_category FROM categories WHERE name='Bodega'), 8.00,'Vino rosado afrutado', (SELECT id_provider FROM providers WHERE name='Vinos y Vinagres SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Aceite de Sésamo 500ml', (SELECT id_category FROM categories WHERE name='Bodega'), 4.00,'Aceite de sésamo tostado', (SELECT id_provider FROM providers WHERE name='Aceites y Vinagres Gourmet SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Vinagre de Arroz 500ml', (SELECT id_category FROM categories WHERE name='Bodega'), 2.50,'Vinagre de arroz japonés', (SELECT id_provider FROM providers WHERE name='Vinos y Vinagres SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Aceite de Almendra 500ml', (SELECT id_category FROM categories WHERE name='Bodega'), 5.00,'Aceite de almendra dulce', (SELECT id_provider FROM providers WHERE name='Aceites y Vinagres Gourmet SL'),'https://st.depositphotos.com/1177973/2300/i/600/depositphotos_23003076-stock-photo-original-glass-bottles-with-salad.jpg' ),
    ('Carne de Res 1kg', (SELECT id_category FROM categories WHERE name='Carne'), 10.00,'Carne de res fresca', (SELECT id_provider FROM providers WHERE name='Carnes del Norte SL'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Pollo Entero 1.5kg', (SELECT id_category FROM categories WHERE name='Carne'), 8.00,'Pollo entero fresco', (SELECT id_provider FROM providers WHERE name='Carnes Premium S.A.'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Carne de Cerdo 1kg', (SELECT id_category FROM categories WHERE name='Carne'), 7.00,'Carne de cerdo fresca', (SELECT id_provider FROM providers WHERE name='Carnes del Norte SL'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Pechuga de Pollo 1kg', (SELECT id_category FROM categories WHERE name='Carne'), 9.00,'Pechuga de pollo fresca', (SELECT id_provider FROM providers WHERE name='Carnes Premium S.A.'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Carne Molida de Res 1kg', (SELECT id_category FROM categories WHERE name='Carne'), 8.50,'Carne molida de res', (SELECT id_provider FROM providers WHERE name='Carnes del Norte SL'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Chuletas de Cerdo 1kg', (SELECT id_category FROM categories WHERE name='Carne'), 8.00,'Chuletas de cerdo frescas', (SELECT id_provider FROM providers WHERE name='Carnes Premium S.A.'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Muslos de Pollo 1kg', (SELECT id_category FROM categories WHERE name='Carne'), 7.50,'Muslos de pollo frescos', (SELECT id_provider FROM providers WHERE name='Carnes del Norte SL'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Costillas de Cerdo 1kg', (SELECT id_category FROM categories WHERE name='Carne'), 9.00,'Costillas de cerdo frescas', (SELECT id_provider FROM providers WHERE name='Carnes Premium S.A.'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Filete de Res 1kg', (SELECT id_category FROM categories WHERE name='Carne'), 12.00,'Filete de res fresco', (SELECT id_provider FROM providers WHERE name='Carnes del Norte SL'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Alitas de Pollo 1kg', (SELECT id_category FROM categories WHERE name='Carne'), 7.00,'Alitas de pollo frescas', (SELECT id_provider FROM providers WHERE name='Carnes Premium S.A.'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Solomillo de Cerdo 1kg', (SELECT id_category FROM categories WHERE name='Carne'), 11.00,'Solomillo de cerdo fresco', (SELECT id_provider FROM providers WHERE name='Carnes del Norte SL'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Pavo Entero 3kg', (SELECT id_category FROM categories WHERE name='Carne'), 20.00,'Pavo entero fresco', (SELECT id_provider FROM providers WHERE name='Carnes Premium S.A.'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Carne de Cordero 1kg', (SELECT id_category FROM categories WHERE name='Carne'), 15.00,'Carne de cordero fresca', (SELECT id_provider FROM providers WHERE name='Carnes del Norte SL'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Bistec de Res 1kg', (SELECT id_category FROM categories WHERE name='Carne'), 12.50,'Bistec de res fresco', (SELECT id_provider FROM providers WHERE name='Carnes Premium S.A.'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Chorizo de Cerdo 500g', (SELECT id_category FROM categories WHERE name='Carne'), 6.00,'Chorizo de cerdo fresco', (SELECT id_provider FROM providers WHERE name='Carnes del Norte SL'), 'https://st5.depositphotos.com/1001069/67441/i/600/depositphotos_674419826-stock-photo-various-raw-meat-fish-steaks.jpg' ),
    ('Cereales de Maíz 500g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 2.50,'Cereales de maíz', (SELECT id_provider FROM providers WHERE name='Cereales del Sol SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Galletas de Chocolate 300g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 3.00,'Galletas con trozos de chocolate', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Avena 1kg', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 2.00,'Avena en hojuelas', (SELECT id_provider FROM providers WHERE name='Cereales del Sol SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Galletas Digestivas 400g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 2.50,'Galletas digestivas integrales', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Cereales de Trigo 500g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 2.50,'Cereales de trigo', (SELECT id_provider FROM providers WHERE name='Cereales del Sol SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Galletas de Avena 300g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 3.00,'Galletas con avena', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Muesli 750g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 3.50,'Muesli con frutas y nueces', (SELECT id_provider FROM providers WHERE name='Cereales del Sol SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Galletas Saladas 300g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 2.00,'Galletas saladas', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Cereales de Arroz 500g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 2.50,'Cereales de arroz', (SELECT id_provider FROM providers WHERE name='Cereales del Sol SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Galletas de Coco 300g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 3.00,'Galletas con coco rallado', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Cereales Multigrano 500g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 3.00,'Cereales multigrano', (SELECT id_provider FROM providers WHERE name='Cereales del Sol SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Galletas Integrales 400g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 2.50,'Galletas integrales', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Cereales con Frutas 500g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 3.00,'Cereales con frutas deshidratadas', (SELECT id_provider FROM providers WHERE name='Cereales del Sol SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Galletas de Mantequilla 300g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 3.00,'Galletas de mantequilla', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Cereales de Avena 500g', (SELECT id_category FROM categories WHERE name='Cereales y galletas'), 2.50,'Cereales de avena', (SELECT id_provider FROM providers WHERE name='Cereales del Sol SL'),'https://st2.depositphotos.com/3433891/6700/i/600/depositphotos_67004315-stock-photo-heap-of-oats-and-biscuits.jpg' ),
    ('Jamón Serrano 100g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 3.00,'Jamón serrano en lonchas', (SELECT id_provider FROM providers WHERE name='Charcutería Ibérica S.A.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Queso Manchego 200g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 5.00,'Queso manchego curado', (SELECT id_provider FROM providers WHERE name='Quesos Manchegos S.L.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Chorizo Ibérico 150g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 4.00,'Chorizo ibérico en rodajas', (SELECT id_provider FROM providers WHERE name='Charcutería Ibérica S.A.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Queso de Cabra 200g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 5.00,'Queso de cabra semicurado', (SELECT id_provider FROM providers WHERE name='Quesos Manchegos S.L.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Salchichón Ibérico 150g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 4.00,'Salchichón ibérico en rodajas', (SELECT id_provider FROM providers WHERE name='Charcutería Ibérica S.A.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Queso Azul 150g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 4.00,'Queso azul fuerte', (SELECT id_provider FROM providers WHERE name='Quesos Manchegos S.L.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Lomo Embuchado 100g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 3.50,'Lomo embuchado en lonchas', (SELECT id_provider FROM providers WHERE name='Charcutería Ibérica S.A.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Queso Emmental 200g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 4.50,'Queso emmental suizo', (SELECT id_provider FROM providers WHERE name='Quesos Manchegos S.L.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Morcilla Ibérica 150g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 3.50,'Morcilla ibérica en rodajas', (SELECT id_provider FROM providers WHERE name='Charcutería Ibérica S.A.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Queso Brie 200g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 5.00,'Queso brie francés', (SELECT id_provider FROM providers WHERE name='Quesos Manchegos S.L.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Sobrasada 150g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 3.00,'Sobrasada mallorquina', (SELECT id_provider FROM providers WHERE name='Charcutería Ibérica S.A.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Queso de Oveja 200g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 5.50,'Queso de oveja curado', (SELECT id_provider FROM providers WHERE name='Quesos Manchegos S.L.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Salami 150g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 3.50,'Salami en rodajas', (SELECT id_provider FROM providers WHERE name='Charcutería Ibérica S.A.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Queso Parmesano 150g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 5.50,'Queso parmesano italiano', (SELECT id_provider FROM providers WHERE name='Quesos Manchegos S.L.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Fuet 150g', (SELECT id_category FROM categories WHERE name='Charcutería y quesos'), 3.00,'Fuet catalán', (SELECT id_provider FROM providers WHERE name='Charcutería Ibérica S.A.'),'https://static6.depositphotos.com/1004868/644/i/450/depositphotos_6447420-stock-photo-italian-cheese-and-salami.jpg' ),
    ('Manzanas 1kg', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 2.50,'Manzanas rojas frescas', (SELECT id_provider FROM providers WHERE name='Frutas Frescas S.L.'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Tomates 1kg', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 2.00,'Tomates frescos', (SELECT id_provider FROM providers WHERE name='Verduras del Campo S.A.'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Plátanos 1kg', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 2.50,'Plátanos maduros', (SELECT id_provider FROM providers WHERE name='Frutas Frescas S.L.'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Zanahorias 1kg', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 1.80,'Zanahorias frescas', (SELECT id_provider FROM providers WHERE name='Verduras del Campo S.A.'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Peras 1kg', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 2.50,'Peras verdes frescas', (SELECT id_provider FROM providers WHERE name='Frutas del Valle SL'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Pepinos 1kg', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 2.00,'Pepinos frescos', (SELECT id_provider FROM providers WHERE name='Verduras del Campo S.A.'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Naranjas 1kg', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 2.50,'Naranjas frescas', (SELECT id_provider FROM providers WHERE name='Frutas del Valle SL'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Lechuga 1 unidad', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 1.50,'Lechuga fresca', (SELECT id_provider FROM providers WHERE name='Verduras del Campo S.A.'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Fresas 500g', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 3.00,'Fresas frescas', (SELECT id_provider FROM providers WHERE name='Frutas Frescas S.L.'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Pimientos 1kg', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 2.20,'Pimientos frescos', (SELECT id_provider FROM providers WHERE name='Verduras del Campo S.A.'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Kiwis 1kg', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 3.50,'Kiwis frescos', (SELECT id_provider FROM providers WHERE name='Frutas del Valle SL'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Calabacines 1kg', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 2.00,'Calabacines frescos', (SELECT id_provider FROM providers WHERE name='Verduras del Campo S.A.'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Uvas 1kg', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 3.00,'Uvas frescas', (SELECT id_provider FROM providers WHERE name='Frutas del Valle SL'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Berenjenas 1kg', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 2.20,'Berenjenas frescas', (SELECT id_provider FROM providers WHERE name='Verduras del Campo S.A.'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Cerezas 500g', (SELECT id_category FROM categories WHERE name='Fruta y verdura'), 4.00,'Cerezas frescas', (SELECT id_provider FROM providers WHERE name='Frutas del Valle SL'),'https://st.depositphotos.com/1593759/2652/i/600/depositphotos_26521407-stock-photo-set-of-different-fruits-and.jpg' ),
    ('Huevos XL 12 unidades', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 3.00,'Huevos frescos tamaño XL', (SELECT id_provider FROM providers WHERE name='Huevo Fresco SL'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Leche Entera 1L', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 1.20,'Leche entera fresca', (SELECT id_provider FROM providers WHERE name='Lácteos del Valle S.L.'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Mantequilla con Sal 250g', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 2.00,'Mantequilla con sal', (SELECT id_provider FROM providers WHERE name='Mantequillas Artesanas SL'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Huevos M 12 unidades', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 2.50,'Huevos frescos tamaño M', (SELECT id_provider FROM providers WHERE name='Huevo Fresco SL'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Leche Desnatada 1L', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 1.20,'Leche desnatada fresca', (SELECT id_provider FROM providers WHERE name='Lácteos del Valle S.L.'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Mantequilla sin Sal 250g', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 2.00,'Mantequilla sin sal', (SELECT id_provider FROM providers WHERE name='Mantequillas Artesanas SL'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Huevos Camperos 12 unidades', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 3.50,'Huevos frescos de gallinas camperas', (SELECT id_provider FROM providers WHERE name='Huevos de Oro SL'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Leche Semidesnatada 1L', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 1.20,'Leche semidesnatada fresca', (SELECT id_provider FROM providers WHERE name='Lácteos del Valle S.L.'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Mantequilla Ecológica 250g', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 3.00,'Mantequilla ecológica', (SELECT id_provider FROM providers WHERE name='Mantequillas Artesanas SL'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Huevos de Codorniz 24 unidades', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 4.00,'Huevos frescos de codorniz', (SELECT id_provider FROM providers WHERE name='Huevos de Oro SL'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Leche de Cabra 1L', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 2.00,'Leche fresca de cabra', (SELECT id_provider FROM providers WHERE name='Lácteos Naturales SL'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Margarina 250g', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 1.50,'Margarina vegetal', (SELECT id_provider FROM providers WHERE name='Mantequillas Artesanas SL'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Huevos L 12 unidades', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 3.00,'Huevos frescos tamaño L', (SELECT id_provider FROM providers WHERE name='Huevo Fresco SL'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Leche sin Lactosa 1L', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 1.50,'Leche fresca sin lactosa', (SELECT id_provider FROM providers WHERE name='Lácteos del Valle S.L.'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Mantequilla con Ajo 250g', (SELECT id_category FROM categories WHERE name='Huevos, leche y mantequilla'), 2.50,'Mantequilla con ajo', (SELECT id_provider FROM providers WHERE name='Mantequillas Artesanas SL'), 'https://st.depositphotos.com/1169330/4138/i/600/depositphotos_41389437-stock-photo-dairy-products.jpg' ),
    ('Pan Integral 1 unidad', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 2.00,'Pan integral fresco', (SELECT id_provider FROM providers WHERE name='Panadería La Espiga'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Croissants 4 unidades', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 3.00,'Croissants recién hechos', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Pan Blanco 1 unidad', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 1.50,'Pan blanco fresco', (SELECT id_provider FROM providers WHERE name='Panadería La Espiga'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Napolitanas de Chocolate 2 unidades', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 2.50,'Napolitanas rellenas de chocolate', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Pan de Centeno 1 unidad', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 2.00,'Pan de centeno fresco', (SELECT id_provider FROM providers WHERE name='Panadería La Espiga'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Donuts 6 unidades', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 3.00,'Donuts glaseados', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Pan de Avena 1 unidad', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 2.00,'Pan de avena fresco', (SELECT id_provider FROM providers WHERE name='Panadería La Espiga'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Palmeras de Chocolate 2 unidades', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 2.50,'Palmeras cubiertas de chocolate', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Pan de Espelta 1 unidad', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 2.50,'Pan de espelta fresco', (SELECT id_provider FROM providers WHERE name='Panadería La Espiga'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Muffins de Arándanos 4 unidades', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 3.50,'Muffins con arándanos frescos', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Pan de Molde 1 unidad', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 1.80,'Pan de molde blanco', (SELECT id_provider FROM providers WHERE name='Panadería La Espiga'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Pan Rústico 1 unidad', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 2.20,'Pan rústico fresco', (SELECT id_provider FROM providers WHERE name='Panadería La Espiga'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Eclairs de Vainilla 2 unidades', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 3.00,'Eclairs rellenos de crema de vainilla', (SELECT id_provider FROM providers WHERE name='Pastelería Dulce SL'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Pan de Queso 1 unidad', (SELECT id_category FROM categories WHERE name='Pan y bollería'), 2.00,'Pan con trozos de queso', (SELECT id_provider FROM providers WHERE name='Panadería La Espiga'), 'https://st.depositphotos.com/1011514/1833/i/600/depositphotos_18339921-stock-photo-baked-goods.jpg' ),
    ('Espaguetis 500g', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 1.50,'Espaguetis de trigo duro', (SELECT id_provider FROM providers WHERE name='Pasta Fresca S.L.' ), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg'),
    ('Arroz Basmati 1kg', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 3.00,'Arroz basmati', (SELECT id_provider FROM providers WHERE name='Arroces del Mundo S.A.' ), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg'),
    ('Macarrones 500g', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 1.50,'Macarrones de trigo duro', (SELECT id_provider FROM providers WHERE name='Pasta Fresca S.L.' ), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg'),
    ('Arroz Integral 1kg', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 2.50,'Arroz integral', (SELECT id_provider FROM providers WHERE name='Arroces del Mundo S.A.' ), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg'),
    ('Fusilli 500g', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 1.50,'Fusilli de trigo duro', (SELECT id_provider FROM providers WHERE name='Pasta Fresca S.L.' ), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg'),
    ('Arroz Arborio 1kg', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 3.50,'Arroz arborio', (SELECT id_provider FROM providers WHERE name='Arroces del Mundo S.A.' ), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg'),
    ('Penne 500g', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 1.50,'Penne de trigo duro', (SELECT id_provider FROM providers WHERE name='Pasta Fresca S.L.' ), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg'),
    ('Arroz Bomba 1kg', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 3.00,'Arroz bomba', (SELECT id_provider FROM providers WHERE name='Arroces del Mundo S.A.' ), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg'),
    ('Linguini 500g', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 1.50,'Linguini de trigo duro', (SELECT id_provider FROM providers WHERE name='Pasta Fresca S.L.' ), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg'),
    ('Arroz Jazmín 1kg', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 3.00,'Arroz jazmín', (SELECT id_provider FROM providers WHERE name='Arroces del Mundo S.A.' ), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg'),
    ('Lasaña 500g', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 1.50,'Placas de lasaña', (SELECT id_provider FROM providers WHERE name='Pasta Fresca S.L.' ), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg'),
    ('Arroz Salvaje 500g', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 4.00,'Arroz salvaje', (SELECT id_provider FROM providers WHERE name='Arroces del Mundo S.A.' ), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg'),
    ('Raviolis de Queso 500g', (SELECT id_category FROM categories WHERE name='Pasta y arroz'), 4.00,'Raviolis rellenos de queso', (SELECT id_provider FROM providers WHERE name='Pasta Fresca S.L.'), 'https://static3.depositphotos.com/1003264/184/i/600/depositphotos_1846371-stock-photo-pasta-variety.jpg')
    


    