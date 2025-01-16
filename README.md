# Лаба 7. Разработка клиент-серверного приложения

## Задание

Реализуйте веб-приложение по вашему варианту с использованием разработанного ранее API (реализуйте клиентскую часть с учетом требований адаптивности)
создайте БД, которая содержит не менее трех таблиц (таблицы должны быть связаны между собой)
реализуйте функционал по регистрации и авторизации прользователей в системе (должен быть гостевой вход (без авторизации), зарегистрированный пользователь (имеет доступ к функционалу, которого нет у Гостя), администратор (пользователь, имеющий доступ к административной панели веб-приложения).
реализуйте функционал по предоставлению основной услуги вашего приложения (возможны другие варианты):

реализуйте (на выбор) один из следующий функционалов:
- [ ] поиск 
- [ ] фильтрация (выборки, сортировка) 
- [ ] лайк, поддержка
- [ ] вывод данных с внешнего API
- [ ] собственный Restfull API
- [ ] использование кукки
- [ ] загрузка данных (структурированных файлов) через веб-интерфейс
- [ ] вывод данных об обновлении контента (дата, время)

- [ ] реализуйте функционал для администратора - в административной панели предоставляется возможность выгрузки отчета в формате xlsx данных, хранящихся в таблицах  БД. Необходимо реализовать возможность выбора из каких таблиц  нужны данные и какие - [ ] атрибуты( поля таблиц) представить в отчете. 

- [ ] Опубликуйте сервис на любом бесплатном хостинге, для веб-приложений на Python можно воспользоваться https://www.pythonanywhere.com/. 

- [ ] В качестве ответа отправьте ссылку на сервис, а такде ссылку на проект в GitHub.

### Требования:

- [ ] Веб-приложение корректно открывается на трех видах устройств (десктоп, планшет, смартфон).
- [ ] Все разделы открываются, media отображаются.
- [ ] Стили отображаются корректно. 
- [ ] Пароли пользователей в БД должны храниться в зашифрованном виде.
- [ ] Обработка SQL инъекций, XSS.
- [ ] Код сопровождается комментариями.
- [ ] Веб-приложение имеет несколько коммитов (не менее 3х).


### Варианты

> *7.* Заявка на кредит.

## Первичная Настрока базы данных для Django

> Выполнять **после** запуска Docker контейнера 

[Инструкция по миграции](server/МОГРАЦИЯ.md)

## Docker

### Сборка Docker образа из Dockerfile

```sh
docker compose build
```

### Запуск Docker композа

```sh
# будет выводит информацию в консоль
docker compose up
```

или

```sh
# запустит контенер без консоли
docker compose up -d
```

### Остановка Docker композа

```sh
# остановит контенер
docker compose down
```

### Зайти в оболочку контейнера

```sh
# зайти в комендную обалочку контенера
docker exec -it container_name sh
# docker exec -it laba-6-django sh
```

или

```sh
# зайти в комендную обалочку контенера через композ
docker compose exec service_name sh
# docker compose exec laba-6-django sh
```

## Настрока Django без Docker

### Настрока Питона

Сохраняем список всех установлинных в питон пакетов

```sh
pip freeze > requirements.txt
```

Устанавливаем в питон список пакетов

```sh
pip install -r requirements.txt
```

### Как создать новый серер

```sh
django-admin startproject server 
```

### Как создать модуль

```sh
python manage.py startapp module_name
```

### Кака запустить джанго

```sh
cd server

python manage.py runserver
```

### Джанго проверка

[http://127.0.0.1:8005/](http://127.0.0.1:8005/)

