import re
import glob
import csv
import mysql.connector as conn
import time
import json
import math
from functools import cmp_to_key

# get database connection
try:
	connection = conn.connect(user='swmuser', password='password', host='127.0.0.1', database='patents')
except conn.Error as err:
	if err.errno == conn.errorcode.ER_ACCESS_DENIED_ERROR:
		print("Something is wrong with your user name or password")
	elif err.errno == conn.errorcode.ER_BAD_DB_ERROR:
		print("Database does not exist")
	else:
		print(err)

# get cursor for connection
cursor = connection.cursor()


# # logic for inserting into PATENT_KEYWORDS table
# # define insert query
# insert_query = "insert into patent_keywords (patent_id, keyword) values(%(patent_id)s," + \
#                " %(keyword)s) on duplicate key update patent_id = %(patent_id)s, keyword = %(keyword)s;"

# # get list of all csv files in keywords folder
# keyword_file_list = glob.glob("keywords/*.csv")

# # record start time
# start_time = time.time()

# # read each file and get contents
# for file in keyword_file_list:
#     with open(file, 'r') as csv_file:
#         keyword = ""
#         patent_id = re.search('/(.+?)_', file).group(1).strip()
#         csv_reader = csv.reader(csv_file)

#         # get only top 10 keywords
#         count = 0

#         # remove header
#         next(csv_reader)

#         for row in csv_reader:
#             keyword = keyword + row[0].strip().lower() + ","
#             count = count + 1
#             if count >= 10:
#                 break

#         # remove last comma
#         keyword = keyword[:-1]

#         # make data for insert query
#         insert_query_data = {
#             'patent_id': patent_id,
#             'keyword': keyword,
#         }

#         # printing for log purposes
#         print(insert_query_data['patent_id'])

#         # execute the insert query
#         cursor.execute(insert_query, insert_query_data)
#         connection.commit()

# # close the mysql connection
# connection.close()

# # get end time
# stop_time = time.time()
# print("Execution time", stop_time-start_time)


# # Logic for inserting into patent_citations table
# # define insert query
# insert_query = "insert into patent_citations (patent_id, citation_count, citations) values(%(patent_id)s," + \
# 			   " %(citation_count)s, %(citations)s) on duplicate key update patent_id = %(patent_id)s,"+ \
# 			   " citation_count = %(citation_count)s, citations = %(citations)s;"

# # record start time
# start_time = time.time()

# file = "patent_dict_1000.csv"

# # read csv file and get contents
# with open(file, 'r') as csv_file:
# 	csv_reader = csv.reader(csv_file)

# 	# remove header
# 	next(csv_reader)

# 	for row in csv_reader:
# 		patent_id = "US"+row[0].strip()+"A"
# 		citation_count = row[1]
# 		citations = row[2]

# 		# make data for insert query
# 		insert_query_data = {
# 			'patent_id': patent_id,
# 			'citation_count': citation_count,
# 			'citations': citations,
# 		}

# 		# printing for log purposes
# 		print(patent_id, citation_count)

# 		# execute the insert query
# 		cursor.execute(insert_query, insert_query_data)
# 		connection.commit()

# # close the mysql connection
# connection.close()

# # get end time
# stop_time = time.time()
# print("Execution time", stop_time-start_time)

# # Logic for inserting into patent_similarities_tfidf table
# # define insert query
# define insert query
# insert_query = 	"insert into patent_similarities_tfidf (patent_id, "
# for i in range(1, 11):
# 	insert_query = insert_query + "patent" + str(i) + ", similarity" + str(i) + ", "
# insert_query = insert_query[:-2] + ") values(%(patent_id)s,"
# for i in range(1, 11):
# 	insert_query = insert_query + "%(patent" + str(i) + ")s, %(similarity" + str(i) + ")s, "
# insert_query = insert_query[:-2] + ") on duplicate key update patent_id = %(patent_id)s, "
# for i in range(1, 11):
# 	insert_query = insert_query + "patent" + str(i) +"= %(patent" + str(i) + ")s, "
# 	insert_query = insert_query + "similarity" + str(i) +"= %(similarity" + str(i) + ")s, "
# insert_query = insert_query[:-2] + ";"

