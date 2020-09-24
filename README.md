# Projekat iz Web Programiranja
## Autor: Stefan Mijić
## Tema projekta: Socijalna mreža / blog.
## Naziv projekta: UpSpot
# Detaljan opis:
* UpSpot aplikacija predstavlja društvenu mrežu u kojoj korisnici mogu međusobno da dijele svoje stavove i ideje u vidu bloga
* Za svaki blog je moguće ostaviti komentar
* Korisnici imaju svoj Profile Page koji u realnom vremenu update-uje nedavne aktivnosti
* Na stranici za dodavanje novog bloga, korisnici mogu da unesu naslov, temu i sadrzaj bloga
* Sadržaj bloga mora sadržati najmanje 500 karaktera da bi blog bio validan i objavljen
* Nakon dodavanja bloga, korisnik (autor bloga) biva obaviješten o uspiješnosti dodavanja novog bloga kroz Alert koji se dispatchuje u dva slučaja, prvi slučaj je kada je dodavanje uspiješno, a drugi slučaj je kada blog nije dodat iz razloga što potrebni podaci nisu validno unijeti
* Nakon uspiješnog dodavanja bloga, korisnik će dobiti notifikaciju na segmentu notifikacija. Segment notifikacija sadrži Badge koji govori u broju notifikacija koje su nove za korisnika i koje on nije otvorio
* Nakon što korisnik otvori polje notifikacija, lista svih nedavnih notifikacija će biti prikazana, a ista lista nestaje nakon 10 sekundi i pojavljuje se druga komponenta koja pokazuje da ne postoje nedavne notifikacije i da je korisnik sve vidio
* U segmentu svih blogova, moguće je vidjeti sve korisnike koji su aktivni korisnici aplikacije
* Komponenta koja prikazuje pojedinačne blogove jednog korisnika u sebi sadrži aktivan brojač komentara za isti blog kao i glavnu temu bloga.
* Pozadinske fotografije (blog covers) za blogove se fetchuju sa Unsplash servisa.
* Svaki blog ima segment komentara koji se automatski update-uju nakon dodavanja novog komentara.


# Tehnologije koje obuhvata projekat:
## Frontend:
* ReactJS
* Material UI
* Custom CSS
* React Router
* Redux (Global State Management)

## Backend:
* NodeJS
* Express
* Mongo DB
* Mongoose
* Morgan

## Security:
* Express Rate Limit
* Helmet
* HPP
* CORS
* XSS
* Express-Mongo-Sanitize

# Download:
## Za donwload repozitorijuma, potrebno je uraditi sledeće:
```BASH
git clone { SSH ili HTTP link repozitorijuma  } .
#(.) je da se u trenutni folder klonira repozitorijum.
```
## Nakon toga, ukoliko koristite VS CODE, otvorite projekat pomoću komande:
```BASH
code .
```
# Instalacija zavisnosti (Dependencies):
## Zavisnosti se instaliraju na sledeći način:
```BASH
npm i
```
## U konzoli je jeophodno pokrenuti skriptu za konkurento pokretanje frontenda i backenda:
```BASH
npm run dev
```
### Aplikacija će biti pokrenuta u development modu.


## Stack Used:
* MERN