# PJP PAC 3

En aquesta PAC es practiquen les tècniques de programació asíncrona a JavaScript: _callbacks_, promeses i _async/await_, així com les diferents combinacions entre elles.

## Competències

En aquesta PAC es desenvolupen les següents competències del Màster:

* Utilitzar de manera adequada el llenguatge JavaScript i fer-lo servir en el desenvolupament de llocs i aplicacions web, en funció de les necessitats del projecte.
* Adaptar-se a les tecnologies web i als futurs entorns actualitzant les competències professionals.

## Objectius

Els objectius concrets d'aquesta PAC són:

* Aprendre els conceptes bàsics de promeses en JavaScript.
* Aprendre els conceptes bàsics de l'asincronia en JavaScript.

## Lliurament de la PAC

Un cop hagis realitzat les activitats pràctiques proposades en aquest enunciat, **el lliurament es realitzarà de forma doble**:

- Hauràs d'enviar els teus canvis a l'apartat de l'aula virtual de la UOC.
- Hauràs d'enviar els teus canvis al repositori de GitHub Classroom.
 
Recorda que aquest repositori l'has clonat del repositori a GitHub. Quan treballis al teu sistema, tots els canvis els faràs als teus fitxers locals, els quals hauràs d'afegir i _comitejar_ al teu repositori Git. Aquests canvis estaran al teu sistema fins que facis _push_ i els enviïs al repositori a GitHub.

Recorda que has de treballar a la branca _main_ o _master_ (la que es crei per defecte). Pots fer diversos enviaments.

A l'aula virtual trobareu una _checklist_ que us ajudarà a repassar tots els passos que heu de fer per al lliurament del vostre PAC.

## Puntuació

El fet de treballar amb tests per verificar la funcionalitat del codi us permetrà tenir una idea de la vostra pròpia nota abans del lliurament.

La puntuació dels exercicis pràctics es basa en dos criteris: **Funcionalitat** i **implementació**. S'espera que els exercicis funcionin correctament (passin els tests) i que la implementació (el codi) tingui una qualitat adequada.

Alguns detalls a tenir en compte:

- Es penalitzarà qualsevol intent de _hardcodejar_ els tests per forçar que passin. Aquesta tècnica consisteix a canviar la implementació perquè torni únicament el valor esperat pel test (qualsevol altre test fallaria).
- Els tests automàtics estan dissenyats per detectar exercicis erronis o incomplets per a casos concrets. El fet que un test passi no garanteix que l'exercici estigui realitzat correctament, és a dir, que cobreixi tots els casos.
- Un exercici els tests del qual no passen es puntuarà amb un 0 llevat que hi hagi problemes amb el test.
- A més de passar els tests, el professorat avaluarà el vostre codi en base als següents criteris:
   - Llegibilitat, senzillesa i qualitat del codi.
   - Coneixements de programació. Per exemple, no utilitzar les estructures de control adequades, com ara utilitzar un bucle per construir una sentència condicional o viceversa.

## Requisits mínims

- Tenir instal·lat Visual Studio Code.
- Coneixements bàsics de Git i GitHub (Activitats 2 i 3 del Repte 1).
- Estudi de la introducció i repàs a JavaScript (Activitat 1 del Repte 2).
- Estudi dels conceptes de JavaScript (Activitats 2 i 3 del Repte 2).
- Estudi de la introducció a l'asincronia en JavaScript (Activitat 1 del Repte 3).
- Estudi dels conceptes d'asincronia de JavaScript (Activitat 2 del Repte 3).

## Exercicis pràctics (9 p)

Per realitzar els exercicis pràctics t'has de dirigir a la següent ruta, dins del repositori: `src/pec3/pec3.js`.
En aquest fitxer hauràs d'implementar les funcions que t'indiquem als exercicis que veuràs més avall.

D'altra banda, els tests que et permetran saber si la solució que proposes per als exercicis és correcta són al fitxer `src/pec3/pec3.spec.js`.
**No heu d'editar aquest fitxer**.
Tingues en compte que els tests són condicions que han de complir les funcions que implementaràs en els exercicis, per la qual cosa et poden servir d'ajuda per corregir-los.

### Preparant l'entorn

Un cop fet clone del repositori, has d'instal·lar les dependències del projecte.

````
npm install
````

A continuació, per llançar els tests has d'executar la següent ordre:

