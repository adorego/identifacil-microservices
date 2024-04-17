INSERT INTO departamento(id,codigo,nombre) VALUES (1,'00','ASUNCIÓN');
INSERT INTO departamento(id,codigo,nombre) VALUES (2,'01','CONCEPCIÓN');
INSERT INTO departamento(id,codigo,nombre) VALUES (3,'02','SAN PEDRO');
INSERT INTO departamento(id,codigo,nombre) VALUES (4,'03','CORDILLERA');
INSERT INTO departamento(id,codigo,nombre) VALUES (5,'04','GUAIRÁ');
INSERT INTO departamento(id,codigo,nombre) VALUES (6,'05','CAAGUAZÚ');
INSERT INTO departamento(id,codigo,nombre) VALUES (7,'06','CAAZAPÁ');
INSERT INTO departamento(id,codigo,nombre) VALUES (8,'07','ITAPÚA');
INSERT INTO departamento(id,codigo,nombre) VALUES (9,'08','MISIONES');
INSERT INTO departamento(id,codigo,nombre) VALUES (10,'09','PARAGUARÍ');
INSERT INTO departamento(id,codigo,nombre) VALUES (11,'10','ALTO PARANÁ');
INSERT INTO departamento(id,codigo,nombre) VALUES (12,'11','CENTRAL');
INSERT INTO departamento(id,codigo,nombre) VALUES (13,'12','ÑEEMBUCÚ');
INSERT INTO departamento(id,codigo,nombre) VALUES (14,'13','AMAMBAY');
INSERT INTO departamento(id,codigo,nombre) VALUES (15,'14','CANINDEYÚ');
INSERT INTO departamento(id,codigo,nombre) VALUES (16,'15','PRESIDENTE HAYES');
INSERT INTO departamento(id,codigo,nombre) VALUES (17,'16','BOQUERÓN');
INSERT INTO departamento(id,codigo,nombre) VALUES (18,'17','ALTO PARAGUAY');

INSERT INTO hecho_punible(id,nombre,codigo) VALUES (1,'HECHOS PUNIBLES CONTRA LA VIDA','00');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (3,'HECHOS PUNIBLES CONTRA LA LIBERTAD','02');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (4,'HECHOS PUNIBLES CONTRA LA AUTONOMIA SEXUAL','03');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (5,'HECHOS PUNIBLES CONTRA MENORES','04');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (6,'HECHOS PUNIBLES CONTRA EL AMBITO DE VIDA Y LA INTIMIDAD DE LA PERSONA','05');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (7,'HECHOS PUNIBLES CONTRA EL HONOR Y LA REPUTACION','06');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (8,'HECHOS PUNIBLES CONTRA LOS BIENES DE LA PERSONA','07');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (9,'HECHOS PUNIBLES CONTRA OTROS DERECHOS PATRIMONIALES','08');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (10,'HECHOS PUNIBLES CONTRA EL PATRIMONIO','09');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (11,'HECHOS PUNIBLES CONTRA LA RESTITUCION DE BIENES','10');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (12,'HECHOS PUNIBLES CONTRA LAS BASES NATURALES DE LA VIDA HUMANA','11');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (13,'HECHOS PUNIBLES CONTRA LA SEGURIDAD DE LAS PERSONAS FRENTE A RIESGOS COLECTIVOS','12');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (14,'HECHOS PUNIBLES CONTRA LA SEGURIDAD DE LAS PERSONAS EN EL TRANSITO','13');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (15,'HECHOS PUNIBLES CONTRA EL FUNCIONAMIENTO DE INSTALACIONES IMPRESCINDIBLES','14');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (16,'HECHOS PUNIBLES CONTRA EL ESTADO CIVIL, EL MATRIMONIO Y LA FAMILIA','15');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (17,'HECHOS PUNIBLES CONTRA EL ESTADO CIVIL, EL MATRIMONIO Y LA FAMILIA','16');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (18,'HECHOS PUNIBLES CONTRA LA PAZ DE LOS DIFUNTOS','17');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (19,'HECHOS PUNIBLES CONTRA LA TOLERANCIA RELIGIOSA','18');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (20,'HECHOS PUNIBLES CONTRA LA SEGURIDAD DE LA CONVIVENCIA DE LAS PERSONAS','19');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (21,'HECHOS PUNIBLES CONTRA LA PRUEBA TESTIMONIAL','20');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (22,'HECHOS PUNIBLES CONTRA LA PRUEBA DOCUMENTAL','21');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (23,'HECHOS PUNIBLES CONTRA EL ERARIO','22');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (24,'HECHOS PUNIBLES CONTRA LA AUTENTICIDAD DE MONEDAS Y VALORES','23');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (26,'HECHOS PUNIBLES CONTRA LA EXISTENCIA DEL ESTADO','25');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (27,'HECHOS PUNIBLES CONTRA LA CONSTITUCIONALIDAD DEL ESTADO Y EL SISTEMA ELECTORAL','26');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (28,'HECHOS PUNIBLES CONTRA LA SEGURIDAD EXTERNA DEL ESTADO','27');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (29,'HECHOS PUNIBLES CONTRA ORGANOS CONSTITUCIONALES','28');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (30,'HECHOS PUNIBLES CONTRA LA DEFENSA DE LA REPÚBLICA','29');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (31,'HECHOS CONTRA LA ADMINISTRACION DE JUSTICIA','30');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (32,'HECHOS PUNIBLES CONTRA LA ADMINISTRACION PUBLICA','31');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (33,'HECHOS PUNIBLES CONTRA EL EJERCICIO DE FUNCIONES PÚBLICAS','32');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (34,'GENOCIDIO Y CRIMENES DE GUERRA','33');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (35,'INFRACCIÓN A LA LEY 1340/88','34');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (36,'LEY N° 4.036 DE ARMAS DE FUEGO, SUS PIEZAS Y COMPONENTES, MUNICIONES, EXPLOSIVOS, ACCESORIOS Y AFINES.','35');
INSERT INTO hecho_punible(id,nombre,codigo) VALUES (37,'Ley Nº 5777 / DE PROTECCIÓN INTEGRAL A LAS MUJERES, CONTRA TODA FORMA DE VIOLENCIA','36');