# # record start time
# start_time = time.time()

# file = "tfidf_output.csv"

# # read csv file and get contents
# with open(file, 'r') as csv_file:
# 	csv_reader = csv.reader(csv_file)

# 	# remove header
# 	next(csv_reader)

# 	for row in csv_reader:
# 		patent_id = "US"+row[0].strip()+"A"
# 		patent1 = "US"+row[1].strip()+"A"
# 		similarity1 = row[2].strip()
# 		patent2 = "US"+row[3].strip()+"A"
# 		similarity2 = row[4].strip()
# 		patent3 = "US"+row[5].strip()+"A"
# 		similarity3 = row[6].strip()
# 		patent4 = "US"+row[7].strip()+"A"
# 		similarity4 = row[8].strip()
# 		patent5 = "US"+row[9].strip()+"A"
# 		similarity5 = row[10].strip()
# 		patent6 = "US"+row[11].strip()+"A"
# 		similarity6 = row[12].strip()
# 		patent7 = "US"+row[13].strip()+"A"
# 		similarity7 = row[14].strip()
# 		patent8 = "US"+row[15].strip()+"A"
# 		similarity8 = row[16].strip()
# 		patent9 = "US"+row[17].strip()+"A"
# 		similarity9 = row[18].strip()
# 		patent10 = "US"+row[19].strip()+"A"
# 		similarity10 = row[20].strip()

# 		# make data for insert query
# 		insert_query_data = {
# 			'patent_id': patent_id,
# 			'patent1': patent1,
# 			'similarity1': similarity1,
# 			'patent2': patent2,
# 			'similarity2': similarity2,
# 			'patent3': patent3,
# 			'similarity3': similarity3,
# 			'patent4': patent4,
# 			'similarity4': similarity4,
# 			'patent5': patent5,
# 			'similarity5': similarity5,
# 			'patent6': patent6,
# 			'similarity6': similarity6,
# 			'patent7': patent7,
# 			'similarity7': similarity7,
# 			'patent8': patent8,
# 			'similarity8': similarity8,
# 			'patent9': patent9,
# 			'similarity9': similarity9,
# 			'patent10': patent10,
# 			'similarity10': similarity10,
# 		}

# 		# printing for log purposes
# 		print(patent_id)

# 		# execute the insert query
# 		cursor.execute(insert_query, insert_query_data)
# 		connection.commit()

# # close the mysql connection
# connection.close()

# # get end time
# stop_time = time.time()
# print("Execution time", stop_time-start_time)



# function to compare patent and similarity tuples
def compare_patent_tuples(x, y):
	val = float(x[1])-float(y[1])
	if val > 0:
		return 1
	elif val == 0:
		return 0
	else: 
		return -1


# Logic for inserting into patent_similarities_lda table
# define insert query
insert_query = 	"insert into patent_similarities_lda (patent_id, "
for i in range(1, 11):
	insert_query = insert_query + "patent" + str(i) + ", similarity" + str(i) + ", "
insert_query = insert_query[:-2] + ") values(%(patent_id)s,"
for i in range(1, 11):
	insert_query = insert_query + "%(patent" + str(i) + ")s, %(similarity" + str(i) + ")s, "
insert_query = insert_query[:-2] + ") on duplicate key update patent_id = %(patent_id)s, "
for i in range(1, 11):
	insert_query = insert_query + "patent" + str(i) +"= %(patent" + str(i) + ")s, "
	insert_query = insert_query + "similarity" + str(i) +"= %(similarity" + str(i) + ")s, "
insert_query = insert_query[:-2] + ";"

# # record start time
start_time = time.time()

file = "lda_similarities_final.csv"