````
npm t
````

La instrucció anterior llançarà els tests cada cop que deseu el fitxer `src/pec3/pec3.js`, que és precisament on implementareu els exercicis d'aquesta PAC.

Tal com t'indiquem a la PAC 1, la primera vegada que executis `npm t` i es llencin els tests, fallaran tots, ja que no hi ha cap exercici implementat. Conformi vagis treballant en els exercicis i guardis el fitxer, pot ser que algun test llanci algun error. Revisa el missatge d'error que s'imprimeix per conèixer el format i entendre com es notifiquen els errors.

Si tens algun problema amb els tests, no dubtis a preguntar al fòrum "Dubtes PAC 3 | Dubtes PAC 3" de l'aula.


### Exercici 1 (1,5 p)

#### Enunciat

Implementa la funció `generateStats(data, callback)`, que rep 2 paràmetres:
- `data`: un valor nullable, de tipus `Array`, el contingut del qual seran elements de tipus `String` o valors nuls.
- `callback`: una funció que pren dos paràmetres:
   - `data`: resultat de l'operació o `null` en cas d'error.
   - `error`: `null` en cas d'èxit o un `String` amb un missatge indicant la causa de l'error.

La funció haurà d'analitzar el contingut de `data` per determinar quantes vegades es repeteix cada element diferent, ignorant els valors nuls. Després, haureu de construir un nou objecte buit i afegir tants atributs com valors diferents s'hagin trobat. Cada atribut afegit així tindrà el mateix nom que el valor al qual representa, i el seu valor s'establirà al nombre d'aparicions trobades a `data`.

Per exemple, si `data` és `['lion','lion','zebra','giraffe','giraffe','giraffe',null,null]`, l'objecte seria `{'lion' : 2 , 'zebra' : 1, 'giraffe' : 3}`.

Un cop construït l'objecte anterior, caldrà executar la funció _callback_ subministrada segons aquestes premisses:
- Si `data` és vàlid, és a dir, és un array d'elements de tipus `String` o nuls; el valor per al paràmetre `data` de la funció _callback_ serà l'objecte construït, mentre que el del paràmetre `error` serà `null`.
- Si `data` és `null` o no és de tipus `Array`, el valor per al paràmetre `data` de la funció _callback_ serà `null`, mentre que el del paràmetre `error` serà una cadena amb el text: `Invalid input`.

Finalment, la funció haurà de tornar el valor retornat durant l'execució de callback.

### Exercici 2 (1,5 p)

#### Enunciat

Implementa la funció `callbackPromise`, que rep 3 paràmetres:
- `time`: un valor no nul, de tipus `Number`, que indica una quantitat de mil·lisegons.
- `info`: un valor de tipus `Array`, no nul, amb un contingut arbitrari.
- `callback`: una funció que pren un únic argument de tipus `Array`.
   - En cas d'èxit, tornareu un valor de tipus `Array`. L'array retornat tindrà el mateix nombre d'elements que l'argument d'entrada i cada element serà del mateix tipus.
   - En cas d'error, llançarà una excepció amb un codi d'error de tipus `Number`.

L'objectiu de la funció `callbackPromise` és crear una promesa que executi de forma asíncrona i en diferit el `callback` subministrat utilitzant el valor `info` com a argument. El valor retornat per la funció _callback_ serà utilitzat per la promesa per fer una suma matricial amb el valor `info` i retornar el resultat.

D'aquesta manera, es tindran en compte els requisits següents:
- La funció haurà de retornar una promesa.
- La promesa haurà de fallar si alguna cosa va malament durant el procés.
- La promesa no haurà de resoldre's abans que transcorrin `time` mil·lisegons.
- En resoldre's, la promesa haurà de retornar el resultat de la **suma matricial** entre `info` i el resultat de l'execució del callback. En altres paraules, haurà de retornar un nou `Array` on cada element serà la suma dels elements individuals de `info` i el resultat del callback.

> **Nota:** La suma matricial és l'operació de sumar dos arrays sumant els components o elements corresponents. Per exemple, donats els arrays `[1, 1, 1]` i `[0, 7, 2]` la suma matricial és `[1, 8, 3]`.

### Exercici 3 (1,5 p)

#### Descripció

