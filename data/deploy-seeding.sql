BEGIN;

TRUNCATE "style", "brewery", "color", "country", "role", "user_account", "article", "beer", "review" RESTART IDENTITY;

INSERT INTO style (name) VALUES
('fruit beer'),
('lager'),
('dubbel'),
('belgian pale ale'),
('pils'),
('belgian ale'),
('sour'),
('amber ale'),
('pale ale'),
('neipa'),
('ipa'),
('wheat beer'),
('witbier'),
('stout'),
('pale lager'),
('ale'),
('dark strong ale');

INSERT INTO brewery (name) VALUES 
('brasserie huyghe'),
('swinkels family brewers'),
('les brasseurs de lorraine'),
('brasserie américaine anheuser-busch'),
('brasserie d''achouffe'),
('brasserie spaten-franziskaner-bräu'),
('brasserie moortgat'),
('brasserie aliénor'),
('brasserie l’entre-deux-bières'),
('brasserie alaryk'),
('brasserie lancelot'),
('hinano'),
('brasserie des sources'),
('brasserie d’orville'),
('brooklyn brewery'),
('paulaner'),
('brasserie rivière d’ain'),
('brasserie pleine lune'),
('brasserie craft pivovar zichovec'),
('st. francis abbey'),
('moosehead brewery'),
('asahi brewers'),
('braserie de bourbon'),
('brasserie ichnusa'),
('brasserie zagrebacka pivovara'),
('foster''s');

INSERT INTO color (name) VALUES 
('blanche'),
('blonde'),
('brune'),
('rousse'),
('ambrée'),
('rouge'),
('noire');

INSERT INTO country (name) VALUES 
('belgique'),
('pays-Bas'),
('france'),
('usa'),
('allemagne'),
('polynésie'),
('république tchèque'),
('irlande'),
('canada'),
('australie'),
('japon'),
('italie'),
('croatie'),
('afghanistan'),
('afrique du sud'),
('akrotiri'),
('albanie'),
('algérie'),
('andorre'),
('angola'),
('anguilla'),
('antigua-et-barbuda'),
('arabie saoudite'),
('argentine'),
('arménie'),
('aruba'),
('autriche'),
('azerbaïdjan'),
('bahamas'),
('bahreïn'),
('bangladesh'),
('barbade'),
('belau'),
('belize'),
('bénin'),
('bermudes'),
('bhoutan'),
('biélorussie'),
('birmanie'),
('bolivie'),
('bosnie-herzégovine'),
('botswana'),
('brésil'),
('brunei'),
('bulgarie'),
('burkina faso'),
('burundi'),
('cambodge'),
('cameroun'),
('cap-vert'),
('chili'),
('chine'),
('chypre'),
('colombie'),
('comores'),
('congo'),
('corée du nord'),
('corée du sud'),
('costa Rica'),
('côte d''ivoire'),
('cuba'),
('curacao'),
('danemark'),
('dhekelia'),
('djibouti'),
('dominique'),
('egypte'),
('emirats arabes unis'),
('equateur'),
('erythrée'),
('espagne'),
('estonie'),
('ethiopie'),
('macédoine du nord'),
('finland'),
('gabon'),
('gambie'),
('bande de gaza'),
('géorgie'),
('ghana'),
('gibraltar'),
('grèce'),
('grenade'),
('guam'),
('guatemala'),
('guernsey'),
('guinée'),
('guinée équatoriale'),
('guinée-bissaoe'),
('guyana'),
('haïti'),
('honduras'),
('hong kong'),
('hongrie'),
('ile christmas'),
('iles cayman'),
('iles cook'),
('iles féroé'),
('iles fidji'),
('iles marshall'),
('inde'),
('indonésie'),
('iran'),
('iraq'),
('islande'),
('israël'),
('jamaïque'),
('jersey'),
('jordanie'),
('kazakhstan'),
('kenya'),
('kirghizistan'),
('kosovo'),
('koweït'),
('laos'),
('lesotho'),
('lettonie'),
('liban'),
('liberia'),
('libye'),
('liechtenstein'),
('lituanie'),
('luxembourg'),
('macao'),
('madagascar'),
('malaisie'),
('malawi'),
('maldives'),
('mali'),
('malte'),
('ile de man'),
('mariannes du nord'),
('maroc'),
('maurice'),
('mauritanie'),
('mexique'),
('micronésie'),
('moldavie'),
('monaco'),
('mongolie'),
('monténégro'),
('montserrat'),
('mozambique'),
('namibie'),
('nauru'),
('népal'),
('nicaragua'),
('niger'),
('nigeria'),
('norvège'),
('nouvelle-calédonie'),
('nouvelle-zélande'),
('oman'),
('ouganda'),
('ouzbékistan'),
('pakistan'),
('panama'),
('papouasie-nouvelle-guinée'),
('paraguay'),
('pérou'),
('philippines'),
('pologne'),
('polynésie française'),
('porto rico'),
('portugal'),
('qatar'),
('république centrafricaine'),
('république démocratique du Congo'),
('république dominicaine'),
('roumanie'),
('royaume-uni'),
('russie'),
('rwanda'),
('saint-christophe-et-niévès'),
('saint-martin'),
('saint-pierre-et-miquelon'),
('saint-vincent-et-les-grenadines'),
('salvador'),
('samoa'),
('samoa américaines'),
('sao tomé-et-principe'),
('sénégal'),
('serbie'),
('seychelles'),
('sierra leone'),
('singapour'),
('sint maarten'),
('slovaquie'),
('slovénie'),
('somalie'),
('soudan'),
('soudan du sud'),
('sri lanka'),
('suède'),
('suisse'),
('suriname'),
('swaziland'),
('syrie'),
('tadjikistan'),
('taïwan'),
('tanzanie'),
('tchad'),
('thaïlande'),
('timor oriental'),
('togo'),
('tokélaou'),
('tonga'),
('trinité-et-tobago'),
('tunisie'),
('turkménistan'),
('turquie'),
('tuvalu'),
('ukraine'),
('uruguay'),
('vanuatu'),
('venezuela'),
('viêt nam'),
('wallis-et-futuna'),
('yémen'),
('zambie'),
('zimbabwe'),
('cisjordanie');