# read csv file and get contents
with open(file, 'r') as csv_file:
	csv_reader = csv.reader(csv_file)

	for row in csv_reader:
		patent_tuple_list = []
		
		patent_id = "US"+row[0].strip()+"A"
		patent1 = "US"+row[1].strip().replace('\'','')+"A"
		similarity1 = row[2].strip().replace('\'','')
		patent_tuple_list.append((patent1, similarity1))
		patent2 = "US"+row[3].strip().replace('\'','')+"A"
		similarity2 = row[4].strip().replace('\'','')
		patent_tuple_list.append((patent2, similarity2))
		patent3 = "US"+row[5].strip().replace('\'','')+"A"
		similarity3 = row[6].strip().replace('\'','')
		patent_tuple_list.append((patent3, similarity3))
		patent4 = "US"+row[7].strip().replace('\'','')+"A"
		similarity4 = row[8].strip().replace('\'','')
		patent_tuple_list.append((patent4, similarity4))
		patent5 = "US"+row[9].strip().replace('\'','')+"A"
		similarity5 = row[10].strip().replace('\'','')
		patent_tuple_list.append((patent5, similarity5))
		patent6 = "US"+row[11].strip().replace('\'','')+"A"
		similarity6 = row[12].strip().replace('\'','')
		patent_tuple_list.append((patent6, similarity6))
		patent7 = "US"+row[13].strip().replace('\'','')+"A"
		similarity7 = row[14].strip().replace('\'','')
		patent_tuple_list.append((patent7, similarity7))
		patent8 = "US"+row[15].strip().replace('\'','')+"A"
		similarity8 = row[16].strip().replace('\'','')
		patent_tuple_list.append((patent8, similarity8))
		patent9 = "US"+row[17].strip().replace('\'','')+"A"
		similarity9 = row[18].strip().replace('\'','')
		patent_tuple_list.append((patent9, similarity9))
		patent10 = "US"+row[19].strip().replace('\'','')+"A"
		similarity10 = row[20].strip().replace('\'','')
		patent_tuple_list.append((patent10, similarity10))

		patent_tuple_list = sorted(patent_tuple_list, key=cmp_to_key(compare_patent_tuples))

		# make data for insert query
		insert_query_data = {
			'patent_id': patent_id,
			'patent1': patent_tuple_list[0][0],
			'similarity1': patent_tuple_list[0][1],
			'patent2': patent_tuple_list[1][0],
			'similarity2': patent_tuple_list[1][1],
			'patent3': patent_tuple_list[2][0],
			'similarity3': patent_tuple_list[2][1],
			'patent4': patent_tuple_list[3][0],
			'similarity4': patent_tuple_list[3][1],
			'patent5': patent_tuple_list[4][0],
			'similarity5': patent_tuple_list[4][1],
			'patent6': patent_tuple_list[5][0],
			'similarity6': patent_tuple_list[5][1],
			'patent7': patent_tuple_list[6][0],
			'similarity7': patent_tuple_list[6][1],
			'patent8': patent_tuple_list[7][0],
			'similarity8': patent_tuple_list[7][1],
			'patent9': patent_tuple_list[8][0],
			'similarity9': patent_tuple_list[8][1],
			'patent10': patent_tuple_list[9][0],
			'similarity10': patent_tuple_list[9][1],
		}

		# printing for log purposes
		print(patent_id)

		# execute the insert query
		cursor.execute(insert_query, insert_query_data)
		connection.commit()

# close the mysql connection
connection.close()

# get end time
stop_time = time.time()
print("Execution time", stop_time-start_time)

# # Logic for inserting into patent_details table
# # define insert query
# insert_query = 	"insert into patent_details (patent_id, year) " + \
# 			   	"values(%(patent_id)s, %(year)s) on duplicate key update " + \
# 			   	" patent_id = %(patent_id)s, year = %(year)s;"

# # record start time
# start_time = time.time()

# patent_list = "patent_list.txt"


# patents = set()
# with open(patent_list, 'r') as file:
# 	line = file.read().replace(']','').replace('[','')
# 	for item in line.split(','):
# 		id = "US"+item.strip().replace('\'','')+"A"
# 		patents.add(id)
# file.close()

# print(len(patents)," actual patents")


