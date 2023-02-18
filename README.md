# Prima

<h2> Allgemeine Informationen zur Endabgabe</h2>

<ul>
<li> Titel: <em>Archero</em></li>
<li>Author: Fynn Janke</li>
<li>Semester: Wintersemester 22/23 </li>
<li> Studiengang: MIB5</li>
<li>Modul: Prima </li>
<li>Dozent: Prof. Jirka Dell´Oro-Friedl </li>
</ul>

<h2> Link zur Endabgabe</h2>
<a href="https://jankefyn.github.io/Prima/Archero/"> Archero </a><br>
<a href="https://github.com/jankefyn/Prima/tree/main/Archero/Script"> Archero Source Code </a><br>
<a href=""> Konzept PDF </a>

<h2> Beschreibung zum Spiel </h2>

<p> In diesem Spiel bewegt man sich mit den gewohnten Tasten W(vorwärts), A(links), S(rückwärts), D(Rechts). Sobald man Stehen bleibt, wird auf den naheliegendsten Gegner geschossen. Der Gegner beginnt zu Schießen wenn man ihm zu nahe kommt. Wird man getroffen verliert man Leben. Ziel ist es den Gegner zu bewältigen bevor man selbst keine Leben mehr hat.</p>

|Nummer   | Kriterium  |Erläuterung   |
| :------------ | :------------ | :------------ |
|1   |Units and Positions   |Die 0 ist links Unten und die 1 ist genau die größe eines Cubes. Die Cubes werden bspw. verwendet um daraus Hindernisse zu bauen. Der Charakter hat genauso die Größe 1.    |
|2 |Hierarchy   | Die Hierarchie ist sehr unkompliziert gehalten. Den größten Vorteil erhalte ich dadurch, dass alle Hindernisse ein Kind von Obstacles werden und somit besser durch alle Hindernisse Iteriert werden kann um eine Collison abzufragen. </br> <b>Hierarchie:</b><ul><li> Room1<ul><li>Ground</li><li>Obstacles<ul><li>Einzelne Cubes um Obstacles zu platzieren<ul></ul></li></ul></li><li>Character</li><li>Walls<ul><li>left_Wall</li><li>right_Wall</li><li>back_Wall</li><li>front_Wall</li></ul></li></ul></li></ul> | |
|3   |Editor   | Der Editor wurde verwendet um die Position der nicht beweglichen Objekte festzulegen. Außerdem habe ich Den Charakter im Editor an seine Startposition gesetzt. Der Gegner wird im Code erzeugt, damit man in Zukunft mehrere Gegner automatisiert an zufälliger Position Spawnen kann.(Aktuell kann man das Zwar schon einstellen über die external Data, aber mehrere Gegner zu erzeugen führt noch zu Problemen beim Despawnen.  |
|4   |Scriptcomponents   | Ein Custom Scriptcomponent wird verwendet um die Steuerung des Charakters seperiert von dem mainscript ausführen zu können. Dadurch wird der Code übersichtlicher. Außerdem wird von hier aus das Custom Event ausgelöst. |
|5   |Extend  |Ich habe für meine CharakterNode extends ƒAid.NodeSprite genutzt um eine Animation mit Spritesheets erzeugen zu können.   |
|6   |Sound   | Wenn der Charakter schießt wird ein passender Sound abgespielt. Der AudioListener befindet sich an der Kamera, sodass der Spieler den Ton immer gleich Laut hört.  |
|7   |VUI   | Links oben kann man die aktuelle Lebensanzeige des Charakters sehen diese Startet bei 100 leben   |
|8   |Event-System   | Das Custom Event wird verwendet um dem Main script mitzuteilen, dass der Charakter jetzt schießen soll. Dies war in meinem Fall Theoretisch wahrscheinlich nicht nötig, da ich das Schießen auch in der Charakter klasse hätte machen können. Allerdings habe ich so die Funktion des Schießens und die des Überprüfens ob ein Schuss getroffen hat im selben Skript wodurch ich einige informationen nicht exportieren bzw. zwischen den Funktionen hin und her geben muss.  |
|9   |External Data   | In meiner External Data werden Hauptsächlich geschwindigkeiten Festgelegt. So kann der Spieler selbst entscheiden wie schnell das Spiel sein soll.   |
|A   |Light   |Es wurde ein Ambientes Licht verwendet, welches eine leicht gelbliche Farbe hat um etwas mehr Atmosphäre zu schaffen. Dieses Licht befindet sich am Charakter.   |
|B   |Physics   | Es wurden keine Physics verwendet.  |
|C   |Net   |Es ist kein Multiplayer möglich.   |
|D  |State Machines   |Eine ComponentStateMachine wird verwendet um das verhalten des Gegners zu bestimmen. Dieser kann still stehen (idle), fängt an den Charakter zu jagen wenn er sich ihm auf eine bestimmte nähe nähert(hunt),schießt auf ihn wenn er sich in schussreichweite genähert hat(shoot) und kann einfach nichts machen wenn er gestorben ist (dead) |
|E   |Animation   |Es wurde eine sprite animation benutzt dass der Charakter sich immer ein bisschen bewegt egal ob dieser gerade still steht oder nicht.   |