En aquest exercici veurem com fer servir promeses imbricades (niuades) per implementar una funció de validació de dades (obtingudes d'un formulari, per exemple) fent ús d'una funció o API asíncrona. En aquest cas, la funció que has d'implementar haurà de verificar que les dades introduïdes són vàlides i s'ajusten als requisits exigits.

Les dades d'usuari que hauràs de validar estan modelades per la classe `UserForm`, que té la següent estructura:
   - `userName`, de tipus `String`
   - `password`, de tipus `String`
   - `confirmPassword`, de tipus `String`

Un dels requisits és que els noms d'usuari no poden estar duplicats. Per això, se us facilitarà una funció `userExists` que comprova si ja existeix al sistema un usuari registrat amb el mateix nom. Aquesta funció pren un únic argument de tipus `String` amb el nom de l'usuari que voleu comprovar. Com a resultat, retorna una promesa que:
- En cas d'èxit, es resol amb un valor `Boolean` indicant si l'usuari ja existeix o no.
- En cas d'error, es rebutja amb un missatge de text indicant què ha passat.

#### Enunciat

Implementa la funció `validateForm(formData,userExists)`, que rep 2 paràmetres:
- `formData` és una instància de tipus `UserForm`
- `userExists` és una funció que determina l'existència d'un usuari (veure descripció a dalt)

L'objectiu de la funció `validateForm` és efectuar una validació que consulti un origen de dades asíncron (representat per la funció `userExists`) com a part de la lògica. Haurà de complir els objectius següents:
- La funció efectuarà una sèrie de comprovacions sobre `formData`:
   - Si `userName` és nul, generarà un error amb el missatge `userName cannot be null`.
   - Si `password` és nul, generarà un error amb el missatge `password cannot be null`.
   - Si `confirmPassword` no coincideix amb `password`, generarà un error amb el missatge `passwords don't match`.
   - Si `userName` ja existeix, generarà un error amb el missatge `userName already exists`.
- La funció retornarà una promesa amb les següents característiques:
   - En cas d'èxit, es resol retornant el valor de `userData`.
   - En cas d'error en la validació, es rebutja amb el missatge d'error capturat.

> Nota: No cal crear la classe `UserForm`, fixeu-vos que ja està definida al fitxer `pec3.js`

### Exercici 4 (1,5 p)

#### Descripció

En aquest exercici, practicarem l'encadenament de promeses. Per fer-ho, modelarem de manera simplificada el procés de registre d'un usuari en un portal web. Les dades que es registraran estan modelades per la classe `UserData`:
   - `userName`, de tipus `String`
   - `password`, de tipus `String`
   - `email`, de tipus `String`

El procediment de registre és com es descriu a continuació:
1. Adquirir les dades de l'usuari.
2. Validar les dades de l'usuari.
3. Emmagatzemar les dades de l'usuari.

Cadascun dels passos descrits anteriorment es correspon amb una funció que encapsula cada etapa del procés:
- `getUserData()`, una funció que recopila les dades de l'usuari. No pren cap argument i retorna una promesa que:
   - En cas d'èxit, es resol amb un objecte de tipus `UserData`
   - En cas d'error, es rebutja amb un missatge d'error indicant què ha passat.
- `validateData(userData)`, una funció que valida les dades d'un usuari. Pren com a argument un objecte de tipus `UserData` i retorna una promesa:
   - En cas d'èxit, es resol retornant un codi numèric.
   - En cas d'error, es rebutja amb un missatge d'error indicant què ha passat.
- `saveUserData(userData)`: és una funció que desa les dades d'un usuari en una base de dades remota. Pren com a argument un objecte de tipus `UserData` i retorna una promesa que:
   - En cas d'èxit, es resol amb un valor de tipus `String` que reflecteix l'identificador únic de l'usuari recent creat.
   - En cas d'error, es rebutja amb un missatge d'error indicant què ha passat.

#### Enunciat

Implementa la funció `registrationProcess(getUserData,validateData,saveUserData)`. Els tres arguments que rep es corresponen amb les funcions descrites anteriorment.

L'objectiu és efectuar la captura de dades, validació i emmagatzematge de les dades de l'usuari, fent ús dels valors passats com a arguments. La funció ha de complir els requisits següents:
- La funció haurà de capturar les dades de l'usuari utilitzant `getUserData()`.
- La funció haurà de validar les dades adquirides utilitzant `validateData()`.
- La funció haurà de desar les dades utilitzant `saveUserData()`.
- El resultat de la funció serà una **promesa**.
   - En cas d'èxit, es resoldrà retornant un `Object` amb els atributs següents:
     - `userData`: de tipus `UserData`, contindrà les dades de l'usuari obtingudes del formulari a través de `getUserData()`.
     - `validationCode`: de tipus `Number`, contindrà el codi de validació retornat per la funció `validateData()`
     - `userId`: de tipus `String`, contindrà el valor retornat per la funció `saveUserData()`
   - En cas d'error, es rebutjarà retornant un missatge amb el text: `REGISTRATION FAILED: <err>`, on `<err>` és el missatge d'error capturat.

> Nota: No cal crear la classe `UserData`, fixa't que ja està definida al fitxer `pec3.js`

### Exercici 5 (1,5 p)

#### Enunciat

En aquest exercici veurem com posar en pràctica els conceptes apresos sobre async/await. Per fer-ho, hauràs d'implementar la funció `asyncProcess(times,produce,consumer)`, que pren tres arguments:
- `times`: un valor de tipus `Number` que indica el nombre d'iteracions que caldrà efectuar.
- `produce`: és una **funció asíncrona** que no pren arguments i retorna un valor de tipus `Array`. En cas d'error, llançarà una excepció amb un missatge indicant què ha passat.
- `consume`: és una **funció asíncrona** que pren un únic argument arbitrari i torna també un argument arbitrari. En cas d'error, llançarà una excepció amb un missatge indicant què ha passat.

La funció `asyncProcess` haurà de tenir les característiques següents:
- Serà una funció asíncrona, i per tant haurà de fer ús de les paraules reservades **async/await**
- La funció cridarà a `produce()` tantes vegades com s'hagi indicat a l'argument `times`
- Cada element obtingut com a resultat de `produce()` caldrà subministrar-lo com a argument a `consume()` (_veure nota_)
- La funció haurà de tornar un `Array` on es trobin tots els resultats obtinguts d'invocar la funció `consume()`
- En cas d'error, la funció ha de llançar una excepció de tipus `Error` amb el missatge: `Error on iteration <iteration>: <error>`, on `<iteration>` és el número d'iteració en què ha fallat la funció, i `<error>` el codi d'error obtingut.

> Nota: `produce()` retorna un `Array` de resultats, de manera que caldrà invocar `consume()` per a cada element de la llista obtinguda.

### Exercici 6 (1,5 p)

#### Enunciat

En aquest exercici s'implementarà una funció capaç de dur a terme una tasca en segon pla, de manera que permeti conèixer l'estat de l'operació. Per aconseguir aquest objectiu, la funció haurà d'executar de forma asíncrona el procés i tornar una funció que ens proporcionarà informació sobre aquest procés cada cop que sigui executada.

Implementa la funció `backgroundProcess(produce,consumer)`, que pren dos arguments:
- `produce`: és una funció asíncrona amb les següents característiques:
   - No rep cap argument
   - Retorna com a resultat un `Array` amb valors arbitraris o `null`.
- `consumer` és una funció amb les següents característiques:
   - Pren un únic argument `product`, un valor arbitrari no nul de qualsevol tipus.
   - Retorna una promesa que en resoldre's retorna un valor arbitrari no nul. En cas d'error, es rebutjarà amb un codi d'error de tipus numèric.

La funció haurà de satisfer els següents requisits:
- Executarà un procés asíncron de forma periòdica:
   - El temps entre trucades haurà de ser de 100 mil·lisegons.
   - A cada iteració s'invocarà la funció `produce()` per obtenir nous valors.
   - Si el valor obtingut fos vàlid (diferent a `null`), caldrà iterar sobre cada element de l'array retornat i subministrar-lo com a argument a la funció `consumer()`.
   - Si el valor obtingut no és vàlid (`null`), el procés haurà de finalitzar.
- **Retornarà immediatament, com a resultat, una funció** que en ser invocada retornarà un objecte amb els atributs següents:
     - `available` (`Array`): Un array que conté els elements produïts i consumits **des de la darrera invocació de la funció retornada**
     - `totalProduced` (`Number`): Un valor numèric que indica el total d'elements produïts en segon pla
     - `status`: (`Number`): `0` Si el procés encara no ha començat, `1` si el procés està en execució, `2` si el procés ha acabat.