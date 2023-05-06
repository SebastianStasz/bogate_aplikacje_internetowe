import sqlite3 from "sqlite3";

const DBSOURCE = "db.sqlite";

export let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.serialize(() => {
      db.run(`PRAGMA foreign_keys = ON`);
      db.run(
        `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email text UNIQUE,
            password text,
            userName text UNIQUE,
            createdAt text,
            CONSTRAINT email_unique UNIQUE (email),
            CONSTRAINT userName_unique UNIQUE (userName)
            )`,
        (err) => {}
      );

      db.run(
        `CREATE TABLE recipe_category (
          category text PRIMARY KEY
        )`,
        (err) => {}
      );

      db.run(
        `CREATE TABLE recipe (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER,
          recipeName text,
          description text,
          ingredients text,
          preparation text,
          category text,
          preparationTime number,
          photo text,
          createdAt integer,
          FOREIGN KEY(userId) REFERENCES user(id)
          FOREIGN KEY(category) REFERENCES recipe_category(category)
          )`,
        (err) => {}
      );

      db.run(
        `CREATE TABLE recipe_rating (
          userId INTEGER NOT NULL,
          recipeId INTEGER NOT NULL,
          rating REAL,
          PRIMARY KEY (userId, recipeId),
          FOREIGN KEY(userId) REFERENCES user(id) ON DELETE CASCADE,
          FOREIGN KEY(recipeId) REFERENCES recipe(id) ON DELETE CASCADE
        )`,
        (err) => {
          if (err) {
            // Table already created
          } else {
            // Table just created, creating some rows
            db.serialize(() => {
              var insert =
                "INSERT INTO user (email, password, userName, createdAt) VALUES (?,?,?,?)";
              db.run(insert, [
                "przemek@example.com",
                "pass123",
                "Przemek",
                "20.01.2023",
              ]);
              db.run(insert, [
                "paweł@example.com",
                "pass456",
                "Pawełk",
                "22.02.2023",
              ]);
              db.run(insert, [
                "sebastian@example.com",
                "qwerty123",
                "Sebastian",
                "24.03.2023",
              ]);

              insert = "INSERT INTO recipe_category (category) VALUES (?)";
              db.run(insert, ["Przystawki i dania wegetariańskie"]);
              db.run(insert, ["Zupy i chłodniki"]);
              db.run(insert, ["Sałatki i dressingi"]);
              db.run(insert, ["Makarony i dania z ryżu"]);
              db.run(insert, ["Potrawy z mięsa i ryb"]);
              db.run(insert, ["Desery i wypieki"]);
              db.run(insert, ["Napoje i koktajle"]);
              db.run(insert, ["Śniadania i brunch"]);
              db.run(insert, ["Potrawy grillowane i smażone"]);

              insert =
                "INSERT INTO recipe (userId, recipeName, description, ingredients, preparation, category, preparationTime, photo, createdAt) VALUES (?,?,?,?,?,?,?,?,?)";
              db.run(insert, [
                3,
                "Sałatka grecka z fetą",
                "Sałatka grecka z fetą to klasyczne danie, które zachwyca swoim świeżym smakiem i kolorowym wyglądem. Ta tradycyjna sałatka jest nie tylko smaczna, ale także bardzo zdrowa, dzięki zawartości warzyw i oliwy z oliwek. Sałatkę grecką z fetą można podawać jako samodzielne danie lub jako dodatek do grillowanych mięs, pieczywa lub dania głównego. To orzeźwiające połączenie świeżych warzyw, chrupiącej sałaty, aromatycznej fety i oliwy z oliwek sprawia, że ta sałatka jest prawdziwą ucztą dla podniebienia.",
                "główka sałaty;Sos sałatkowy grecki Knorr;ser feta;ogórek;pomidory;zielone oliwki;czarne oliwki;czerwona papryka",
                "Przygotuj Sos sałatkowy grecki Knorr według przepisu na opakowaniu.;Pokrój ser w słupki lub kostkę i zalej połową uprzednio przygotowanego Sosu sałatkowego Knorr.;Porwij sałatę, ogórki pokrój w kostkę, pomidory w cząstki, paprykę w kostkę.;Dodaj oliwki, wymieszaj z sosem, który pozostał. Podawaj z pokrojonym w kostkę serem feta.",
                "Sałatki i dressingi",
                15,
                null,
                "01.01.2023",
              ]);
              db.run(insert, [
                3,
                "Deser bananowy",
                "Deser bananowy to prosty i pyszny sposób na zaspokojenie swojej łakomczuchy. Ta słodka i kremowa przekąska sprawia, że banany stają się jeszcze smaczniejsze. Ten deser bananowy jest idealny na ciepłe dni, jako lekki deser po posiłku lub jako smakowity dodatek do śniadania. Możesz również eksperymentować, dodając ulubione składniki, takie jak orzechy, płatki owsiane lub wiórki kokosowe, aby nadać mu jeszcze więcej smaku i chrupkości. Smacznego!",
                "biszkopty;banany;galaretka cytrynowa;woda;śmietanka kremówka 30%;ser mascarpone;cytryna;cukier puder;żelatyna w proszku",
                "Formę smarujemy masłem i wykładamy papierem do pieczenia. Na dnie układamy biszkopty.;Na biszkopty układamy pokrojone na kawałki banany.;Galaretki rozpuszczamy w gorącej wodzie, dokładnie mieszamy i zostawiamy do wystudzenia. Wlewamy na spód z biszkoptów. Wkładamy do lodówki na 1-2 h do stężenia.;Śmietanę kremówkę ubijamy na puszysty krem z cukrem pudrem i łyżką soku z cytryny. Dodajemy ser mascarpone oraz rozpuszczony w odrobinie gorącej wody żelatynę. Całość mieszamy.;Powstały krem przekładamy na stężałą galaretkę. Wyrównujemy z wierzchu. Ponownie wkładamy do lodówki na min 30 min.",
                "Desery i wypieki",
                30,
                null,
                "02.02.2023",
              ]);
              db.run(insert, [
                3,
                "Błyskawiczne ciasto gruszkowe",
                "Błyskawiczne ciasto gruszkowe to prosty i smaczny deser, który możesz przygotować w krótkim czasie. Kombinacja wilgotnego ciasta z aromatycznymi gruszkami sprawia, że jest to idealne ciasto na podwieczorek lub jako deser na specjalne okazje. ",
                "masło;cukier;mąka;proszek do pieczenia;jajka;gruszki;cytryna;suszona żurawina;bułka tarta",
                "Żurawinę zalej wrzątkiem, gdy napęcznieje odsącz na sicie. Gruszki umyj, obierz, usuń gniazda nasienne i pokrój w plastry. Skrop sokiem z wyciśniętej cytryny.;Do kielicha miksera kuchennego przesiej mąkę, dodaj cukier, proszek do pieczenia i wymieszaj. Następnie dodaj miękkie masło, jajka i połącz składniki.;Ciasto przełóż do formy wysmarowanej masłem i oprószonej bułką tartą. Równo rozprowadź przy pomocy moczonej w zimnej wodzie łyżki.;Gruszki i żurawinę ułóż gęsto na wierzchu ciasta. Piekarnik nagrzej do 180 st. C.;Ciasto przykryj folią aluminiową. Piecz najpierw 30 minut pod przykryciem, a następnie odkryj i piecz jeszcze dodatkowo 30 minut.",
                "Desery i wypieki",
                45,
                null,
                "03.03.2023",
              ]);
              db.run(insert, [
                3,
                "Frykadelki w sosie cebulowym",
                "Frykadelki w sosie cebulowym to danie, które zachwyca aromatem i smakiem. Te małe mięsne kulki, zanurzone w delikatnym i aromatycznym sosie cebulowym, są idealne jako główne danie lub przekąska na przyjęcia.",
                "mięso mielone wołowo-wieprzowe;jajko;natka pietruszki;cebula;przyprawa do mięsa mielonego Knorr;bułka tarta;olej roślinny do smażenia;słodka śmietanka;piwo jęczmienne",
                "Dwie cebule pokrój w plastry, a trzecią a zetrzyj na tarce. Posiekaj natkę pietruszki.;Mięso mielone połącz z jajkiem, z 80g bułki tartej, z startą cebulą oraz natką pietruszki. Całość dopraw do smaku Przyprawą do mięsa mielonego Knorr, by danie było wyraziste w smaku.;Z gotowego farszu uformuj małe kulki, obtocz je w pozostałej bułce tartej, spłaszcz i usmaż z obu stron na rozgrzanym oleju.'Kotleciki przełóż na bok. Na patelnię wrzuć cebulę i smaż, aż delikatnie się zarumieni. Dodaj wtedy szklankę piwa. Powstały wywar wymieszaj ze śmietaną pomieszaną z jedną łyżką mąki. Na patelnię włóż kotleciki i duś je pod przykryciem przez ok. 5 minut.",
                "Potrawy z mięsa i ryb",
                60,
                null,
                "04.03.2023",
              ]);
              db.run(insert, [
                3,
                "Sałatka z tortellini z brokułami i szynką",
                "Sałatka z tortellini z brokułami i szynką to pyszne danie, które łączy w sobie smak świeżych warzyw, delikatnych tortellini i aromatycznej szynki. Ta sałatka jest idealna jako lekki obiad lub na letnie przyjęcia.",
                "tortellini z grzybami;brokuł;sos sałatkowy Czosnkowo-ziołowy Knorr;majonez;szynka;kukurydza z puszki;natka pietruszki;jogurt;grzanki;ser żółty",
                "Tortellini ugotuj i pozostaw do wystygnięcia. Natkę posiekaj.;Brokuła podziel na różyczki, szynkę pokrój w paski, kukurydzę odsącz.;Przygotuj sos sałatkowy. Wymieszaj zawartość opakowania Knorr z majonezem i startym serem.;Połącz składniki z pierożkami tortellini.;Podawaj sałatkę udekorowaną natką pietruszki i grzankami.",
                "Sałatki i dressingi",
                45,
                null,
                "05.03.2023",
              ]);
              db.run(insert, [
                3,
                "Domowa pizza",
                "Domowa pizza to pyszne danie, które możesz przygotować samodzielnie, korzystając z ulubionych składników i eksperymentując z różnymi kombinacjami smakowymi.",
                "maka pszenna;drożdże;cukier;oliwa z oliwek;sól;woda;czerwona cebula;pomidory;pomidorki koktajlowe;mozzarella;rukola;kiełbasa pepperoni",
                "Wszystkie składniki na ciasto połącz ze sobą dobrze wyrabiając. Gotowe ciasto przykryj czystą, płócienną ścierką i odstaw na 40 minut w ciepłe miejsce tak, aby ciasto mogło wyrosnąć.;Po tym czasie ciasto jeszcze raz wyrób ręką, podsyp trochę mąką i podziel na 4 do 6 kul tej samej wielkości.;Na stolnicy lub gładkim blacie stołu delikatnie podsypanym mąką rozwałkuj lub rozciągnij ciasto ręką, formując okrągły placek. Placek ułóż na pergaminie na odwróconej do góry nogami blasze z piekarnika.;W garnku zagotuj pomidory pelatti z Knorr Naturalnie smaczne Spaghetti Bolognese - dzięki niemu uzyskasz sos o wyrazistym ziołowo pomidorowym smaku, który będzie miał idealną konsystencję.;Ciasto z wierzchu posmaruj wcześniej zrobionym sosem. Na środek pizzy, na sos, posyp stary sera mozzarella, na ser kolejno układaj plastry czerwonej cebuli, plastry kiełbasy oraz przecięte na pół pomidorki.;Pizzę umieść w nagrzanym do 220°C piekarniku i piecz około 25 minut. Gotową pizzę podawaj posypaną listkami rukoli i pozostałym sosem pomidorowym.",
                "Potrawy z mięsa i ryb",
                90,
                null,
                "06.03.2023",
              ]);

              insert =
                "INSERT INTO recipe_rating (userId, recipeId, rating) VALUES (?,?,?)";
              db.run(insert, [3, 1, 4.5]);
              db.run(insert, [3, 2, 4]);
              db.run(insert, [3, 3, 5]);
              db.run(insert, [3, 4, 3.5]);
              db.run(insert, [3, 5, 2.5]);
              db.run(insert, [3, 6, 5]);
            });
          }
        }
      );
    });
  }
});