# file = "./patentData/apat63_99.csv"
# # read csv file and get contents
# with open(file, 'r') as csv_file:
# 	csv_reader = csv.reader(csv_file)
# 	count = 0
# 	total_Count = 0

# 	# remove header
# 	next(csv_reader)


# 	for row in csv_reader:

# 		patent_id = "US"+row[0].strip()+"A"
# 		year = row[1].strip()

# 		total_Count = total_Count + 1

# 		if patent_id in patents:
# 			# make data for insert query
# 			insert_query_data = {
# 				'patent_id': patent_id,
# 				'year': year,
# 			}

# 			# printing for log purposes
# 			count = count + 1
# 			if count%100==0:
# 				print(count)

# 			# execute the insert query
# 			cursor.execute(insert_query, insert_query_data)
# 			connection.commit()

# 	print(count," records added from a total of ", total_Count, " records")

# # close the mysql connection
# connection.close()

# # get end time
# stop_time = time.time()
# print("Execution time", stop_time-start_time)


# # Logic for inserting into patent_similarities_embeddings table
# # define insert query
# insert_query = 	"insert into patent_similarities_embeddings (patent_id, "
# for i in range(1, 11):
# 	insert_query = insert_query + "patent" + str(i) + ", similarity" + str(i) + ", "
# insert_query = insert_query[:-2] + ") values(%(patent_id)s,"
# for i in range(1, 11):
# 	insert_query = insert_query + "%(patent" + str(i) + ")s, %(similarity" + str(i) + ")s, "
# insert_query = insert_query[:-2] + ") on duplicate key update patent_id = %(patent_id)s, "
# for i in range(1, 11):
# 	insert_query = insert_query + "patent" + str(i) +"= %(patent" + str(i) + ")s, "
# 	insert_query = insert_query + "similarity" + str(i) +"= %(similarity" + str(i) + ")s, "
# insert_query = insert_query[:-2] + ";"

# # record start time
# start_time = time.time()

# file = "universal_sentence_embedding_nearest_10_measures.json"

# insert_query_data = {}

# # read json file and get contents
# with open(file, 'r') as json_file:
# 	data = json.load(json_file)
# 	for key in data:

# 		values = data[key]

# 		insert_query_data['patent_id'] = "US"+key.strip()+"A"
# 		for i in range(0, len(values)):

# 			index = str(i + 1)
# 			insert_query_data['patent'+index] = "US"+values[i][0].strip()+"A"
# 			insert_query_data['similarity'+index] = values[i][1]

# 		# printing for log purposes
# 		print(insert_query_data['patent_id'])

# 		# execute the insert query
# 		cursor.execute(insert_query, insert_query_data)
# 		connection.commit()

# # close the mysql connection
# connection.close()

# # get end time
# stop_time = time.time()
# print("Execution time", stop_time-start_time)


# # Logic for inserting into patent_similarities_bert table
# # define insert query
# insert_query = 	"insert into patent_similarities_bert (patent_id, "
# for i in range(1, 11):
# 	insert_query = insert_query + "patent" + str(i) + ", similarity" + str(i) + ", "
# insert_query = insert_query[:-2] + ") values(%(patent_id)s,"
# for i in range(1, 11):
# 	insert_query = insert_query + "%(patent" + str(i) + ")s, %(similarity" + str(i) + ")s, "
# insert_query = insert_query[:-2] + ") on duplicate key update patent_id = %(patent_id)s, "
# for i in range(1, 11):
# 	insert_query = insert_query + "patent" + str(i) +"= %(patent" + str(i) + ")s, "
# 	insert_query = insert_query + "similarity" + str(i) +"= %(similarity" + str(i) + ")s, "
# insert_query = insert_query[:-2] + ";"

# # record start time
# start_time = time.time()

# file = "bert_sentence_embedding_nearest_10_measures.json"

# insert_query_data = {}

# # read json file and get contents
# with open(file, 'r') as json_file:
# 	data = json.load(json_file)
# 	for key in data:

# 		values = data[key]

