from bs4 import BeautifulSoup
import requests

source = requests.get('https://codeforces.com/problemset/problem/1458/F').text
soup = BeautifulSoup(source, 'lxml')

x = 0
for input in soup.find_all('div', class_='input'):
    filename = 'input_' + chr(ord('1') + x)
    fl = open(filename, 'w')
    t = input.pre.text
    t = "".join([s for s in t.strip().splitlines(True) if s.strip()])
    print(t)
    fl.write(t)
    fl.close()
    x += 1

x = 0
for output in soup.find_all('div', class_='output'):
    filename = 'output_' + chr(ord('1') + x)
    fl = open(filename, 'w')
    t = output.pre.text
    t = "".join([s for s in t.strip().splitlines(True) if s.strip()])
    print(t)
    fl.write(t)
    fl.close()
    x += 1
