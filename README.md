# MangaMelody

Projektabgabe für Kurs: Software Engineering.

|                |                                  |
|----------------|----------------------------------|
| **Projekt-Titel:** | Manga-Melody                   |
| **Name:**         | Rahil Chughtai                 |
| **Matrikelnummer:** | IU14099395                   |
| **Abschluss:**    | Informatik, M. Sc.             |
| **E-Mail:**       | rahil.chughtai@iu-study.org    |
| **GitHub-Link:**  | [https://github.com/rahilchughtai/manga-melody](https://github.com/rahilchughtai/manga-melody) |
| **Website Domain**   |  [https://manga-melody.web.app/](https://manga-melody.web.app/)                 |
| **Kursnummer:**   | DLMCSPSE01_D                  |
| **Dozent:**       | Prof. Dr. Markus Kleffmann    |



## Benutzeranleitung

Der Quellcode des Projektes kann unter dem folgenden [GitHub](https://github.com/rahilchughtai/manga-melody) Link aufgerufen werden. Da das Projekt privat ist, müssen Sie hierbei zusätzlich die Einladung als Mitwirkende Person annehmen. 

Die Anwendung kann entweder lokal ausgeführt werden, oder über die öffentliche Domäne [Manga-Melody.web.app](https://manga-melody.web.app/) aufgerufen werden.

## Lokale Ausführung 
Für die optionale lokale Ausführung der Angular-Anwendung sind einige Vorbedingungen nötig:

- installation von [Git](https://git-scm.com/) für das Clonen des Projektes
- installation von [Node](https://nodejs.org/en/download)
- installation der Angular CLI mithilfe von `npm install -g @angular/cli`

Für mehr Infos bietet die offizielle [Angular Dokumentation](https://angular.dev/tools/cli/setup-local) weitere Hinweise. 

Mit diesen Vorraussetzungen kann das Projekt mit `git clone` [geklont](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) werden. Anschließend kann in das Projekt über `cd manga-melody` navigiert werden. Von hier aus muss nur noch der Befehl `ng serve` ausgeführt werden, um das Projekt lokal zu starten.

## Nutzung der Anwendung

Sobald die Anwendung auf einem der erwähnten Wege aufgerufen wurde, ist die Home-Page zu sehen. Als nicht-eingeloggter Nutzer sind einige Features jedoch nicht verfügbar. Um sich einzuloggen, kann über die Navigationsleiste zur Log-in Seite navigiert werden. Hier kann entweder ein neuer Account erstellt werden, das Google-Login genutzt werden, oder ein von mir bereitgestellter Test-Account verwendet werden. Dieser enthält einen Manga im Warenkorb und zwei Beispiel-Bestellungen.

Test-Account Daten:

- E-Mail: `max@mangamann.com`
- Passwort: `manga123456`

Nach dem Login stehen dem Nutzer sämtliche Features von MangaMelody zur Verfügung. Die Homepage dient hierbei hauptsächlich dazu, den Nutzer zu begrüßen, und diesen zur Nutzung der Seite einzuladen.
Auf der Such-Seite stehen dem Nutzer mehr Funktionen zur Verfügung.

Die Suche erlaubt folgende Filtermöglichkeiten:

- Titel: Filtern nach Titel des Manga
- Status: Filtern nach Publizierungsstatus
    - Publishing 
    - Complete
    - Hiatus
    - Discontinued
    - Upcoming
- Genres: Filtern nach Genres 
- Order-By: Sortierung nach einem bestimmten Attribut
- Pfeil-Button: Sortierungsreihenfolge (Standardmäßig absteigend)

Zudem kann jeder Manga Favorisiert bzw. De-favorisiert werden über den Herz-Button. Standardmäßig wird der Originaltitel angezeigt. Beim Fahren mit der Maus über den Manga wird die englische Übersetzung des Titels angezeigt.
Durch das Clicken auf einen Manga wird man zur Manga-Details-Seite weitergeleitet.

Auf dieser kann der Nutzer sich mehr Infos zum Manga anschauen und diesen auch in den Warenkorb legen (sofern der Nutzer eingeloggt ist).
Hierbei muss immer der jeweilige Manga Band (Volume) und die Anzahl (maximal 50) angegeben werden.

Sobald der Warenkorb gefüllt ist, kann der Nutzer auf die Warenkorb-Seite navigieren, die Artikel überprüfen und anschließend zum Checkout.

Der Checkout-Prozess besteht aus drei Schritten. 

1. Eintragung der Versanddetails
2. Eintragung der Zahlungsinformationen
3. Finale Zusammenfassung und Bestellungsbestätigung

Für die IBAN kann folgende Mock-IBAN genutzt werden

```DE 23 10000000 1234567890```

Nach dem Abschluss der Bestellung wird der Nutzer auf die Bestellungsseite weitergeleitet, wo alle vorherigen Bestellungen eingesehen können.

## Hinweis zu Browser-Support

Aufgrund der Nutzung des Angular Frameworks ist der Support von Browsern und Versionen eingeschränkt. In der folgenden Tabelle sind die unterstützten Browser-Versionen aufgelistet. Diese Informationen sind von der [offiziellen Angular Dokumentation](https://angular.dev/reference/versions).

| Browser | Unterstützte Versionen |
|---------|------------------------|
| Chrome  | 2 neueste Versionen |
| Firefox | neueste und erweiterte Support-Version (ESR) |
| Edge    | 2 neueste Hauptversionen |
| Safari  | 2 neueste Hauptversionen |
| iOS     | 2 neueste Hauptversionen |
| Android | 2 neueste Hauptversionen |


## Automatisch generierte Dokumentation

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


ng generate @angular/core:cleanup-unused-imports
