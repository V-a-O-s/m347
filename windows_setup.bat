@echo off
setlocal enabledelayedexpansion

REM Standardwerte
set "CONFIG_DB_URI=mongodb://localhost:27017"
set "CONFIG_DB_NAME=packages_db"
set "CONFIG_DB_COLLECTION_NAME=packages"
set "CONFIG_PORT=3000"
set "CONFIG_API_KEY=m347"

REM Fragen an den Benutzer
echo Standart werte sind bereits gesetzt mit Einfuegen bitte die Installation weitermachen
set /p "db_uri=Geben Sie die MongoDB URI ein [%CONFIG_DB_URI%]: "
set /p "db_name=Geben Sie den Datenbanknamen ein [%CONFIG_DB_NAME%]: "
set /p "collection_name=Geben Sie den Collectionsnamen ein [%CONFIG_DB_COLLECTION_NAME%]: "
set /p "port=Geben Sie den Port fuer den Webserver ein [%CONFIG_PORT%]: "
set /p "api_key=Geben Sie den API-Key ein [%CONFIG_API_KEY%]: "

REM Verwenden Sie Standardwerte, wenn keine Eingabe erfolgt
if "%db_uri%"=="" set "db_uri=%CONFIG_DB_URI%"
if "%db_name%"=="" set "db_name=%CONFIG_DB_NAME%"
if "%collection_name%"=="" set "collection_name=%CONFIG_DB_COLLECTION_NAME%"
if "%port%"=="" set "port=%CONFIG_PORT%"
if "%api_key%"=="" set "api_key=%CONFIG_API_KEY%"

REM Erstellen der .env-Datei
echo DB_URI=!db_uri!> .env
echo DB_NAME=!db_name!>> .env
echo DB_COLLECTION_NAME=!collection_name!>> .env
echo PORT=!port!>> .env
echo API_KEY=!api_key!>> .env

echo .env-Datei wurde erstellt!
REM Führen Sie die zusätzlichen Befehle aus
npm init -y
npm i express path dotenv mongoose
docker-compose down
docker-compose build
docker-compose up -d

echo Zusätzliche Befehle wurden ausgeführt!
pause
