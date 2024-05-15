from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2 import sql
import json
from werkzeug.security import generate_password_hash


class API:
    def __init__(self):

        self.api = Flask(__name__)
        CORS(self.api)


        # Conectar con la base de datos
        self.connection = self.set_db_connection(db_name= "postgres", db_user="postgres", db_password="judithcuarta", db_host="localhost", db_port=5432)
        self.cursor = self.connection.cursor()
        # select_query = sql.SQL("SELECT event_processor, event_type_esp, event_symptom_esp, event_info_esp,"
        #                        + " event_error_code, event_subsystem, event_subsystem_code, event_driver_msg_vnull_esp,"
        #                         " event_driver_msg_vgross_esp FROM public.event ")
        # Transformar los datos
        self.add_routes()

    def set_db_connection(self, db_name, db_user, db_password, db_host, db_port):
        connection = psycopg2.connect(
            dbname = db_name,
            user = db_user,
            password = db_password,
            host = db_host,
            port = db_port
        )

        return connection
    
    

    def add_routes(self):
        @self.api.route("/")
        def index():
            return "EngiNet App"
        

        @self.api.route("/skills", methods = ["GET"])
        def get_skills():
            select_query = sql.SQL("SELECT skillname FROM public.skills")
            self.cursor.execute(select_query)
            self.skill_pre = self.cursor.fetchall()
            skills = self.skill_pre
            return skills
        
        @self.api.route("/languages", methods=["GET"])
        def get_languages():
            select_query = sql.SQL("SELECT languagename FROM public.languages")
            self.cursor.execute(select_query)
            self.lang_pre = self.cursor.fetchall()
            languages = self.lang_pre
            return languages
        
        @self.api.route("/users", methods=["GET"])
        def get_events():
            select_query = sql.SQL("SELECT name, surname, email, password, phonenumber FROM public.users")
            self.cursor.execute(select_query)
            self.events_pre = self.cursor.fetchall()

            self.events_dict = []
            for item in self.events_pre:
                event_dict = {
                    "name": item[0],
                    "surname": item[1],
                    "email": item[2],
                    "password": item[3],
                    "phonemumber": item[4]
                }
                self.events_dict.append(event_dict)

            events_search = self.events_dict

            return events_search
        
        @self.api.route('/getAllInfo', methods=['GET'])
        def getAll():
            
            # Fetch data from the database
            self.cursor.execute("SELECT userid, name, surname FROM public.users")
            users = self.cursor.fetchall()

            self.cursor.execute("SELECT userid, languageid, proficiencylevel FROM public.userlanguages")
            user_languages = self.cursor.fetchall()

            self.cursor.execute("SELECT userid, skillid, proficiencylevel, ismainskill FROM public.userskills")
            user_skills = self.cursor.fetchall()

            self.cursor.execute("SELECT languageid, languagename FROM public.languages")
            languages = self.cursor.fetchall()

            self.cursor.execute("SELECT skillid, skillname FROM public.skills")
            skills = self.cursor.fetchall()

            languages_dict = {lang[0]: lang[1] for lang in languages}
            skills_dict = {skill[0]: skill[1] for skill in skills}

            # Create the final structure
            users_dict = {}

            for user in users:
                user_id, name, surname = user
                users_dict[user_id] = {
                    "name": name,
                    "surname": surname,
                    "skills": [],
                    "languages": []
                }

            for user_skill in user_skills:
                user_id, skill_id, proficiency_level, is_main_skill = user_skill
                if user_id in users_dict:
                    users_dict[user_id]["skills"].append({
                        "skillname": skills_dict[skill_id],
                        "proficiencylevel": proficiency_level,
                        "ismainskill": is_main_skill
                    })

            for user_lang in user_languages:
                user_id, language_id, proficiency_level = user_lang
                if user_id in users_dict:
                    users_dict[user_id]["languages"].append({
                        "languagename": languages_dict[language_id],
                        "proficiencylevel": proficiency_level
                    })

            # Convert the users_dict to JSON
            users_json = json.dumps(users_dict, indent=4)

            return users_json
            # select_users = sql.SQL("SELECT id, name, surname FROM public.users")
            # self.cursor.execute(select_users)
            # self.users_pre = self.cursor.fetchall()

            # select_user_lang = sql.SQL("SELECT userid, languageid, proficiencylevel FROM public.userlanguages")
            # self.cursor.execute(select_user_lang)
            # self.users_pre = self.cursor.fetchall()

            # select_user_skills = sql.SQL("SELECT userid, skillid, proficiencylevel, ismainskill" FROM public.userskills)
            # self.cursor.execute(select_user_skills)
            # self.users_pre = self.cursor.fetchall()

            # select_lang = sql.SQL("SELECT languageid, languagename FROM public.languages")
            # self.cursor.execute(select_lang)
            # self.lang_pre = self.cursor.fetchall()

            # select_skills = sql.SQL("SELECT skillid, skillname FROM public.skills")
            # self.cursor.execute(select_skills)
            # self.skill_pre = self.cursor.fetchall()




        
        @self.api.route('/create_user', methods=['POST'])
        def create_user():
            data = request.get_json()
            print(data)
            pwd = data['password']
            #hashed_password = generate_password_hash(pwd, method='sha256')

            query = sql.SQL("INSERT INTO public.users (name, surname, email, password, phonenumber) VALUES ({name}, {surname}, {email}, {password}, {phone_number})").format(
            name=sql.Literal(data['name']),
            surname=sql.Literal(data['surname']),
            email=sql.Literal(data['email']),
            password=sql.Literal(pwd),
            phone_number=sql.Literal(data['phone_number'])
            )

            try:
                self.cursor.execute(query)
                self.connection.commit()
                print("User inserted successfully.")
                return jsonify({'message': 'User created successfully'}), 201
            except psycopg2.Error as e:
                print("An error occurred while inserting the user:")
                print(e)
            # finally:
            #     self.cursor.close()

            # # # Simple validation to check if all fields are provided
            # # if not all(k in data for k in ("name", "surname", "email", "password", "phone_number")):
            # #     return jsonify({'message': 'Missing fields'}), 400

            # # Safely check if the user exists
            # self.cursor.execute(
            # sql.SQL("SELECT email FROM public.users WHERE email = %s"),
            # [data['email']]
            # )
            # # conn = self.connection_pool.getconn()  # Get a connection from the pool
            # # cursor = conn.cursor()
            # try:
            #     #self.cursor.execute(select_query, (data['email'],))
            #     existing_user = self.cursor.fetchall()
            #     print(existing_user)
            #     if existing_user:
            #         return jsonify({'message': 'User already exists'}), 409

            #     hashed_password = generate_password_hash(data['password'], method='sha256')
                
            #     # Insert new user into the database
            #     insert_query = sql.SQL("INSERT INTO public.users (name, surname, email, password, phone_number) VALUES (%s, %s, %s, %s, %s) RETURNING id")
            #     self.cursor.execute(insert_query, (data['name'], data['surname'], data['email'], hashed_password, data['phone_number']))
            #     user_id = self.cursor.fetchone()[0]
            #     self.conn.commit()
            #     return jsonify({'message': 'User created successfully', 'user_id': user_id}), 201
            # except Exception as e:
            #     self.conn.rollback()  # Rollback in case of error
            #     return jsonify({'message': 'Failed to create user', 'error': str(e)}), 500
            # finally:
            #     self.cursor.close()
            #     self.connection_pool.putconn(self.conn)
        
        # @self.api.route('/create_user', methods=['POST'])
        # def create_user():
        #     data = request.get_json()
            
        #     # Simple validation to check if all fields are provided
        #     if not all(k in data for k in ("name", "surname", "email", "password", "phone_number")):
        #         return jsonify({'message': 'Missing fields'}), 400
            
        #     # Check if new user exists using parameterized SQL
        #     select_query = sql.SQL("SELECT email FROM public.users WHERE email = {email}").format(email=sql.Literal(data['email']))
        #     self.cursor.execute(select_query)
        #     existing_user = self.cursor.fetchone()
            
        #     if existing_user:
        #         return jsonify({'message': 'User already exists'}), 409

        #     hashed_password = generate_password_hash(data['password'], method='sha256')
            
        #     # Insert new user into the database
        #     insert_query = sql.SQL("INSERT INTO public.users (name, surname, email, password, phone_number) VALUES ({name}, {surname}, {email}, {password}, {phone_number})").format(
        #         name=sql.Literal(data['name']),
        #         surname=sql.Literal(data['surname']),
        #         email=sql.Literal(data['email']),
        #         password=sql.Literal(hashed_password),
        #         phone_number=sql.Literal(data['phone_number'])
        #     )
        #     self.cursor.execute(insert_query)
        #     self.connection.commit()

        #     return jsonify({'message': 'User created successfully'}), 201

        
        @self.api.route("/user_skills/<int:user_id>", methods=["GET"])
        def get_user_skills_by_user(user_id):
            query = sql.SQL("""
                SELECT s.SkillName, us.ProficiencyLevel AS SkillProficiency
                FROM Users u
                LEFT JOIN UserSkills us ON u.UserID = us.UserID
                LEFT JOIN Skills s ON us.SkillID = s.SkillID
                WHERE u.UserID = {user_id}
            """).format(user_id=sql.Literal(user_id))
            
            self.cursor.execute(query)  # Assuming 'cursor' is your database cursor
            results = self.cursor.fetchall()
            
            # Convert the results to a more friendly format (e.g., a list of dicts)
            skills = []
            for row in results:
                skills.append({
                    "SkillName": row[0],
                    "SkillProficiency": row[1]
                })
            
            return jsonify(skills)

        
        @self.api.route("/user_skills_lang/<int:user_id>", methods=["GET"])
        def get_skills_and_languages_by_user(user_id):
            query = sql.SQL("""
            SELECT s.SkillName, us.ProficiencyLevel AS SkillProficiency, l.LanguageName, ul.ProficiencyLevel AS LanguageProficiency
            FROM Users u
            LEFT JOIN UserSkills us ON u.UserID = us.UserID
            LEFT JOIN Skills s ON us.SkillID = s.SkillID
            LEFT JOIN UserLanguages ul ON u.UserID = ul.UserID
            LEFT JOIN Languages l ON ul.LanguageID = l.LanguageID
            WHERE u.UserID = {user_id}
            """).format(user_id=sql.Literal(user_id))
            
            self.cursor.execute(query)
            self.events_pre = self.cursor.fetchall()

            # Convert the results to a more friendly format (e.g., a list of dicts)
            self.skills_languages = []
            for row in self.events_pre:
                self.skills_languages.append({
                    "SkillName": row[0],
                    "SkillProficiency": row[1],
                    "LanguageName": row[2],
                    # "LanguageProficiency": row[3]
                })
            
            skill_lang_search = self.skills_languages

            return jsonify(skill_lang_search)
        
if __name__ == "__main__":
    api = API()
    api.api.run(debug=True)