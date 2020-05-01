import pickle
import xlrd
import ast
import csv
import run_docsim

# Path to patent dictionary
file_loc = "D:/ASU_Courses/SWM/project/patent_dict_1000.xlsx"

# To open Workbook
wb = xlrd.open_workbook(file_loc)
sheet = wb.sheet_by_index(0)

# Row 0 is header
nr = sheet.nrows
nc = sheet.ncols
output_row = []
k = 10
with open('output.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["patent", "patent_1", "sim_1", "patent_2", "sim_2",
                    "patent_3", "sim_3","patent_4", "sim_4", "patent_5", "sim_5",
                    "patent_6", "sim_6", "patent_7", "sim_7", "patent_8", "sim_8",
                    "patent_9", "sim_9", "patent_10", "sim_10"])
    for i in range(1, nr):
        row = sheet.row_values(i)
        patent = str(int(row[0]))
        print(patent)
        output_row.append(patent)
        citations = ast.literal_eval(row[2])

        patent_names_similar, similarity_values = run_docsim.find_similar_patents(patent, citations, k)
        if patent_names_similar == [] and similarity_values == []:
            output_row.append("Patent Text Does Not Exist")
        else:
            for j in range(k):
                output_row.append(patent_names_similar[j])
                output_row.append(similarity_values[j])

        writer.writerow(output_row)
        output_row = []