# 		insert_query_data['patent_id'] = "US"+key.strip()+"A"
# 		for i in range(0, len(values)):

# 			index = str(i + 1)
# 			insert_query_data['patent'+index] = "US"+values[i][0].strip()+"A"
# 			insert_query_data['similarity'+index] = round(values[i][1], 8)

# 		# printing for log purposes
# 		print(insert_query_data['patent_id'])

# 		# execute the insert query
# 		cursor.execute(insert_query, insert_query_data)
# 		connection.commit()

# # close the mysql connection
# connection.close()

# # get end time
# stop_time = time.time()
# print("Execution time", stop_time-start_time)


# # Logic for inserting into topic_data table
# # define insert query
# insert_query = "insert into topic_data (id, topic_id, word, probability) values(%(id)s," + \
# 			   " %(topic_id)s, %(word)s, %(probability)s) on duplicate key update id = %(id)s,"+ \
# 			   " topic_id = %(topic_id)s, word = %(word)s, probability = %(probability)s ;"

# # record start time
# start_time = time.time()

# file = "top_words.csv"

# # read csv file and get contents
# with open(file, 'r') as csv_file:
# 	csv_reader = csv.reader(csv_file)

# 	# remove header
# 	next(csv_reader)

# 	for row in csv_reader:

# 		# make data for insert query
# 		insert_query_data = {
# 			'id': row[0],
# 			'topic_id': row[1],
# 			'word': row[2],
# 			'probability': row[3],
# 		}

# 		# printing for log purposes
# 		print(insert_query_data['id'])

# 		# execute the insert query
# 		cursor.execute(insert_query, insert_query_data)
# 		connection.commit()

# # close the mysql connection
# connection.close()


# start_time = time.time()

# patent_year_dict = {}
# file = "./patentData/apat63_99.csv"
# # read csv file and get contents
# with open(file, 'r') as csv_file:
# 	csv_reader = csv.reader(csv_file)

# 	# remove header
# 	next(csv_reader)

# 	for row in csv_reader:

# 		patent_id = row[0].strip()
# 		year = row[1].strip()

# 		patent_year_dict[patent_id] = year

# # get end time
# stop_time = time.time()
# print("Execution time for reading years", stop_time-start_time)

# # print(patent_year_dict)

# # Logic for inserting into patent_topics table
# # define insert query
# insert_query = 	"insert into patent_topics (patent_id, year, "
# for i in range(0, 10):
# 	insert_query = insert_query + "topic" + str(i) + ", "
# insert_query = insert_query[:-2] + ") values(%(patent_id)s, %(year)s, "
# for i in range(0, 10):
# 	insert_query = insert_query + "%(topic" + str(i) + ")s, "
# insert_query = insert_query[:-2] + ") on duplicate key update patent_id = %(patent_id)s, year = %(year)s, "
# for i in range(0, 9):
# 	insert_query = insert_query + "topic" + str(i) +"= %(topic" + str(i) + ")s, "
# insert_query = insert_query[:-2] + ";"

# # record start time
# start_time = time.time()

# file = "doc_topic_distribution.csv"

# insert_query_data = {}

# # read json file and get contents
# with open(file, 'r') as csv_file:
# 	csv_reader = csv.reader(csv_file)
# 	count = 0

# 	for row in csv_reader:
# 		if row[0].strip() in patent_year_dict:

# 			insert_query_data['patent_id'] = "US"+row[0].strip()+"A"
# 			insert_query_data['year'] = patent_year_dict[row[0].strip()]
# 			for i in range(0, 10):
# 				index = str(i)
# 				insert_query_data['topic'+index] = row[i+1]

# 			# execute the insert query
# 			cursor.execute(insert_query, insert_query_data)
# 			connection.commit()

# 			# printing for log purposes
# 			count = count + 1
# 			if count%100==0: 
# 				print(insert_query_data['patent_id'], count)

# # close the mysql connection
# connection.close()

# # get end time
# stop_time = time.time()
# print("Execution time", stop_time-start_time)