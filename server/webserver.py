import os
import logging
import json
from flask import Flask  # pip install flask
from flask_cors import CORS, cross_origin  # pip install flask_cors
from FoodArchyDBManager import FoodArchyDBManager


# initialize flask ###########################################
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# initialize logging ########################################
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("webserver")


# APPLICATION INUPTS #########################################
sql_conf = {
    "host": os.environ["MY_SQL_HOST"],
    "port": 3306,
    "user": "root",
    "passwd": os.environ["MY_SQL_ROOT_PASSWD"],
}

fadb = FoodArchyDBManager(sql_conf)


@app.route("/test/<int:count>", methods=["GET"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def test(count):
    logger.debug("test count({})".format(count))
    res={"count": count}
    return json.dumps(res)+"\n"


@app.route("/app/register/lp/<pk>/<name>/<desc>/<location>/<float:perc>", methods=["GET"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def lp_register(pk, name, desc, location, perc):
    logger.info("lp_register({},{},{},{},{})".format(pk, name, desc, location, perc))
    res = {"status": "na"}

    try:
        res["res"] = fadb.lp_register(pk, name, desc, location, perc)
        res["status"] = "success"
    except Exception as e:
        logger.warning("Exception in lp_register: {}".format(e))
        res["res"]=str(e)
        res["status"]="failure"

    logger.info("returning: {}".format(res))
    return json.dumps(res)


@app.route("/app/register/fp/<pk>/<name>/<desc>/<location>", methods=["GET"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def fp_register(pk, name, desc, location):
    logger.info("fp_register({},{},{},{})".format(pk, name, desc, location))
    res = {"status": "na"}

    try:
        res["res"] = fadb.fp_register(pk, name, desc, location)
        res["status"] = "success"
    except Exception as e:
        logger.warning("Exception in fp_register: {}".format(e))
        res["res"] = str(e)
        res["status"] = "failure"

    logger.info("returning: {}".format(res))
    return json.dumps(res)


@app.route("/app/register/hc/<pk>/<name>/<desc>/<location>", methods=["GET"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def hc_register(pk, name, desc, location):
    logger.info("hc_register({},{},{},{})".format(pk, name, desc, location))
    res = {"status": "na"}

    try:
        res["res"] = fadb.hc_register(pk, name, desc, location)
        res["status"] = "success"
    except Exception as e:
        logger.warning("Exception in hc_register: {}".format(e))
        res["res"] = str(e)
        res["status"] = "failure"

    logger.info("returning: {}".format(res))
    return json.dumps(res)


@app.route("/app/fp_menu_items/add/<fp_pk>/<iid>/<iname>/<idesc>/<itype>"
           "/<iexpiration>/<iavailability>/<int:price>/<int:n>",
           methods=["GET"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def add_fp_menu_item(fp_pk, iid, iname, idesc, itype, iexpiration, iavailability, price, n):

    logger.info("add_fp_menu_item({}, {}, {}, {}, {}, {}, {}, {}, {})"
                .format(fp_pk, iid, iname, idesc, itype, iexpiration, iavailability, price, n))
    res = {"status": "na"}

    try:
        res["res"] = fadb.add_fp_menu_item(fp_pk, iid, iname, idesc, itype, iexpiration, iavailability, price, n)
        res["status"] = "success"
    except Exception as e:
        logger.warning("Exception in add_fp_menu_item: {}".format(e))
        res["res"] = str(e)
        res["status"] = "failure"

    logger.info("returning: {}".format(res))
    return json.dumps(res)


@app.route("/app/register/get/<entity>/<pk>", methods=["GET"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def is_registered(entity, pk):

    logger.info("is_registered({},{})".format(entity, pk))
    res = {"status": "na"}

    try:
        res["res"] = fadb.is_registered(table_name=entity, pk=pk)
        res["status"] = "success"
    except Exception as e:
        logger.warning("Exception in hc_register: {}".format(e))
        res["res"] = str(e)
        res["status"] = "failure"

    logger.info("returning: {}".format(res))
    return json.dumps(res)


@app.route("/app/get/<tbl_name>", methods=["GET"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def get_tbl_data(tbl_name):

    logger.info("get_tbl_data({})".format(tbl_name))
    res = {"status": "na"}

    try:
        data, schema = fadb.get_tbl_data(tbl_name)
        tbl_data = []
        for record in data:
            tbl_data.append(dict(zip(schema, record)))
        res["res"] = tbl_data
        res["status"] = "success"
    except Exception as e:
        logger.warning("Exception in get_tbl_data: {}".format(e))
        res["res"] = str(e)
        res["status"] = "failure"

    logger.info("returning: {}".format(res))
    return json.dumps(res)


@app.route("/app/fp_menu_items/get/<fp_pk>", methods=["GET"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def get_menu_items(fp_pk):

    logger.info("get_menu_items({})".format(fp_pk))
    res = {"status": "na"}

    try:
        data, schema = fadb.get_menu_items(fp_pk)
        tbl_data = []
        for record in data:
            tbl_data.append(dict(zip(schema, record)))
        res["res"] = tbl_data
        res["status"] = "success"
    except Exception as e:
        logger.warning("Exception in get_menu_items: {}".format(e))
        res["res"] = str(e)
        res["status"] = "failure"

    logger.info("returning: {}".format(res))
    return json.dumps(res)


@app.route("/app/orders/make/<fp_pk>/<hc_pk>/<delivery>/<int:amount>/<items>", methods=["GET"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def mk_order(fp_pk, hc_pk, delivery, amount, items):

    logger.info("mk_order({}, {}, {}, {}, {})".format(fp_pk, hc_pk, delivery, amount, items))
    res = {"status": "na"}

    try:
        parsed_items = []
        items = items.split(';')
        for item in items:
            iid, qty = item.split(',')
            parsed_items.append({'iid': iid, 'qty': qty})

        res["res"] = fadb.mk_order(fp_pk, hc_pk, delivery, amount, parsed_items)
        res["status"] = "success"
    except Exception as e:
        logger.warning("Exception in mk_order: {}".format(e))
        res["res"] = str(e)
        res["status"] = "failure"

    logger.info("returning: {}".format(res))
    return json.dumps(res)






























"""
@app.route("/app/get_random_movies/<int:count>", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_random_movies(count):
    logger.info("called: get_random_movies(count: {})".format(count))

    res = rman.get_random_movies(count)
    res = json.dumps(res)

    logger.info("returning: {}".format(res))
    return res


@app.route("/app/add_user_rating/<int:uid>/<int:mid>/<int:rating>", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def add_user_rating(uid, mid, rating):
    logger.info("called: add_user_rating(uid: {}, mid: {}, rating {})".format(uid, mid, rating))

    res = rman.add_user_rating(uid, mid, rating)
    res = json.dumps(res)

    logger.info("returning: {}".format(res))
    return res


@app.route("/app/autocomplete/<pattern>/<int:count>", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def autocomplete(pattern, count):
    logger.info("called: autocomplete(pattern: {}, count: {})".format(pattern, count))

    res = rman.autocomplete(pattern, count)
    res = json.dumps(res)

    logger.info("returning: {}".format(res))
    return res


@app.route("/app/add_user_rec/<int:uid>/<int:mid>", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def add_user_rec(uid, mid):
    logger.info("called: add_user_rec(uid: {}, mid: {})".format(uid, mid))

    res = rman.add_user_rec(uid, mid)
    res = json.dumps(res)

    logger.info("returning: {}".format(res))
    return res


@app.route("/app/rm_user_rec/<int:uid>/<int:mid>", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def rm_user_rec(uid, mid):
    logger.info("called: rm_user_rec: {}, {}".format(uid, mid))
    res = {"success": "true"}
    return json.dumps(res)


@app.route("/app/get_movie_info/<name>", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_movie_info(name):
    logger.info("called: get_movie_info(name: {})".format(name))

    res = rman.get_movie_info(name)
    res = json.dumps(res)

    logger.info("returning: {}".format(res))
    return res


@app.route("/app/add_user_email/<int:uid>/<email>", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def add_user_email(uid, email):
    logger.info("called: add_user_email(uid: {}, email: {})".format(uid, email))

    res = rman.add_user_email(uid, email)
    res = json.dumps(res)

    logger.info("returning: {}".format(res))
    return res
"""

if __name__ == '__main__':
    app.run(host='0.0.0.0')