INSERT INTO causa_judicial(id,nombre,codigo,'hechoPunibleId') VALUES(1,$Causa_DESC,$Cod_Causa,$Hecho_Punible_Id)
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(1,'Homicidio doloso','01',1);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(2,'Homicidio motivado por súplica de la víctima','02',1);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(3,'Homicidio culposo','03',1);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(4,'Suicidio','04',1);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(5,'Muerte indirecta por estado de necesidad en el parto','05',1);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(6,'Maltrato físico','01',2);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(7,'Lesión','02',2);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(8,'Lesión grave','03',2);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(9,'Lesión culposa','04',2);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(10,'Consentimiento','05',2);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(11,'Composición','06',2);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(12,' Reproche reducido','07',2);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(13,'Omisión de auxilio','08',2);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(14,'Indemnización','09',2);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(15,'Abandono','10',2);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(16,'Coacción','01',3);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(17,'Coacción grave','02',3);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(18,'Amenaza','03',3);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(19,'Tratamiento médico sin consentimiento','04',3);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(20,'Privación de libertad','05',3);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(21,'Extrañamiento de personas','06',3);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(22,'Secuestro','07',3);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(23,'Toma de rehenes','08',3);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(24,'Coacción sexual','01',4);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(25,'Trata de personas','02',4);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(26,'Abuso sexual en personas indefensas','03',4);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(27,'Abuso sexual en personas internadas','04',4);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(28,'Actos exhibicionistas','05',4);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(29,'Acoso sexual','06',4);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(30,'Maltrato de menores','01',5);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(31,'Abuso sexual en niños','02',5);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(32,' Abuso sexual en personas bajo tutela','03',5);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(33,'Estupro','04',5);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(34,'Actos homosexuales con menores','05',5);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(35,'Proxenetismo','06',5);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(36,'Rufianería','07',5);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(37,'Violación de domicilio','01',6);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(38,' Invasión de inmueble ajeno','02',6);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(39,' Lesión de la intimidad de la persona','03',6);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(40,' Lesión del derecho a la comunicación y a la imagen','04',6);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(41,'Violación de la confidencialidad de la palabra','05',6);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(42,'Violación del secreto de la comunicación','06',6);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(43,'Revelación de un secreto de carácter privado','07',6);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(44,'Revelación de secretos privados por funcionarios o personas con obligación especial','08',6);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(45,'Revelación de secretos privados por motivos económicos','09',6);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(46,'Calumnia','01',7);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(47,'Difamación','02',7);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(48,'Injuria','03',7);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(49,'Denigración de la memoria de un muerto','04',7);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(50,'Penas adicionales a las previstas','05',7);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(51,'Reproche reducido','06',7);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(52,'Instancia','07',7);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(53,'Daño','01',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(54,'Daño a cosas de interés común','02',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(55,'Daño a obras construidas o medios técnicos de trabajo','03',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(56,'Apropiación','04',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(57,'Hurto','05',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(58,'Hurto agravado','06',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(59,'Abigeato','07',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(60,'Hurto especialmente grave','08',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(61,'Hurto agravado en banda','09',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(62,'Robo','10',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(63,'Robo agravado','11',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(64,'Robo con resultado de muerte o lesión grave','12',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(65,'Hurto seguido de violencia','13',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(66,'Uso no autorizado de un vehículo automotor','14',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(67,' Persecución de hechos en el ámbito familiar o doméstico','15',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(68,'Persecución de hechos bagatelarios','16',8);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(69,'Sustracción de energía eléctrica','01',9);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(70,'Alteración de datos','02',9);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(71,'Sabotaje de computadoras','03',9);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(72,'Obstrucción al resarcimiento por daños en accidente de tránsito','04',9);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(73,'Frustración de la ejecución individual','05',9);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(74,'Conducta conducente a la quiebra','06',9);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(75,'Conducta indebida en situaciones de crisis','07',9);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(76,'Casos graves','08',9);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(77,'Violación del deber de llevar libros de comercio','09',9);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(78,'Favorecimiento de acreedores','10',9);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(79,'Favorecimiento del deudor','11',9);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(80,'Violación del derecho de autor o inventor','12',9);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(81,'Extorsión','01',10);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(82,'Extorsión agravada','02',10);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(83,'Estafa','03',10);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(84,'Operaciones fraudulentas por computadora','04',10);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(85,'Aprovechamiento clandestino de una prestación','05',10);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(86,'Siniestro con intención de estafa','06',10);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(87,'Promoción fraudulenta de inversiones','07',10);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(88,'Lesión de confianza','08',10);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(89,'Usura','09',10);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(90,'Obstrucción a la restitución de bienes','01',11);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(91,'Reducción','02',11);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(92,'Lavado de dinero','03',11);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(93,' Ensuciamiento y alteración de las aguas','01',12);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(94,'Contaminación del aire','02',12);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(95,'Maltrato de suelos','03',12);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(96,'Procesamiento ilícito de desechos','04',12);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(97,'Ingreso de sustancias nocivas en el territorio nacional','05',12);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(98,'Perjuicio a reservas naturales','06',12);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(99,'Producción de riesgos comunes','01',13);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(100,'Actividades peligrosas en la construcción','02',13);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(101,'Exposición de personas a lugares de trabajo peligrosos','03',13);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(102,'Comercialización de medicamentos nocivos','04',13);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(103,'Comercialización de medicamentos no autorizados','05',13);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(104,'Comercialización de alimentos nocivos','06',13);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(105,'Comercialización y uso no autorizados de sustancias químicas','07',13);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(106,'Comercializaron de objetos peligrosos','08',13);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(107,'Desistimiento activo','09',13);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(108,' Envenenamiento de cosas de uso común','10',13);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(109,'Atentados al trafico civil aéreo y naval','01',14);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(110,' Intervenciones peligrosas en el tránsito aéreo, naval y ferroviario','02',14);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(111,'Exposición a peligro del tráfico aéreo, naval y ferroviario','03',14);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(112,'Intervenciones peligrosas en el tránsito terrestre','04',14);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(113,'Exposición a peligro del tránsito terrestre','05',14);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(114,'Perturbación de servicios públicos','01',15);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(115,'Daño a instalaciones hidráulicas','02',15);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(116,' Perturbación de instalaciones de telecomunicaciones','03',15);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(117,'Falseamiento del estado civil','01',16);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(118,'Violación de las reglas de adopción','02',17);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(119,'Tráfico de menores','03',17);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(120,'Bigamia','04',17);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(121,' Incumplimiento del deber legal alimentario','05',17);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(122,'Violación del deber de cuidado o educación','06',17);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(123,'Violación del deber de cuidado de ancianos o discapacitados','07',17);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(124,'Violación de la patria potestad','08',17);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(125,'Violencia familiar','09',17);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(126,'Incesto','10',17);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(127,'Perturbación de la paz de los difuntos','1',18);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(128,'Perturbación de ceremonias fúnebres.','2',18);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(129,'Ultraje a la profesión de creencias','1',19);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(130,'Perturbación de la paz pública','1',20);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(131,'Amenaza de hechos punibles','2',20);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(132,'Desaparición forzosa','3',20);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(133,'Incitación a cometer hechos punibles','4',20);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(134,'Apología del delito','5',20);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(135,'Asociación criminal','6',20);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(136,'Omisión de aviso de un hecho punible','7',20);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(137,' Usurpación de funciones publicas','8',20);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(138,' Testimonio falso','1',21);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(139,'Declaración falsa','2',21);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(140,'Retractación','3',21);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(141,'Declaración en estado de necesidad','4',21);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(142,'Producción de documentos no auténticos','5',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(143,' Manipulación de graficaciones técnicas','6',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(144,'Alteración de datos relevantes para la prueba','7',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(145,' Equiparación para el procesamiento de datos','8',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(146,'Producción inmediata de documentos públicos de contenido falso','9',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(147,'Producción mediata de documentos públicos de contenido falso','10',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(148,' Uso de documentos públicos de contenido falso','11',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(149,'Destrucción o daño a documentos o señales','12',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(150,'Expedición de certificados de salud de contenido falso','13',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(151,'Producción indebida de certificados de salud','14',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(152,'Uso de certificados de salud de contenido falso','15',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(153,'Expedición de certificados sobre méritos y servicios de contenido falso','16',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(154,'Producción indebida de certificados sobre méritos y servicios','17',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(155,'Uso de certificación sobre méritos y servicios de contenido falso','18',22);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(156,'Abuso de documentos de identidad','1',23);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(157,'Evasión de impuestos','2',23);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(158,' Adquisición fraudulenta de subvenciones','3',23);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(159,'Producción de moneda no auténtica','1',24);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(160,'Circulación de moneda no auténtica','2',24);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(161,'Preparación para la producción de moneda y marcas de valor no auténticas','3',24);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(162,'Títulos de valor falsos','4',24);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(163,' Moneda, marcas de valor y títulos de valor del extranjero','5',24);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(164,'Moneda, marcas de valor y títulos de valor del extranjero','6',24);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(165,'Atentado contra la existencia del Estado','1',26);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(166,' Preparación de un atentado contra la existencia del Estado','2',26);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(167,'Preparación de una guerra de agresión','3',26);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(168,'Desistimiento activo','4',26);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(169,'Atentado contra el orden constitucional','1',27);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(170,'Sabotaje','2',27);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(171,'Impedimento de las elecciones','3',27);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(172,'Falseamiento de las elecciones','4',27);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(173,'Falseamiento de documentos electorales','5',27);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(174,'Coerción al elector','6',27);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(175,'Engaño al elector','7',27);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(176,'Soborno del elector','8',27);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(177,'Ambito de aplicación','9',27);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(178,'Traición a la República por revelación de secretos de Estado','01',28);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(179,' Revelación de secretos de Estado','02',28);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(180,'Casos menos graves de revelación','03',28);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(181,'Obtención de secretos de Estado','03',29);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(182,'Coacción a órganos constitucionales','04',29);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(183,'Coacción al Presidente de la República y a los miembros de un órgano constitucional','05',29);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(184,'Sabotaje a los medios de defensa','01',30);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(185,'Denuncia falsa','01',31);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(186,'Publicación de la sentencia','02',31);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(187,' Simulación de un hecho punible','03',31);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(188,'Frustración de la persecución y ejecución pena','04',31);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(189,' Realización del hecho por funcionarios','05',31);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(190,' Liberación de presos','06',31);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(191,'Motín de internos','07',31);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(192,'Resistencia','01',32);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(193,'Afectación de cosas gravadas','02',32);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(194,'Quebrantamiento del deposito','03',32);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(195,'Daño a anuncios oficiales','04',32);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(196,'Cohecho pasivo','01',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(197,'Cohecho pasivo agravado','02',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(198,'Soborno','03',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(199,'Soborno agravado','04',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(200,'Disposiciones adicionales','05',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(201,'Prevaricato','06',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(202,'Traición a la parte','07',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(203,'Lesión corporal en el ejercicio de funciones publicas','08',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(204,'Coacción respecto de declaraciones','09',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(205,'Tortura','10',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(206,' Persecución de inocentes','11',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(207,'Ejecución penal contra inocentes','12',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(208,'Exacción','13',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(209,'Cobro indebido de honorarios','14',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(210,'Infidelidad en el servicio exterior','15',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(211,'Revelación de secretos de servicio','16',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(212,'Difusión de objetos secretos','17',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(213,'Violación del secreto de correo y telecomunicación','18',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(214,'Inducción a un subordinado a un hecho punible','19',33);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(215,'Genocidio','1',34);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(216,'Crímenes de guerra','2',34);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(217,'DEL CONTROL, DE LA COMERCIALIZACIÓN Y DEL SUMINISTRO','1',35);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(218,'DE LA EXPORTACIÓN E IMPORTACIÓN','2',35);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(219,'DE LA TENENCIA, CONSUMO Y MEDIDAS DE SEGURIDAD CURATIVA','3',35);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(220,'DEL EMPLEO ILÍCITO DE BIENES','4',35);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(221,'DEL TRAFICO ILÍCITO Y DE LOS DELITOS CONEXOS','5',35);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(222,'TENENCIA DE ARMAS DE FUEGO Y MUNICIONES','1',36);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(223,'PORTACIÓN DE ARMAS DE FUEGO Y MUNICIONES','2',36);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(224,'TRANSPORTE DE ARMAS DE FUEGO Y MUNICIONES','3',36);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(225,'PÉRDIDA, SUSTRACCIÓN, O DESTRUCCIÓN DE ARMAS DE FUEGO','4',36);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(226,'Violencia feminicida','1',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(227,'Violencia física','2',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(228,'Violencia psicológica','3',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(229,'Violencia sexual','4',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(230,'Violencia contra los derechos reproductivos','5',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(231,'Violencia patrimonial y económica','6',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(232,'Violencia laboral','7',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(233,'Violencia política','8',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(234,'Violencia intrafamiliar','9',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(235,'Violencia obstétrica','10',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(236,'Violencia mediática','11',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(237,'Violencia telemática','12',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(238,'Violencia simbólica','13',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(239,'Violencia Institucional','14',37);
INSERT INTO causa_judicial(id,nombre,codigo,hechoPunibleId) VALUES(240,'Violencia contra la Dignidad','15',37);

INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (1,'00','ASUNCIÓN',1)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (2,'01','CONCEPCIÓN',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (3,'02','BELÉN',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (4,'03','HORQUETA',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (5,'04','LORETO',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (6,'05','SAN CARLOS DEL APA',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (7,'06','SAN LÁZARO',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (8,'07','YBY YA'U',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (9,'08','AZOTE'Y',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (10,'09','SARGENTO JOSÉ FÉLIX LÓPEZ',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (11,'10','SAN ALFREDO',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (12,'11','PASO BARRETO',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (13,'12','ARROYITO',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (14,'13','PASO HORQUETA',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (15,'14','ITACUA',2)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (16,'01','SAN PEDRO DEL YCUAMANDYYÚ',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (17,'02','ANTEQUERA',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (18,'03','CHORÉ',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (19,'04','GENERAL ELIZARDO AQUINO',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (20,'05','ITACURUBÍ DEL ROSARIO',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (21,'06','LIMA',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (22,'07','NUEVA GERMANIA',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (23,'08','SAN ESTANISLAO',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (24,'09','SAN PABLO',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (25,'10','TACUATÍ',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (26,'11','UNIÓN',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (27,'12','25 DE DICIEMBRE',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (28,'13','VILLA DEL ROSARIO',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (29,'14','GENERAL FRANCISCO  RESQUÍN',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (30,'15','YATAITY DEL NORTE',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (31,'16','GUAJAYVI',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (32,'17','CAPIIBARY',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (33,'18','SANTA ROSA DEL AGUARAY',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (34,'19','YRYBUCUA',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (35,'20','LIBERACIÓN',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (36,'21','SAN VICENTE PANCHOLO',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (37,'22','SAN JOSÉ DEL ROSARIO',3)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (38,'01','CAACUPÉ',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (39,'02','ALTOS',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (40,'03','ARROYOS Y ESTEROS',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (41,'04','ATYRÁ',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (42,'05','CARAGUATAY',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (43,'06','EMBOSCADA',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (44,'07','EUSEBIO AYALA',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (45,'08','ISLA PUCÚ',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (46,'09','ITACURUBÍ DE LA CORDILLERA',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (47,'10','JUAN DE MENA',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (48,'11','LOMA GRANDE',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (49,'12','MBOCAYATY DEL YHAGUY',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (50,'13','NUEVA COLOMBIA',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (51,'14','PIRIBEBUY',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (52,'15','PRIMERO DE MARZO',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (53,'16','SAN BERNARDINO',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (54,'17','SANTA ELENA',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (55,'18','TOBATÍ',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (56,'19','VALENZUELA',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (57,'20','SAN JOSÉ OBRERO',4)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (58,'01','VILLARRICA',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (59,'02','BORJA',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (60,'03','CAPITÁN MAURICIO JOSÉ TROCHE',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (61,'04','CORONEL MARTÍNEZ',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (62,'05','FÉLIX PÉREZ CARDOZO',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (63,'06','GRAL. EUGENIO A. GARAY',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (64,'07','INDEPENDENCIA',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (65,'08','ITAPÉ',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (66,'09','ITURBE',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (67,'10','JOSÉ FASSARDI',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (68,'11','MBOCAYATY',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (69,'12','NATALICIO TALAVERA',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (70,'13','ÑUMÍ',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (71,'14','SAN SALVADOR',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (72,'15','YATAITY',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (73,'16','DOCTOR BOTTRELL',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (74,'17','PASO YOBAI',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (75,'18','TEBICUARY',5)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (76,'01','CORONEL OVIEDO',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (77,'02','CAAGUAZÁ',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (78,'03','CARAYAÓ',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (79,'04','DR. CECILIO BÁEZ',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (80,'05','SANTA ROSA DEL MBUTUY',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (81,'06','DR. JUAN MANUEL FRUTOS',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (82,'07','REPATRIACIÓN',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (83,'08','NUEVA LONDRES',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (84,'09','SAN JOAQUÍN',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (85,'10','SAN JOSÉ DE LOS ARROYOS',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (86,'11','YHÚ',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (87,'12','DR. J. EULOGIO ESTIGARRIBIA',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (88,'13','R.I. 3 CORRALES',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (89,'14','RAÁL ARSENIO OVIEDO',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (90,'15','JOSÉ DOMINGO OCAMPOS',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (91,'16','MARISCAL  LÓPEZ',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (92,'17','LA PASTORA',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (93,'18','3 DE FEBRERO',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (94,'19','SIMÓN BOLIVAR',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (95,'20','VAQUERÍA',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (96,'21','TEMBIAPORÁ',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (97,'22','NUEVA TOLEDO',6)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (98,'01','CAAZAPÁ',7)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (99,'02','ABAÍ',7)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (100,'03','BUENA VISTA',7)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (101,'04','DR. MOISÉS S. BERTONI',7)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (102,'05','GRAL. HIGINIO MORINIGO',7)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (103,'06','MACIEL',7)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (104,'07','SAN JUAN NEPOMUCENO',7)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (105,'08','TAVAÍ',7)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (106,'09','YEGROS',7)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (107,'10','YUTY',7)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (108,'11','3 DE MAYO',7)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (109,'01','ENCARNACIÓN',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (110,'02','BELLA VISTA',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (111,'03','CAMBYRETÁ',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (112,'04','CAPITÁN MEZA',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (113,'05','CAPITÁN MIRANDA',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (114,'06','NUEVA ALBORADA',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (115,'07','CARMEN DEL PARANÁ',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (116,'08','CORONEL BOGADO',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (117,'09','CARLOS ANTONIO LÓPEZ',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (118,'10','NATALIO',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (119,'11','FRAM',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (120,'12','GENERAL ARTIGAS',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (121,'13','GENERAL DELGADO',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (122,'14','HOHENAU',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (123,'15','JESÚS',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (124,'16','JOSÉ LEANDRO OVIEDO',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (125,'17','OBLIGADO',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (126,'18','MAYOR JULIO DIONISIO OTAÑO',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (127,'19','SAN COSME Y DAMIÁN',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (128,'20','SAN PEDRO DEL PARANÁ',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (129,'21','SAN RAFAEL DEL PARANÁ',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (130,'22','TRINIDAD',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (131,'23','EDELIRA',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (132,'24','TOMÁS ROMERO PEREIRA',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (133,'25','ALTO VERÁ',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (134,'26','LA PAZ',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (135,'27','YATYTAY',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (136,'28','SAN JUAN DEL PARANÁ',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (137,'29','PIRAPÓ',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (138,'30','ITAPÚA POTY',8)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (139,'01','SAN JUAN BAUTISTA DE LAS MISIONES',9)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (140,'02','AYOLAS',9)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (141,'03','SAN IGNACIO',9)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (142,'04','SAN MIGUEL',9)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (143,'05','SAN PATRICIO',9)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (144,'06','SANTA MARÍA',9)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (145,'07','SANTA ROSA',9)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (146,'08','SANTIAGO',9)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (147,'09','VILLA FLORIDA',9)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (148,'10','YABEBYRY',9)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (149,'01','PARAGUARÍ',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (150,'02','ACAHAY',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (151,'03','CAAPUCÚ',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (152,'04','CABALLERO',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (153,'05','CARAPEGUÁ',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (154,'06','ESCOBAR',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (155,'07','LA COLMENA',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (156,'08','MBUYAPEY',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (157,'09','PIRAYÚ',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (158,'10','QUIINDY',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (159,'11','QUYQUYHÓ',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (160,'12','ROQUE GONZALEZ DE SANTA CRUZ',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (161,'13','SAPUCÁI',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (162,'14','TEBICUARY-MÍ',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (163,'15','YAGUARÓN',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (164,'16','YBYCUÍ',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (165,'17','YBYTYMÍ',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (166,'18','MARÍA ANTONIA',10)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (167,'01','CIUDAD DEL ESTE',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (168,'02','PRESIDENTE FRANCO',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (169,'03','DOMINGO MARTÍNEZ DE IRALA',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (170,'04','DR. JUAN LEÓN MALLORQUÍN',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (171,'05','HERNANDARIAS',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (172,'06','ITAKYRY',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (173,'07','JUAN E. O'LEARY',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (174,'08','ÑACUNDAY',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (175,'09','YGUAZÚ',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (176,'10','LOS CEDRALES',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (177,'11','MINGA GUAZÚ',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (178,'12','SAN CRISTÓBAL',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (179,'13','SANTA RITA',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (180,'14','NARANJAL',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (181,'15','SANTA ROSA DEL MONDAY',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (182,'16','MINGA PORÁ',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (183,'17','MBARACAYÚ',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (184,'18','SAN ALBERTO',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (185,'19','IRUÑA',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (186,'20','SANTA FE DEL PARANÁ',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (187,'21','TAVAPY',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (188,'22','DR. RAÚL PEÑA',11)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (189,'01','AREGUÁ',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (190,'02','CAPIATÁ',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (191,'03','FERNANDO DE LA MORA',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (192,'04','GUARAMBARÉ',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (193,'05','ITÁ',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (194,'06','ITAUGUÁ',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (195,'07','LAMBARÉ',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (196,'08','LIMPIO',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (197,'09','LUQUE',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (198,'10','MARIANO ROQUE ALONSO',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (199,'11','NUEVA ITALIA',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (200,'12','ÑEMBY',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (201,'13','SAN ANTONIO',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (202,'14','SAN LORENZO',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (203,'15','VILLA ELISA',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (204,'16','VILLETA',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (205,'17','YPACARAÍ',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (206,'18','YPANÉ',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (207,'19','J. AUGUSTO SALDÍVAR',12)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (208,'01','PILAR',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (209,'02','ALBERDI',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (210,'03','CERRITO',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (211,'04','DESMOCHADOS',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (212,'05','GRAL. JOSÉ EDUVIGIS DÍAZ',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (213,'06','GUAZÚ-CUÁ',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (214,'07','HUMAITÁ',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (215,'08','ISLA UMBÚ',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (216,'09','LAURELES',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (217,'10','MAYOR JOSÉ DEJESÚS MARTÍNEZ',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (218,'11','PASO DE PATRIA',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (219,'12','SAN JUAN BAUTISTA DE ÑEEMBUCÚ',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (220,'13','TACUARAS',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (221,'14','VILLA FRANCA',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (222,'15','VILLA OLIVA',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (223,'16','VILLALBÍN',13)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (224,'01','PEDRO JUAN CABALLERO',14)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (225,'02','BELLA VISTA',14)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (226,'03','CAPITÁN BADO',14)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (227,'04','ZANJA PYTÁ',14)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (228,'05','KARAPAÍ',14)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (229,'06','CERRO CORA',14)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (230,'01','SALTO DEL GUAIRÁ',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (231,'02','CORPUS CHRISTI',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (232,'03','VILLA CURUGUATY',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (233,'04','VILLA YGATIMÍ',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (234,'05','ITANARÁ',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (235,'06','YPEJHÚ',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (236,'07','FRANCISCO CABALLERO ALVAREZ',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (237,'08','KATUETÉ',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (238,'09','LA PALOMA DEL ESPÍRITU SANTO',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (239,'10','NUEVA ESPERANZA',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (240,'11','YASY CAÑY',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (241,'12','YBYRAROBANÁ',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (242,'13','YBY PYTÁ',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (243,'14','MARACANÁ',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (244,'15','PUERTO ADELA',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (245,'16','LAUREL',15)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (246,'02','BENJAMÍN ACEVAL',16)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (247,'03','PUERTO PINASCO',16)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (248,'04','VILLA HAYES',16)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (249,'05','NANAWA',16)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (250,'06','JOSÉ FALCÓN',16)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (251,'07','TTE. 1RO MANUEL IRALA FERNÁNDEZ',16)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (252,'08','TENIENTE ESTEBAN MARTÍNEZ',16)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (253,'09','GENERAL JOSÉ MARÍA BRUGUEZ',16)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (254,'10','CAMPO ACEVAL',16)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (255,'11','NUEVA ASUNCION',16)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (256,'02','MARISCAL JOSÉ FÉLIX ESTIGARRIBIA',17)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (257,'04','FILADELFIA',17)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (258,'05','LOMA PLATA',17)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (259,'06','BOQUERÓN',17)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (260,'01','FUERTE OLIMPO',18)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (261,'02','PUERTO CASADO',18)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (262,'04','BAHÍA NEGRA',18)
INSERT INTO ciudad(id,codigo,nombre,departamentoId) VALUES (263,'05','CARMELO PERALTA',18)

INSERT INTO pais(id,codigo,nombre) VALUES (1,'024AGO','Angola ');							
INSERT INTO pais(id,codigo,nombre) VALUES (2,'012DZA','Argelia');							
INSERT INTO pais(id,codigo,nombre) VALUES (3,'204BEN','Benín');							
INSERT INTO pais(id,codigo,nombre) VALUES (4,'072BWA','Botsuana');							
INSERT INTO pais(id,codigo,nombre) VALUES (5,'854BFA','Burkina Faso');							
INSERT INTO pais(id,codigo,nombre) VALUES (6,'108BDI','Burundi');							
INSERT INTO pais(id,codigo,nombre) VALUES (7,'132CPV','Cabo Verde');							
INSERT INTO pais(id,codigo,nombre) VALUES (8,'120CMR','Camerún');							
INSERT INTO pais(id,codigo,nombre) VALUES (9,'148TCD','Chad');							
INSERT INTO pais(id,codigo,nombre) VALUES (10,'174COM','Comoras');							
INSERT INTO pais(id,codigo,nombre) VALUES (11,'384CIV','Costa de Marfil');							
INSERT INTO pais(id,codigo,nombre) VALUES (12,'818EGY','Egipto');							
INSERT INTO pais(id,codigo,nombre) VALUES (13,'232ERI','Eritrea');							
INSERT INTO pais(id,codigo,nombre) VALUES (14,'231ETH','Etiopía');							
INSERT INTO pais(id,codigo,nombre) VALUES (15,'266GAB','Gabón');							
INSERT INTO pais(id,codigo,nombre) VALUES (16,'270GMB','Gambia');							
INSERT INTO pais(id,codigo,nombre) VALUES (17,'288GHA','Ghana');							
INSERT INTO pais(id,codigo,nombre) VALUES (18,'324GIN','Guinea');							
INSERT INTO pais(id,codigo,nombre) VALUES (19,'624GNB','Guinea - Bissau');							
INSERT INTO pais(id,codigo,nombre) VALUES (20,'226GNQ','Guinea Ecuatorial');							
INSERT INTO pais(id,codigo,nombre) VALUES (21,'404KEM','Kenia');							
INSERT INTO pais(id,codigo,nombre) VALUES (22,'426LSO','Lesoto');							
INSERT INTO pais(id,codigo,nombre) VALUES (23,'430LBR','Liberia');							
INSERT INTO pais(id,codigo,nombre) VALUES (24,'434LBY','Libia');							
INSERT INTO pais(id,codigo,nombre) VALUES (25,'450MDG','Madagascar');							
INSERT INTO pais(id,codigo,nombre) VALUES (26,'454MWI','Malawi');							
INSERT INTO pais(id,codigo,nombre) VALUES (27,'466MLI','Malí');							
INSERT INTO pais(id,codigo,nombre) VALUES (28,'504MAR','Marruecos');							
INSERT INTO pais(id,codigo,nombre) VALUES (29,'480MUS','Mauricio');							
INSERT INTO pais(id,codigo,nombre) VALUES (30,'478MRT','Mauritania');							
INSERT INTO pais(id,codigo,nombre) VALUES (31,'175MYT','Mayotte');							
INSERT INTO pais(id,codigo,nombre) VALUES (32,'508MOZ','Mozambique');							
INSERT INTO pais(id,codigo,nombre) VALUES (33,'516NAM','Namibia');							
INSERT INTO pais(id,codigo,nombre) VALUES (34,'562NER','Níger');							
INSERT INTO pais(id,codigo,nombre) VALUES (35,'566NGA','Nigeria');							
INSERT INTO pais(id,codigo,nombre) VALUES (36,'140CAF','República Centroafricana');							
INSERT INTO pais(id,codigo,nombre) VALUES (37,'178COG','República del Congo');							
INSERT INTO pais(id,codigo,nombre) VALUES (38,'180COD','República Democrática del Congo');							
INSERT INTO pais(id,codigo,nombre) VALUES (39,'638REU','Reunión');							
INSERT INTO pais(id,codigo,nombre) VALUES (40,'646RWA','Ruanda');							
INSERT INTO pais(id,codigo,nombre) VALUES (41,'732ESH','Sahara Occidental');							
INSERT INTO pais(id,codigo,nombre) VALUES (42,'654SHN','Santa Elena');							
INSERT INTO pais(id,codigo,nombre) VALUES (43,'678STP','Santo Tomé y Príncipe');							
INSERT INTO pais(id,codigo,nombre) VALUES (44,'686SEN','Senegal');							
INSERT INTO pais(id,codigo,nombre) VALUES (45,'690SYC','Seychelles');							
INSERT INTO pais(id,codigo,nombre) VALUES (46,'694SLE','Sierra Leona');							
INSERT INTO pais(id,codigo,nombre) VALUES (47,'706SOM','Somalia');							
INSERT INTO pais(id,codigo,nombre) VALUES (48,'748SWZ','Suazilandia');							
INSERT INTO pais(id,codigo,nombre) VALUES (49,'710ZAF','Sudáfrica');							
INSERT INTO pais(id,codigo,nombre) VALUES (50,'736SDN','Sudán');							
INSERT INTO pais(id,codigo,nombre) VALUES (51,'834TZA','Tanzania');							
INSERT INTO pais(id,codigo,nombre) VALUES (52,'768TGO','Togo');							
INSERT INTO pais(id,codigo,nombre) VALUES (53,'788TUN','Túnez');							
INSERT INTO pais(id,codigo,nombre) VALUES (54,'800UGA','Uganda');							
INSERT INTO pais(id,codigo,nombre) VALUES (55,'262DJI','Yibuti');							
INSERT INTO pais(id,codigo,nombre) VALUES (56,'894ZMB','Zambia');							
INSERT INTO pais(id,codigo,nombre) VALUES (57,'716ZWE','Zimbabue');							
							
INSERT INTO pais(id,codigo,nombre) VALUES (58,'660AIA','Anguila');							
INSERT INTO pais(id,codigo,nombre) VALUES (59,'028ATG','Antigua y Barbuda');							
INSERT INTO pais(id,codigo,nombre) VALUES (60,'533ABW','Aruba');							
INSERT INTO pais(id,codigo,nombre) VALUES (61,'044BHS','Bahamas');							
INSERT INTO pais(id,codigo,nombre) VALUES (62,'052BRB','Barbados');							
INSERT INTO pais(id,codigo,nombre) VALUES (63,'084BLZ','Belice');							
INSERT INTO pais(id,codigo,nombre) VALUES (64,'060BMU','Bermudas');							
INSERT INTO pais(id,codigo,nombre) VALUES (65,'124CAN','Canadá');							
INSERT INTO pais(id,codigo,nombre) VALUES (66,'188CRI','Costa Rica');							
INSERT INTO pais(id,codigo,nombre) VALUES (67,'192CUB','Cuba');							
INSERT INTO pais(id,codigo,nombre) VALUES (68,'212DMA','Dominica');							
INSERT INTO pais(id,codigo,nombre) VALUES (69,'222SLV','El Salvador');							
INSERT INTO pais(id,codigo,nombre) VALUES (70,'840USA','Estados Unidos');							
INSERT INTO pais(id,codigo,nombre) VALUES (71,'308GRD','Granada');							
INSERT INTO pais(id,codigo,nombre) VALUES (72,'304GRL','Groenlandia');							
INSERT INTO pais(id,codigo,nombre) VALUES (73,'312GLP','Guadalupe');							
INSERT INTO pais(id,codigo,nombre) VALUES (74,'320GTM','Guatemala');							
INSERT INTO pais(id,codigo,nombre) VALUES (75,'332HTI','Haití');							
INSERT INTO pais(id,codigo,nombre) VALUES (76,'340HND','Honduras');							
INSERT INTO pais(id,codigo,nombre) VALUES (77,'136CYM','Islas Caimán ');							
INSERT INTO pais(id,codigo,nombre) VALUES (78,'796TCA','Islas Turcas y Caicos ');							
INSERT INTO pais(id,codigo,nombre) VALUES (79,'092VGB','Islas Virgenes Británicas');							
INSERT INTO pais(id,codigo,nombre) VALUES (80,'850VIR','Islas Virgenes Estadounidenses');							
INSERT INTO pais(id,codigo,nombre) VALUES (81,'388JAM','Jamaica');							
INSERT INTO pais(id,codigo,nombre) VALUES (82,'474MTQ','Martinica');							
INSERT INTO pais(id,codigo,nombre) VALUES (83,'484MEX','México');							
INSERT INTO pais(id,codigo,nombre) VALUES (84,'500MSR','Montserrat');							
INSERT INTO pais(id,codigo,nombre) VALUES (85,'558NIC','Nicaragua');							
INSERT INTO pais(id,codigo,nombre) VALUES (86,'591PAN','Panamá');							
INSERT INTO pais(id,codigo,nombre) VALUES (87,'630PRI','Puerto Rico');							
INSERT INTO pais(id,codigo,nombre) VALUES (88,'214DOM','República Dominicana');							
INSERT INTO pais(id,codigo,nombre) VALUES (89,'659KNA','San Cristobal y Nieves');							
INSERT INTO pais(id,codigo,nombre) VALUES (90,'666SPM','San Pedro y Miquelón');							
INSERT INTO pais(id,codigo,nombre) VALUES (91,'670VCT','San Vicente y Las Granadinas');							
INSERT INTO pais(id,codigo,nombre) VALUES (92,'662LCA','Santa Lucía');							
INSERT INTO pais(id,codigo,nombre) VALUES (93,'780TTO','Trinidad y Tobago');							
							
INSERT INTO pais(id,codigo,nombre) VALUES (94,'032ARG','Argentina');							
INSERT INTO pais(id,codigo,nombre) VALUES (95,'068BOL','Bolivia');							
INSERT INTO pais(id,codigo,nombre) VALUES (96,'076BRA','Brasil');							
INSERT INTO pais(id,codigo,nombre) VALUES (97,'152CHL','Chile');							
INSERT INTO pais(id,codigo,nombre) VALUES (98,'170COL','Colombia');							
INSERT INTO pais(id,codigo,nombre) VALUES (99,'218ECU','Ecuador');							
INSERT INTO pais(id,codigo,nombre) VALUES (100,'254GUF','Guayana Francesa');							
INSERT INTO pais(id,codigo,nombre) VALUES (101,'328GUY','Guyana');							
INSERT INTO pais(id,codigo,nombre) VALUES (102,'238FLK','Islas Malvinas');							
INSERT INTO pais(id,codigo,nombre) VALUES (103,'600PRY','Paraguay');							
INSERT INTO pais(id,codigo,nombre) VALUES (104,'604PER','Perú');							
INSERT INTO pais(id,codigo,nombre) VALUES (105,'740SUR','Surinam');							
INSERT INTO pais(id,codigo,nombre) VALUES (106,'858URY','Uruguay');							
INSERT INTO pais(id,codigo,nombre) VALUES (107,'862VEN','Venezuela');							
							
INSERT INTO pais(id,codigo,nombre) VALUES (108,'004AFG','Afganistán');							
INSERT INTO pais(id,codigo,nombre) VALUES (109,'682SAU','Arabia Saudita');							
INSERT INTO pais(id,codigo,nombre) VALUES (110,'051ARM','Armenia');							
INSERT INTO pais(id,codigo,nombre) VALUES (111,'031AZE','Azerbaiyán');							
INSERT INTO pais(id,codigo,nombre) VALUES (112,'048BHR','Bahréin');							
INSERT INTO pais(id,codigo,nombre) VALUES (113,'050BGD','Bangladesh');							
INSERT INTO pais(id,codigo,nombre) VALUES (114,'096BRN','Brunéi');							
INSERT INTO pais(id,codigo,nombre) VALUES (115,'064BTN','Bután');							
INSERT INTO pais(id,codigo,nombre) VALUES (116,'116KHM','Camboya');							
INSERT INTO pais(id,codigo,nombre) VALUES (117,'156CHN','China');							
INSERT INTO pais(id,codigo,nombre) VALUES (118,'196CYP','Chipre');							
INSERT INTO pais(id,codigo,nombre) VALUES (119,'408PRK','Corea del Norte ');							
INSERT INTO pais(id,codigo,nombre) VALUES (120,'410KOR','Corea del Sur ');							
INSERT INTO pais(id,codigo,nombre) VALUES (121,'784ARE','Emiratos Árabes Unidos');							
INSERT INTO pais(id,codigo,nombre) VALUES (122,'608PHL','Filipinas');							
INSERT INTO pais(id,codigo,nombre) VALUES (123,'268GEO','Georgia');							
INSERT INTO pais(id,codigo,nombre) VALUES (124,'344HKG','Hong Kong');							
INSERT INTO pais(id,codigo,nombre) VALUES (125,'356IND','India');							
INSERT INTO pais(id,codigo,nombre) VALUES (126,'360IDN','Indonesia');							
INSERT INTO pais(id,codigo,nombre) VALUES (127,'368IRQ','Iraq');							
INSERT INTO pais(id,codigo,nombre) VALUES (128,'364IRN','Irán');							
INSERT INTO pais(id,codigo,nombre) VALUES (129,'162CXR','Isla de Navidad  ');							
INSERT INTO pais(id,codigo,nombre) VALUES (130,'166CCK','Islas Cocos  ');							
INSERT INTO pais(id,codigo,nombre) VALUES (131,'376ISR','Israel');							
INSERT INTO pais(id,codigo,nombre) VALUES (132,'392JPN','Japón');							
INSERT INTO pais(id,codigo,nombre) VALUES (133,'400JOR','Jordania');							
INSERT INTO pais(id,codigo,nombre) VALUES (134,'398KAZ','Kazajistán');							
INSERT INTO pais(id,codigo,nombre) VALUES (135,'417KGZ','Kirguistán');							
INSERT INTO pais(id,codigo,nombre) VALUES (136,'414KWT','Kuwait');							
INSERT INTO pais(id,codigo,nombre) VALUES (137,'418LAO','Laos ');							
INSERT INTO pais(id,codigo,nombre) VALUES (138,'422LBN','Líbano');							
INSERT INTO pais(id,codigo,nombre) VALUES (139,'446MAC','Macao');							
INSERT INTO pais(id,codigo,nombre) VALUES (140,'458MYS','Malasia');							
INSERT INTO pais(id,codigo,nombre) VALUES (141,'462MDV','Maldivas');							
INSERT INTO pais(id,codigo,nombre) VALUES (142,'496MNG','Mongolia');							
INSERT INTO pais(id,codigo,nombre) VALUES (143,'104MMR','Myanmar');							
INSERT INTO pais(id,codigo,nombre) VALUES (144,'524NPL','Nepal');							
INSERT INTO pais(id,codigo,nombre) VALUES (145,'512OMN','Omán');							
INSERT INTO pais(id,codigo,nombre) VALUES (146,'586PAK','Pakistán');							
INSERT INTO pais(id,codigo,nombre) VALUES (147,'634QAT','Qatar');							
INSERT INTO pais(id,codigo,nombre) VALUES (148,'702SGP','Singapur');							
INSERT INTO pais(id,codigo,nombre) VALUES (149,'760SYR','Siria ');							
INSERT INTO pais(id,codigo,nombre) VALUES (150,'144LKA','Sri Lanka');							
INSERT INTO pais(id,codigo,nombre) VALUES (151,'762TJK','Tayikistán');							
INSERT INTO pais(id,codigo,nombre) VALUES (152,'764THA','Tailandia');							
INSERT INTO pais(id,codigo,nombre) VALUES (153,'158TWN','Taiwán');							
INSERT INTO pais(id,codigo,nombre) VALUES (154,'086IOT','Territorio Britanico del Océano Índico');							
INSERT INTO pais(id,codigo,nombre) VALUES (155,'275PSE','Palestina (Anp)');							
INSERT INTO pais(id,codigo,nombre) VALUES (156,'626TLS','Timor Oriental');							
INSERT INTO pais(id,codigo,nombre) VALUES (157,'795TKM','Turkmenistán');							
INSERT INTO pais(id,codigo,nombre) VALUES (158,'860UZB','Uzbekistán');							
INSERT INTO pais(id,codigo,nombre) VALUES (159,'704VNM','Vietnam');							
INSERT INTO pais(id,codigo,nombre) VALUES (160,'887YEM','Yemen');							
							
INSERT INTO pais(id,codigo,nombre) VALUES (161,'248ALA','Áland');							
INSERT INTO pais(id,codigo,nombre) VALUES (162,'008ALB','Albania');							
INSERT INTO pais(id,codigo,nombre) VALUES (163,'276DEU','Alemania');							
INSERT INTO pais(id,codigo,nombre) VALUES (164,'020AND','Andorra');							
INSERT INTO pais(id,codigo,nombre) VALUES (165,'040AUT','Austria');							
INSERT INTO pais(id,codigo,nombre) VALUES (166,'530ANT','Antillas Neerlandesas');							
INSERT INTO pais(id,codigo,nombre) VALUES (167,'807MKD','Ary Macedonia');							
INSERT INTO pais(id,codigo,nombre) VALUES (168,'056BEL','Bélgica');							
INSERT INTO pais(id,codigo,nombre) VALUES (169,'112BLR','Bielorrusia');							
INSERT INTO pais(id,codigo,nombre) VALUES (170,'070BIH','Bosnia y Herzegovina');							
INSERT INTO pais(id,codigo,nombre) VALUES (171,'100BGR','Bulgaria');							
INSERT INTO pais(id,codigo,nombre) VALUES (172,'336VAT','Ciudad del Vaticano');							
INSERT INTO pais(id,codigo,nombre) VALUES (173,'191HRV','Croacia');							
INSERT INTO pais(id,codigo,nombre) VALUES (174,'208DNK','Dinamarca');							
INSERT INTO pais(id,codigo,nombre) VALUES (175,'703SVK','Eslovaquia');							
INSERT INTO pais(id,codigo,nombre) VALUES (176,'705SVN','Eslovenia');							
INSERT INTO pais(id,codigo,nombre) VALUES (177,'724ESP','España');							
INSERT INTO pais(id,codigo,nombre) VALUES (178,'233EST','Estonia');							
INSERT INTO pais(id,codigo,nombre) VALUES (179,'643RUS','Rusia');							
INSERT INTO pais(id,codigo,nombre) VALUES (180,'246FIN','Finlandia');							
INSERT INTO pais(id,codigo,nombre) VALUES (181,'250FRA','Francia');							
INSERT INTO pais(id,codigo,nombre) VALUES (182,'292GIB','Gibraltar');							
INSERT INTO pais(id,codigo,nombre) VALUES (183,'300GRC','Grecia');							
INSERT INTO pais(id,codigo,nombre) VALUES (184,'831GGY','Guernsey');							
INSERT INTO pais(id,codigo,nombre) VALUES (185,'348HUN','Hungría');							
INSERT INTO pais(id,codigo,nombre) VALUES (186,'372IRL','Irlanda ');							
INSERT INTO pais(id,codigo,nombre) VALUES (187,'833IMN','Isla de Man');							
INSERT INTO pais(id,codigo,nombre) VALUES (188,'352ISL','Islandia');							
INSERT INTO pais(id,codigo,nombre) VALUES (189,'234FRO','Islas Feroe ');							
INSERT INTO pais(id,codigo,nombre) VALUES (190,'380ITA','Italia');							
INSERT INTO pais(id,codigo,nombre) VALUES (191,'832JEY','Jersey');							
INSERT INTO pais(id,codigo,nombre) VALUES (192,'428LVA','Letonia');							
INSERT INTO pais(id,codigo,nombre) VALUES (193,'438LIE','Liechtenstein');							
INSERT INTO pais(id,codigo,nombre) VALUES (194,'440LTU','Lituania');							
INSERT INTO pais(id,codigo,nombre) VALUES (195,'442LUX','Luxemburgo');							
INSERT INTO pais(id,codigo,nombre) VALUES (196,'470MLT','Malta');							
INSERT INTO pais(id,codigo,nombre) VALUES (197,'498MDA','Moldavia');							
INSERT INTO pais(id,codigo,nombre) VALUES (198,'492MCO','Mónaco');							
INSERT INTO pais(id,codigo,nombre) VALUES (199,'499MNE','Montenegro (Ex Yugoslavia)');							
INSERT INTO pais(id,codigo,nombre) VALUES (200,'578NOR','Noruega');							
INSERT INTO pais(id,codigo,nombre) VALUES (201,'528NLD','Países Bajos');							
INSERT INTO pais(id,codigo,nombre) VALUES (202,'616POL','Polonia');							
INSERT INTO pais(id,codigo,nombre) VALUES (203,'620PRT','Portugal');							
INSERT INTO pais(id,codigo,nombre) VALUES (204,'826GBR','Reino Unido');							
INSERT INTO pais(id,codigo,nombre) VALUES (205,'203CZE','República Checa');							
INSERT INTO pais(id,codigo,nombre) VALUES (206,'642ROU','Rumania');							
INSERT INTO pais(id,codigo,nombre) VALUES (207,'674SMR','San Marino');							
INSERT INTO pais(id,codigo,nombre) VALUES (208,'688SRB','Serbia (Ex Yugoslavia)');							
INSERT INTO pais(id,codigo,nombre) VALUES (209,'752SWE','Suecia');							
INSERT INTO pais(id,codigo,nombre) VALUES (210,'756CHE','Suiza');							
INSERT INTO pais(id,codigo,nombre) VALUES (211,'744SJM','Svalbard y Jan Mayen');							
INSERT INTO pais(id,codigo,nombre) VALUES (212,'792TUR','Turquía');							
INSERT INTO pais(id,codigo,nombre) VALUES (213,'804UKR','Ucrania');							
							
INSERT INTO pais(id,codigo,nombre) VALUES (214,'036AUS','Australia');							
INSERT INTO pais(id,codigo,nombre) VALUES (215,'242FJI','Fiyi');							
INSERT INTO pais(id,codigo,nombre) VALUES (216,'316GUM','Guam');							
INSERT INTO pais(id,codigo,nombre) VALUES (217,'574NFK','Norfolk');							
INSERT INTO pais(id,codigo,nombre) VALUES (218,'184COK','Islas Cook  ');							
INSERT INTO pais(id,codigo,nombre) VALUES (219,'580MNP','Islas Marianas del Norte');							
INSERT INTO pais(id,codigo,nombre) VALUES (220,'584MHL','Islas Marshall ');							
INSERT INTO pais(id,codigo,nombre) VALUES (221,'090SLB','Islas Salomón ');							
INSERT INTO pais(id,codigo,nombre) VALUES (222,'581UMI','Islas Ultramarinas de Estados Unidos');							
INSERT INTO pais(id,codigo,nombre) VALUES (223,'296KIR','Kiribati');							
INSERT INTO pais(id,codigo,nombre) VALUES (224,'583FSM','Micronesia');							
INSERT INTO pais(id,codigo,nombre) VALUES (225,'520NRU','Nauru');							
INSERT INTO pais(id,codigo,nombre) VALUES (226,'570NIU','Niue');							
INSERT INTO pais(id,codigo,nombre) VALUES (227,'540NCL','Nueva Caledonia');							
INSERT INTO pais(id,codigo,nombre) VALUES (228,'554NZL','Nueva Zelanda');							
INSERT INTO pais(id,codigo,nombre) VALUES (229,'585PLW','Palaos');							
INSERT INTO pais(id,codigo,nombre) VALUES (230,'598PNG','Papúa Nueva Guinea');							
INSERT INTO pais(id,codigo,nombre) VALUES (231,'612PCN','Islas Pitcairn ');							
INSERT INTO pais(id,codigo,nombre) VALUES (232,'258PYF','Polinesia Francesa');							
INSERT INTO pais(id,codigo,nombre) VALUES (233,'882WSM','Samoa');							
INSERT INTO pais(id,codigo,nombre) VALUES (234,'016ASM','Samoa Americana');							
INSERT INTO pais(id,codigo,nombre) VALUES (235,'772TKL','Tokelau');							
INSERT INTO pais(id,codigo,nombre) VALUES (236,'776TON','Tonga');							
INSERT INTO pais(id,codigo,nombre) VALUES (237,'798TUV','Tuvalu');							
INSERT INTO pais(id,codigo,nombre) VALUES (238,'548VUT','Vanuatu');							
INSERT INTO pais(id,codigo,nombre) VALUES (239,'876WLF','Wallis y Futuna');							
							
INSERT INTO pais(id,codigo,nombre) VALUES (240,'010ATA','Antártida');							
INSERT INTO pais(id,codigo,nombre) VALUES (241,'074BVT','Isla Bouvet');							
INSERT INTO pais(id,codigo,nombre) VALUES (242,'239SGS','Islas Georgias del Sur y Sandwich del Sur');							
INSERT INTO pais(id,codigo,nombre) VALUES (243,'334HMD','Islas Heard y Mc Donald');							
INSERT INTO pais(id,codigo,nombre) VALUES (244,'260ATF','Territorios Australes Franceses');							
							
INSERT INTO pais(id,codigo,nombre) VALUES (245,'888PIV','País a Invalidar');							
INSERT INTO pais(id,codigo,nombre) VALUES (246,'998OPE','Otro País sin especificar');							
INSERT INTO pais(id,codigo,nombre) VALUES (247,'999IGN','Ignorado');							