INSERT INTO role (name) VALUES 
('user'), 
('admin'),
('brewer');

INSERT INTO user_account (alias, date_of_birth, email, password, role_id) VALUES 
('stephane54', '1987/05/06', 'jansonstephane@gmail.com', '$2b$10$ZrsI8pQyxTDIH1EnQCL0MuCOudJrsaRwq8tH3BXlEXno.c4gDj0bW', 2),
('Oneosdoesnotcompute2745', '1995/12/27', 'Oneos2745@outlook.fr', '$2b$10$exLo5dqJyG/ZQggkZNz.A.nZ9XcURup5XHd10WXTcFwdb3DGq0nF2', 2),
('DodoZytho', '1987/07/07', 'nv.verbaere@gmail.com', '$2b$10$5DE9D15S6aFSeVs6AOg1Cevwx24yFHlE5h2qYGoiaKgGN9Pfh1WR.', 2),
('Arnaud', '1996/03/30', 'arnaud@gmail.com', '$2b$10$LKbyHyS/quVTw.fkLZVDz.9JlXSVVzj8nkKbHzB7bbDVchi/aDX2W', 2);

INSERT INTO beer (name, description, alcohol_level, country_id, style_id, color_id, brewery_id, user_account_id) VALUES 
('floris passion', 'La Floris passion est une bière belge aromatisée au Maracuja sur la base d''une bière blanche', 3.6, 1, 1, 1, 1, 1),
('8.6', 'Pas trop de gout, forte en bouche', 8.6, 2, 2, 2, 2, 1),
('lux divina', 'Bière brune française brassée dans la tradition des bières d’abbaye, puissante et complexe', 7, 3, 3, 3, 3, 1),
('bud', 'Bière américaine aux arômes de malt et de céréale', 4.5, 4, 2, 2, 4, 1),
('la chouffe', 'Une bière blonde de blé allemande aux notes de clou de girofle et au goût puissant de banane !', 8, 1, 4, 2, 5, 1),
('franziskaner weissbier', 'Agréablement fruitée, légèrement houblonnée, légère amertume très agréable si on sait l’apprécier', 5, 5, 5, 2, 6, 1),
('duvel', 'Une bière belge forte à la célébrité internationale qui présente des qualités exceptionnelles !', 8.5, 1, 4, 2, 7, 1),
('aliénor', 'Notes sucrées sur un goût de miel évoluant vers l’amande amère', 6.5, 3, 6, 2, 8, 1),
('la baïne', 'Mélange de malts blond et “caramel” confère à ce breuvage une couleur ambrée; jus de raisin noir, houblons, haute fermentation', 6.5, 3, 7, 4, 9, 2),
('alaryk', 'Bière de dégustation à la couleur ambrée avec des notes biscuitées et légèrement caramélisées', 5.5, 3, 8, 5, 10, 2),
('cervoise lancelot', 'Arôme exceptionnel au mélange de sept plantes différentes et de miel', 6, 3, 8, 5, 11, 2),
('hinano ambrée', 'Gout raffiné et corsé offre également une couleur qui se compose d’un dégradé d’ocre jaune et rouge', 5.5, 6, 8, 5, 12, 2),
('hinano', 'Belle robe or pâle avec une mousse blanche, saveurs douces et rondes, légère amertume.', 5, 6, 5, 5, 12, 2),
('bellerose', 'Arômes de malt, de houblon et de levure, Saveurs de fruits, de malt, de houblon et d''agrumes', 6.5, 3, 9, 2, 13, 2),
('lost in hops', 'Acidité modérée, froment au nez, passion dominante, mangue en arrière plan, rondeur sur le palais', 6.5, 3, 10, 2, 14, 2),
('pink & sour', 'Framboise ! Bonne acidité, carbonation assez légère',3.8,3,7,6,14,2),
('brooklyn', 'Notes fruitées, aromes sur la céréale fumée, bouche acidulée, légère amertume fumée', 5.2,4,11,2,15,3),
('paulaner hefe-weissbier', 'Notes fruitées, arômes sur la céréale fumée, Bouche acidulée, légère amertume fumée',5.5,5,12,1,16,3),
('thou', 'Arômes d''agrumes, d''épices, de citron et de levures. Légère et Crémeuse', 5.4,3,13,1,17,3),
('pierre de lune', 'MArquée par de fines notes de zestes de citron et de levures', 4.6,3,13,2,18,3),
('coffee stout', ' Création décadente, équilibre entre la douceur du stout fort initial et expression amère et plus rugueuse', 13,7,14,7,19,3),
('kilkenny', 'Robe rousse surplombée d''une belle mousse blanche et crémeuse. La bière dévoile de délicats arômes caramélisés', 4.2,8,14,4,20,3),
('moosehead', 'Parfait équilibre entre le goût sucré du malt et le goût amer du houblon', 5,9,15,2,21,3),
('alpine', 'Cette lager classique de couleur claire moyennement corsée est fabriquée avec des houblons Styrian Golding et Nugget', 5,9,16,2,21,3),
('foster','Doux arômes de malts évoquant les céréales', 5,10,2,2,26,4),
('asahi', 'Rafraichissante; maltée et croustillante',5,11,5,2,22,4),
('dodo bourbon', 'Brassée à partir de riz, cette Pils dévoile une belle robe blonde dorée surmontée d''une fine mousse blanche. De doux arômes maltés se dégagent de cette bière', 5,3,5,2,23,4),
('ichnusa', 'Elle est légèrement amère et rafraichissante, avec une mousse fine et persistante. Servir très frais, idéalement à 4°', 4.7,12,2,2,24,4),
('ozujsko', 'Légère et particulièrement rafraichissante, la Ozujsko est très appréciée durant les fortes chaleurs d’été.', 5,13,2,2,25,4),
('delirium nocturnum','Une bière belge forte, petite soeur brune de la fameuse Delirium tremens ! Attention aux Eléphants !', 8.5,1,17,3,1,4);

INSERT INTO article (title, content, user_account_id) VALUES 
('Nos ancêtres les Gaulois','Le mot brassage viendrait du gaulois “brace”, qui vient lui même du latin “bracium”, désignant le malt', 3),
('Jusqu’au Valhalla et au-delà','Les valkyries sont la personnification du destin, elles choisissent les guerriers morts au combat pour les amenés au Valhalla, et à qui elles servent de la bière venant du chaudron d’immortalité.
La bière se brasse toute seule et le chaudron est ainsi jamais vide
', 3);

INSERT INTO review (content, note, beer_id, user_account_id) VALUES 
('excellente bière', 4.8, 1, 1),
('good !', 4.5, 1, 2),
('je valide !', 4, 1, 3),
('yeah !', 4, 1, 4),
('passable', 2, 18, 1),
('belle note fruitée', 4.2, 16, 4),
('dégeulasse !', 1, 22, 4),
('allez viens, on est bien', 2, 15, 3),
('pas mal', 3, 7, 3),
('j''adore', 5, 10, 2),
('Beurk !', 1, 20, 2);

COMMIT;