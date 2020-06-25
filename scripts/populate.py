from bs4 import BeautifulSoup as bs
import requests
import json




data={}
errors_cnt=0
ques_cnt=0
tags_html=""
# for i in 
for page in range(1,63):
# for page in range(1):
    source= requests.get('https://codeforces.com/problemset/page/'+str(page)).text
    soup= bs(source,'lxml')
    problems_table= soup.find('table',class_='problems')
    
    questions= problems_table.find_all('tr')

    for question in (questions[1:]):
        try:
            ques_cnt+=1
            temp={}
            cols=question.find_all('td')
            if(len(cols) is not 5):
                continue


            temp['id']=str(cols[0].a.text.replace(' ','').replace('\r','').replace('\n','')).strip()
            temp['link']='https://codeforces.com' + cols[0].find('a')['href']

            temp['name']=str(cols[1].a.text).strip()
            temp['tags']=[]
            temp['rating']=int(str(cols[3].span.text).strip())
            if temp['rating'] not in data.keys():
                data[temp['rating']]={}
            try:
                
                for tag in cols[1].find_all('div')[1].find_all('a'):
                    temp["tags"].append(str(tag.text).strip())
                    if str(tag.text).strip() not in data[temp['rating']].keys():
                        data[temp['rating']][str(tag.text).strip()]=[]
                    data[temp['rating']][str(tag.text).strip()].append(temp)

            except:
                continue


        except:
            errors_cnt+=1
            continue

for k in data[1400].keys():
    tags_html+='<li>\n<label class="container2"><div>'+k.title()+'</div>\n<input type="checkbox" >\n<span class="checkmark"></span>\n</label>\n</li>\n\n'



# print(data)
# print(errors_cnt)
# print(ques_cnt)
# print(tags_html)
f2=open('topics_html.txt','w')
f2.write(tags_html)
f2.close()
with open('../static/data.json', 'w') as f:
    json.dump(data, f)