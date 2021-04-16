# Checkliste Status-Meeting

## Anwendungsfall

Als Anwendungsfall habe ich an einen Blog gedacht, welcher mithilfe des Headless CMS (Contentful) von einem Editor gepflegt und auf mehrere Plattformen (mit React Native) veröffentlicht werden kann. Der Editor soll die Möglichkeit haben, bestehenden Inhalte zu bearbeiten und neue Inhalte wie bspw. Blog Posts zu erstellen.

## Was ist React Native?

React Native ist ein Framework das auf React.js aufbaut. Das Framework ermöglicht es plattformübergreifende, Native Apps mit JavaScript zu entwickeln. Der JavaScript Code wird allerdings dabei nicht in Nativen Code kompiliert, sondern kommuniziert über eine sogenannte "Bridge" mit den Nativen Core Components von React Native.
![react-native](./documentation/react-native.png 'react-native')
Weitere Informationen wie [React Native Under The Hood](https://hackernoon.com/understanding-react-native-bridge-concept-e9526066ddb8) funktioniert.

Durch diese Arbeitsweise wird lediglich eine Codebase für die verschiedenen Plattformen benötigt.

## Was ist ein Headless CMS (Contentful)?

Bei einem Headless CMS wird im Vergleich zu einem traditionellen CMS das Frontend (Head) vom Backend getrennt. Dies hat zur Folge, dass ein Headless CMS keine Darstellungsebene besitzt, sondern lediglich eine Inhaltsebene. Durch den Wegfall der Darstellungsebene ist es möglich, mehrere Kanäle (Heads) zu bedienen. Die Auslieferung von neuen Inhalten und Daten erfolgt über eine RESTful-API, welche von unterschiedlichen Programmiersprachen abgerufen werden kann.

## Welche Erfahrungen haben Sie mit den Technologien gemacht?

Bisher konnte ich noch keine Erfahrungen mit React Native und Contentful sammeln, allerdings habe ich bereits Vorkenntnisse in React.js.

## Wie weit sind Sie mit der Einarbeitung?

- React Native Projekt aufgesetzt
- Emulator installiert
- Contentful Konto erstellt
- Content Types in Contentful erstellt
- Contentful in ein React Native Projekt intigiriert
- Daten von Contentful erfolgreich in React Native Application gefetched und gerendert

## Ist die zu den Technologien vorhandene Dokumentation hinreichend?

Die Dokumentation für React Native und Contentful ist sehr gut.

[React Native Documentation](https://reactnative.dev/docs/getting-started)

[Contentful Documentation](https://www.contentful.com/developers/docs/)

## Ist die Community rund um diese Technologien lebendig?

Die Community rund um React Native ist sehr lebendig, es gibt unzählige Stackoverflow Einträge oder Medium Posts.
Bei Contentful ist die Community nicht ganz so lebendig, wie bei React.js.

## Wie hoch ist der Aufwand für die Installation?

Es gibt zwei Möglichkeiten React Native zu installieren.
Zum einen über die Expo CLI und zum anderen über die React Native CLI.

### React Native

- **React Native CLI**

  Die React Native CLI wird empfolen, wenn in einem Projekt neben Javascript auch mit Nativem Code gearbeitet werden soll / muss. Außerdem wird die React Native CLI empfolen, wenn React Native in eine bereits bestehende Application eingebunden werden soll.

  Die Installation über die React Native CLI ist aufwändig, da abhängig von der jeweiligen Plattform Android Studios und / oder XCode installiert werden muss.

- **Expo CLI**

  Da ich vorerst aussließlich mit Javascript / Typescript arbeite, habe ich mich für die Expo CLI entschieden. Die Expo CLI ermöglicht es innerhalb weniger Minuten ein Projekt zu erstellen und zu starten. Dazu müssen die folgenden Befehle ausgeführt werden (Node Version 12 LTS oder größer wird vorausgesetzt):

  ```
  npm install -g expo-cli
  ```

  ```
  expo init MyProject
  ```

  Nach dem Ausführen der Befehle können verschiedene Templates ausgewählt werden. Ich habe mich für das Template "Blank (TypeScript)" entschieden.

  ![expo-cli](./documentation/expo-cli.png 'expo-cli')

  Wurde das Projekt erfolgreich aufgesetzt kann mit dem Befehl `npm start` das Projekt gestartet werden. Mithilfe der iOS und Android App [Expo](https://expo.io), kann das Projekt direkt auf das eigene Handy deployed werden. Dies funktioniert wie folgt:
  ![expo-app](./documentation/expo.png 'expo-app')
  Quelle: [Expo Documentation](https://docs.expo.io/guides/how-expo-works/)

  Als Alternativ kann hierfür auch ein Emulator verwendet werden. Um einen Emulator zu verwenden muss allerdings XCode und / oder Android Studio installiert werden.

### Contentful

Der Aufwand für die Installation von Contentful ist relativ gering. Es muss lediglich die Contentful Javascript SDK installiert und der Client initialisiert werden.

```
npm install contentful
```

Client Initialisieren

```Typescript
import { ContentfulClientApi } from 'contentful';
import { createClient } from 'contentful/dist/contentful.browser.min.js';
import { CONTENTFUL_SPACEID, CONTENTFUL_TOKEN, CONTENTFUL_ENVIRONMENT } from '@env';

export const client: ContentfulClientApi = createClient({
  space: CONTENTFUL_SPACEID,
  accessToken: CONTENTFUL_TOKEN,
  environment: CONTENTFUL_ENVIRONMENT,
});
```

Der API Key und die Space ID können in den Contentful Settings unter dem Punkt "API keys" abgerufen werden.

## Wie hoch ist der Aufwand für die Einarbeitung in die Technologien?

### React Native

Der Aufwand für die Einarbeitung ist abhängig davon, welche Kenntnisse der Entwickler bereits hat. Sind ihm die Konzepte von React.js bereits bekannt, ist eine Einarbeitung in React Native deutlich einfacher. Da es sich bei React Native um Komponenten handelt die in Nativen Code compiliert werden, gibt es Unterschiede in den folgenden Bereichen:

- **Markup:** Im Vergleich zu einer herkömmlichen React Componente kann bei React Native nicht mit HTML-Elementen gearbeitet werden. Das liegt daran, dass das Ziel nicht der Browser ist, sondern eine Native App. Anstelle von HTML-Elementen müssen die React Native Core Componenten genutzt werden.

  **Headline Component React**

  ```JSX
  /* headline.tsx */
  import React from 'react';

  type Props = {
    title: string;
  };

  const Headline = (props: Props) => {
    return (
    <div className="Headline__container">
      <h1 className="Headline__text">{props.title}</h1>
    </div>;
    )
  };
  ```

  **Headline Component React Native**

  ```JSX
  /* headline.tsx */
  import React from 'react';
  import {Text, View} from 'react-native';

  type Props = {
    title: string;
  };

  const Headline = (props) => {
    return (
    <View style={styles.headline__container}>
      <Text style={styles.headline__text}>{props.title}</Text>
    </View>;
    )
  };
  ```

- **Styling:** In React Native werden Componenten nicht mit CSS gestyled sondern mit JavaScript.

  **Styling React**

  ```CSS
  /* headline.css */
  .headline__container {
    background-color: '#000'
  }

  .headline__text {
    font-size: 30px
  }
  ```

  **Styling React Native**

  ```JSX
  /* headline.tsx */
  import React from 'react';
  import {StyleSheet} from 'react-native';

  const styles = StyleSheet.create({
    headline__container: {
      backgroundColor: '#000'
    },
    headline__text: {
      fontSize: 30,
    },
  });
  ```

- **Debugging:** Bei einer React Native Anwendung kann nicht auf die DOM - Elemente wie bei einer WebApp zugegriffen werden. Es gibt lediglich eine Debug Console.

### Contentful

Die Bedienung von Contentful ist sehr intuitiv und es lassen sich einfach die ersten Content Types erstellen. Die erstellen Content Types lassen sich über die "Content Delivery API" mit nur wenigen Zeilen Code fetchen.

**Daten Fetchen des Content Types "blogPost"**

```Javascript
client
  .getEntries({
    content_type: 'blogPost',
  })
  .then((response) => {
    console.log(response.items);
  })
  .catch(console.error);
```
