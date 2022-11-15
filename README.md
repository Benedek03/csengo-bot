# Csengő bot
Ez a csengő discordon egy szabadon választott hangcsatornán minden héten hétfőtől péntekig szól, hogy mikor kezdődik illetve van vége egy órának. Erre azért van szükség mert az infóteremben nem lehet mindig hallani a csengőt.

## Docker image megszerzése
### Lehúzás Docker Hubról
```
docker pull benedek03/csengo
```
### Vagy megépítés locálisan
```
git clone https://github.com/Benedek03/csengo-bot.git
cd csengo-bot
docker build . -t benedek03/csengo
```

## Egy container futtatása
### .env fájllal
```
docker run -d --env-file .env --name csengo benedek03/csengo
```
a .env fájlnak tartalmaznia kell ezeket a változókat:
```
TOKEN=  #discord bot token 
VCID=   #discord voice channel
TZ=     #timezone e.g. Europe/Budapest
```
### .env fájl nélkül
```
docker run -d \
    -e TOKEN= \
    -e VCID=  \
    -e TZ=    \
    --name csengo benedek03/csengo
```