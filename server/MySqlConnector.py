import sys
import MySQLdb as mdb  # pip install mysqlclient
from contextlib import closing
from LoggingHandler import LoggingHandler


class MySqlConnector(LoggingHandler):

    """
        conf = {
            host: "str",
            port: int,
            user: "str",
            passwd: "str",
        }
    """

    def __init__(self, conf):
        super(MySqlConnector, self).__init__()
        self.conf = conf
        self._init_connection()

    def _init_connection(self):

        try:
            self.logger.info("connecting to mysql database")
            self.con = mdb.connect(host=self.conf['host'],
                                   port=self.conf['port'],
                                   user=self.conf['user'],
                                   passwd=self.conf['passwd'])

        except mdb.Error as e:
            self.logger.error("error connecting to mysql database: {} {}".format(e.args[0], e.args[1]))
            sys.exit(1)

    def create_database(self, db_name):

        query = "CREATE DATABASE IF NOT EXISTS {}".format(db_name)
        self.logger.info("executing create_database query: {}".format(query))

        with closing(self.con.cursor()) as cur:
            res = cur.execute(query)

        self.logger.info("executed create_database query, res: {}".format(res))
        return res

    def create_table(self, db_name, table_name, table_schema, table_pk=None):

        """
        :param db_name: str
        :param table_name: str
        :param table_schema: {str: type}
        :param table_pk: [pk1, pk2, ...etc]
        :return:
        """

        query_pt1 = "CREATE TABLE IF NOT EXISTS {}.{}".format(db_name, table_name)

        # creating comma separated: COLUMN_NAME DATA_TYPE
        col_lst = []
        for k, v in table_schema.items():
            col_lst.append("{} {}".format(k, v))
        query_pt2_1 = ', '.join(col_lst)

        # in case a list of primary keys is provided, appending the primary keys to the previously
        # created comma separated list
        query_pt2_2 = ""
        if table_pk:
            pk_lst = []
            for k in table_pk:
                pk_lst.append(k)

            query_pt2_2 = ', PRIMARY KEY ({})'.format(', '.join(pk_lst))

        # appends primary key string or an empty string
        query_pt2 = "({}{})".format(query_pt2_1, query_pt2_2)

        # full table create query
        query = "{} {}".format(query_pt1, query_pt2)
        self.logger.info("executing create_table query: {}".format(query))

        with closing(self.con.cursor()) as cur:
            res = cur.execute(query)

        self.logger.info("executed create_table query, res: {}".format(res))
        return res

    def drop_table(self, db_name, table_name):
        query = "DROP TABLE {}.{}".format(db_name, table_name)
        self.logger.info("executing drop_table query: {}".format(query))

        res = 0
        try:
            with closing(self.con.cursor()) as cur:
                res = cur.execute(query)
        except Exception as e:
            self.logger.warn("executing drop_table query FAILED with: {}".format(e))


        self.logger.info("executed drop_table query, res: {}".format(res))
        return res

    def insert_row(self, db_name, table_name, kv_map):

        """
        :param db_name: str
        :param table_name: str
        :param kv_map: {Key: Value}
        :return:
        """

        fields_lst = []
        values_lst = []
        for k, v in kv_map.items():
            fields_lst.append(k)
            values_lst.append(str(v))

        fields = "({})".format(', '.join(fields_lst))
        values = "({})".format(', '.join(values_lst))

        query = "INSERT INTO {}.{} {} VALUES {};".format(db_name, table_name, fields, values)
        self.logger.info("executing insert_row query: {}".format(query))

        with closing(self.con.cursor()) as cur:
            res = cur.execute(query)
            self.con.commit()

        self.logger.info("executed insert_row query, res: {}".format(res))
        return res

    def select_where(self, db_name, table_name, col_names, where=None, with_schema=False):

        """
        :param db_name: str
        :param table_name: str
        :param col_names: [col1, col2, ...., coln]
        :param where: dict key=value for where clause
        :param with_schema: bool
        :return:
        """

        query = "select {} from {}.{}".format(", ".join(col_names), db_name, table_name)
        if where:
            query2 = " where"
            cnt = 0
            for k, v in where.items():
                if cnt > 0:
                    query2 += " and"
                query2 += " {}={}".format(k, v)
                cnt += 1
            query += query2

        self.logger.info("executing select_where query: {}".format(query))

        with closing(self.con.cursor()) as cur:
            cur.execute(query)
            rows = cur.fetchall()  # assumes all resulting data will fit in memory
            desc = cur.description

        # returns a tuple of (list_of_rows/tuples, list_of_fields)
        if with_schema:
            n_fields = len(desc)
            schema = []

            for i in range(n_fields):
                schema.append(desc[i][0])

            res = list(rows), schema

        else:
            res = list(rows)  # list of rows/tuples

        self.logger.info("executed select_where query, res: {}".format(res))
        return res

    def exists(self, db_name, table_name, where=None):
        res = self.select_where(db_name, table_name, ['*'], where=where)
        return len(res) > 0

    def _terminate_connection(self):
        """
        closing connection and releasing resources
        :return:
        """

        self.logger.info("terminating mysql connection")
        if self.con:
            self.con.close()
            self.con = None
