ЗАПУСК
Для запуска программы надо в консоли выполнить: "node index.js filename.csv";
вместо "filename" надо подставить имя отчета, который программа будет анализировать.
Зайти в браузер и открыть localhost:8080.

ВХОДНЫЕ ДАННЫЕ
Файл отчета должен представлять собой: 
    - один файл
    - файл отсортирован (сгруппирован) по пользователям 
    - разделитель столбцов в файле - это ";"

СОДЕРЖИМОЕ ПРОЕКТА
draw.js
    - представлены функции для отрисовки диаграммы и цепочек
index.css
    - стили для отрисовки цепочек
main.hbs
    - шаблон для отрисовки страницы
index.js
    - чтение файла и обработка данных
server.js
    - сервер на localhost:8080, рендерит шаблон
full_report.csv
    - пример большого отчета
small.csv
    - пример маленького отчета