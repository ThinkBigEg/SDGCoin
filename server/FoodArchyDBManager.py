from MySqlConnector import MySqlConnector
import time


class FoodArchyDBManager:

    lp_schema = {'pk': 'VARCHAR(100)', 'name': 'VARCHAR(100)', 'description': 'VARCHAR(100)',
                 'location': 'VARCHAR(100)', 'perc': 'DOUBLE'}

    hc_schema = {'pk': 'VARCHAR(100)', 'name': 'VARCHAR(100)', 'description': 'VARCHAR(100)',
                 'location': 'VARCHAR(100)'}

    fp_schema = {'pk': 'VARCHAR(100)', 'name': 'VARCHAR(100)', 'description': 'VARCHAR(100)',
                 'location': 'VARCHAR(100)'}

    fp_menu_item_schema = {'fp_pk': 'VARCHAR(100)', 'iid': 'VARCHAR(100)', 'iname': 'VARCHAR(100)',
                           'idesc': 'VARCHAR(100)', 'itype': 'VARCHAR(100)', 'iexpiration': 'VARCHAR(100)',
                           'iavailability': 'VARCHAR(100)', 'price': 'DOUBLE', 'n': 'INT'}

    order_schema = {'oid': 'VARCHAR(100)', 'fp_pk': 'VARCHAR(100)', 'hc_pk': 'VARCHAR(100)',
                    'delivery': 'VARCHAR(100)', 'amount': 'INT'}

    order_item_schema = {'oid': 'VARCHAR(100)', 'iid': 'VARCHAR(100)', 'qty': 'INT'}

    def __init__(self, sql_conf):
        self.mysql = MySqlConnector(sql_conf)
        self.db_name = 'foodarchy'

    def init_database(self):
        self.mysql.create_database(self.db_name)
        self.mysql.create_table(self.db_name, 'lp', self.lp_schema, table_pk=['pk'])
        self.mysql.create_table(self.db_name, 'hc', self.hc_schema, table_pk=['pk'])
        self.mysql.create_table(self.db_name, 'fp', self.fp_schema, table_pk=['pk'])
        self.mysql.create_table(self.db_name, 'fp_menu_item', self.fp_menu_item_schema, table_pk=['fp_pk', 'iid'])
        self.mysql.create_table(self.db_name, 'order', self.order_schema, table_pk=['oid', 'fp_pk', 'hc_pk'])
        self.mysql.create_table(self.db_name, 'order_item', self.order_item_schema, table_pk=['oid', 'iid'])

    def reset(self):
        self.mysql.drop_table(self.db_name, 'lp')
        self.mysql.drop_table(self.db_name, 'hc')
        self.mysql.drop_table(self.db_name, 'fp')
        self.mysql.drop_table(self.db_name, 'fp_menu_item')
        self.mysql.drop_table(self.db_name, 'order')
        self.mysql.drop_table(self.db_name, 'order_item')

    def lp_register(self, pk, name, desc, location, perc):
        kv_map = {'pk': "'{}'".format(pk), 'name': "'{}'".format(name), 'description': "'{}'".format(desc),
                  'location': "'{}'".format(location), 'perc': perc}
        return self.mysql.insert_row(self.db_name, 'lp', kv_map)

    def hc_register(self, pk, name, desc, location):
        kv_map = {'pk': "'{}'".format(pk), 'name': "'{}'".format(name), 'description': "'{}'".format(desc),
                  'location': "'{}'".format(location)}
        return self.mysql.insert_row(self.db_name, 'hc', kv_map)

    def fp_register(self, pk, name, desc, location):
        kv_map = {'pk': "'{}'".format(pk), 'name': "'{}'".format(name), 'description': "'{}'".format(desc),
                  'location': "'{}'".format(location)}
        return self.mysql.insert_row(self.db_name, 'fp', kv_map)

    def add_fp_menu_item(self, fp_pk, iid, iname, idesc, itype, iexpiiration, iavailability, price, n):
        kv_map = {
            'fp_pk': "'{}'".format(fp_pk),
            'iid': "'{}'".format(iid),
            'iname': "'{}'".format(iname),
            'idesc': "'{}'".format(idesc),
            'itype': "'{}'".format(itype),
            'iexpiration': "'{}'".format(iexpiiration),
            'iavailability': "'{}'".format(iavailability),
            'price': price,
            'n': n}

        return self.mysql.insert_row(self.db_name, 'fp_menu_item', kv_map)

    def is_registered(self, table_name, pk):
        return self.mysql.exists(self.db_name, table_name, where={'pk': "'{}'".format(pk)})

    def get_tbl_data(self, table_name):
        return self.mysql.select_where(self.db_name, table_name, col_names=['*'], where=None, with_schema=True)

    def get_menu_items(self, fp_pk):
        return self.mysql.select_where(self.db_name, 'fp_menu_item', col_names=['*'],
                                       where={'fp_pk': "'{}'".format(fp_pk)}, with_schema=True)

    def mk_order(self, fp_pk, hc_pk, delivery, amount, items):

        oid = str(time.time())
        kv_map = {'oid': "'{}'".format(oid),
                  'fp_pk': "'{}'".format(fp_pk),
                  'hc_pk': "'{}'".format(hc_pk),
                  'delivery': "'{}'".format(delivery),
                  'amount': amount}
        self.mysql.insert_row(self.db_name, 'order', kv_map)

        for item in items:
            # item = {iid, qty}
            kv_map = {'oid': "'{}'".format(oid),
                      'iid': "'{}'".format(item['iid']),
                      'qty': item['qty']}
            self.mysql.insert_row(self.db_name, 'order_item', kv_map)

        return True

    def insert_poc_data(self):
        self.reset()
        self.init_database()
        # ---------------------------------------
        app.lp_register('12345', 'Carrefour', 'Carrefour Store', '6 October', 0.025)
        app.lp_register('54321', 'Pizza Hut', 'Pizza Food & Deliver', 'Mohandesin', 0.01)

        app.hc_register('11111', 'Resala', 'Resala description', 'Haram')
        app.hc_register('22222', 'DarElOrman', 'Charity Organization', 'Dokki')

        app.fp_register('121212', 'ElPrince', 'chicken, meat and liver', 'Imbaba')
        app.add_fp_menu_item('121212', '1', 'chicken', 'chicken', 'processed', '2019-04-23', 'True', 5, 1)
        app.add_fp_menu_item('121212', '2', 'raw-chicken', 'approached expiry', 'raw', '2019-04-20', 'True', 3, 1)
        app.add_fp_menu_item('121212', '3', 'raw-meat', 'approached expiry', 'raw', '2019-04-20', 'True', 4, 1)

        # app.is_registered('lp', 'lp1')
        # app.get_tbl_data('lp')
        # app.get_menu_items('fp6')
        # item1 = {'iid': '1', 'qty': 2}
        # item2 = {'iid': '2', 'qty': 1}
        # item3 = {'iid': '3', 'qty': 1}
        # items = [item1, item2, item3]
        # app.mk_order('fp_pk', 'hc_pk', 'delivery', 123, items)


if __name__ == "__main__":

    conf = {"host": "127.0.0.1", "port": 3306, "user": "root", "passwd": "passpass"}
    app = FoodArchyDBManager(conf)
    app.insert_poc_data()