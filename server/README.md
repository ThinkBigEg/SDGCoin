## Run WebServer


### Run MYSQL 
 - docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=```passpass``` -d mysql

### Install python pre-requisites 
 - PYTHON 3.5
 - ```pip install flask```
 - ```pip install flask_cors```
 - ```pip install mysqlclient```

### Run the webserver  
 - export MY_SQL_HOST=```127.0.0.1```
 - export MY_SQL_ROOT_PASSWD=```passpass```
 - python webserver.py
 
 
### WebServer REST API (localhost:5000)
  - ```/app/register/lp/<pk>/<name>/<desc>/<location>/<float:perc>```
    - example: ```curl http://localhost:5000/app/register/lp/lp1/lpname1/lpdesc1/lplpcation1/0.023```
    - result: ```{"status": "success", "res": 1}```
    
  - ```/app/register/hc/<pk>/<name>/<desc>/<location>```
    - example: ```curl http://localhost:5000/app/register/hc/hc1/hcname1/hcdesc1/hclpcation1```
    - result: ```{"status": "success", "res": 1}```    

  - ```/app/register/fp/<pk>/<name>/<desc>/<location>```
    - example: 
    - result: 

  - ```/app/register/get/<entity>/<pk>```
     - example: ```curl http://localhost:5000/app/register/get/lp/lp1```
     - result: ```{"status": "success", "res": true}```

  - ```/app/fp_menu_items/add/<fp_pk>/<iid>/<iname>/<idesc>/<itype>/<iexpiration>/<iavailability>/<int:price>/<int:n>```    
     - example: ```curl http://localhost:5000/app/fp_menu_items/add/fp1/iid1/iname1/idesc1/itype1/iexpiration1/iavailability1/12/2```
     - result: ```{"status": "success", "res": 1}```
   
  - ```/app/fp_menu_items/get/<fp_pk>```
     - example: ```curl http://localhost:5000/app/fp_menu_items/get/fp1```
     - result: ```{"status": "success", "res": [{"fp_pk": "fp1", "iavailability": "iavailability1", "n": 2, "itype": "itype1", "iexpiration": "iexpiration1", "iname": "iname1", "price": 12.0, "iid": "iid1", "idesc": "idesc1"}]}```
 
 
  - ```/app/get/<tbl_name>```
     - example: ```curl http://localhost:5000/app/get/lp```
     - result: ```{"status": "success", "res": [{"perc": 0.025, "description": "Carrefour Store", "name": "Carrefour", "pk": "12345", "location": "6 October"}, {"perc": 0.01, "description": "Pizza Food & Deliver", "name": "Pizza Hut", "pk": "54321", "location": "Mohandesin"}, {"perc": 0.023, "description": "lpdesc1", "name": "lpname1", "pk": "lp1", "location": "lplpcation1"}]}```
 
  - ```/app/orders/make/<fp_pk>/<hc_pk>/<delivery>/<int:amount>/<items>``` 
     - example: ```curl http://localhost:5000/app/orders/make/fp1/hc1/hd/23/"1,1;2,1;3,1"```
     - result: ```{"status": "success", "res": true}```
