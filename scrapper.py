from bs4 import BeautifulSoup
import requests
import sys

# print(sys.argv[1])

contest_link = sys.argv[1]
source = requests.get(contest_link).text
soup = BeautifulSoup(source, 'lxml')
# print(soup.prettify())

problem_set = soup.find('table', class_='problems')
problems = []
for problem_link in problem_set.find_all('a'):
    link = 'https://codeforces.com' + problem_link['href']
    if link.split('/')[5] == 'problem':
        problems.append(link)
problems = list(set(problems))
# print(problems)

for problem in problems:
    problem_link = problem
    source = requests.get(problem_link).text
    soup = BeautifulSoup(source, 'lxml')

    problem_type = soup.find('div', class_='title').text.split('.')[0]
    # print(problem_type)
    print('Scrapping ' + problem_type)
    x = 0
    for input in soup.find_all('div', class_='input'):
        filename = './test/' + problem_type + '_in_' + chr(ord('1') + x)
        fl = open(filename, 'w')
        t = input.pre.text
        t = "".join([s for s in t.strip().splitlines(True) if s.strip()])
        # print(t)
        fl.write(t)
        fl.close()
        x += 1

    x = 0
    for output in soup.find_all('div', class_='output'):
        filename = './test/' + problem_type + '_out_' + chr(ord('1') + x)
        fl = open(filename, 'w')
        t = output.pre.text
        t = "".join([s for s in t.strip().splitlines(True) if s.strip()])
        # print(t)
        fl.write(t)
        fl.close()
        x += 1
