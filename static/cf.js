
var data={}


function CreateCard(ques_list){
    var main_element_ul=document.querySelector("#main-content").querySelector("#ques-list");
    var temp_html=""
    for(var i=0;i<ques_list.length;i+=1){
        ques=ques_list[i];
        var name = ques["name"];
        var rating = ques["rating"];
        var link = ques["link"];
        var tags = ques["tags"];
        console.log(tags);
        
        temp_html+='<a href="'+link+'" class="row-link" target="_blank"><li class="row"><p class="name">'+name+'</p><p class="tags">Tags : ';
        for(var j=0;j<tags.length;j+=1){
            // temp_html+='<a href="'+link+'">'+tags[j]+', </a>'
            temp_html+='<span>'+tags[j]+', </span>'
        }
        temp_html+='</p><p class="rate-icon"><span class="rate-text">Rating : '+rating+'</span></p></li></a>'
        
    }
    main_element_ul.innerHTML=temp_html
}

/* <li class="row">
    <p class="name">Strong Password</p>
    <p class="tags">Tags : <a href="#">Graphs, </a><a href="#">Graphs, </a><a href="#">Graphs, </a><a href="#">Graphs, </a><a href="#">Graphs, </a></p>
    <p class="rate-icon"><span class="rate-text">Rating : 1800</span></p>
</li> */



function GetSortedData(minRating=800,maxRating=3500,tags_list=[]){
    ans=[];
    var visited={}
    if(tags_list.length==0){
        for(var rating=(minRating-(minRating%100));rating<=maxRating;rating+=100){
            if((data[rating]) != undefined){
                for(tg in data[rating]){
                    for(var j=0;j<data[rating][tg].length;j+=1){
                        var ques=data[rating][tg][j];
                        if((visited[ques["id"]]) == undefined){
                            visited[ques["id"]]=true;
                            ans.push(ques);
                        }   
                    }

                }
            }
        }
    }
    else{
        for(var rating=(minRating-(minRating%100));rating<=maxRating;rating+=100){
            if((data[rating]) != undefined){
                for(var i=0;i<tags_list.length;i+=1){
                    if((data[rating][tags_list[i]]) != undefined){
                        for(var j=0;j<data[rating][tags_list[i]].length;j+=1){
                            var ques=data[rating][tags_list[i]][j];
                            if((visited[ques["id"]]) == undefined){
                                visited[ques["id"]]=true;
                                ans.push(ques);
                            }   
                        }
                    }
                }
            }
        }
    }
    console.log(ans);
    CreateCard(ans);
    
       
}




function MainWork(){
    // console.log(data["800"])
    var minRating=1400;
    var maxRating=1800;
    // var tags_list=['graphs','dp'];
    
    var tags_list=[];
    result=[];
    result= GetSortedData(minRating,maxRating,tags_list);

}


fetch('static/data.json')
.then(res => res.json())
.then(data2 => {
//   console.log(data2)
  data=data2
  MainWork();
})

var sidebar_li=document.querySelector("#side").querySelector("#side-topics").querySelector("ul").querySelectorAll("li");
for(let i=0;i<sidebar_li.length;i+=1){
    sidebar_li[i].querySelector("label").querySelector("span").addEventListener("click",function Work(evt){
            evt.preventDefault();
            // console.log(i);
            sidebar_li=document.querySelector("#side").querySelector("#side-topics").querySelector("ul").querySelectorAll("li");
            // console.log(sidebar_li[i].querySelector("label").innerHTML);
            if(sidebar_li[i].querySelector("label").querySelector("input").checked != true){
                sidebar_li[i].querySelector("label").querySelector("input").checked = true;
                // console.log("hi");
            }
            else{
                sidebar_li[i].querySelector("label").querySelector("input").checked = false;
            }
            minRating= (document.querySelector("#side-rating").querySelector("#out0").querySelectorAll("p")[0].innerHTML)
            maxRating=(document.querySelector("#side-rating").querySelector("#out1").querySelectorAll("p")[0].innerHTML)
            let tags_list2=[]
            //var sidebar_li=[] //document.querySelector("#side").querySelector("#side-topics").querySelector("ul").querySelectorAll("li");
            for(let j=0;j<sidebar_li.length;j+=1){
                side_label=sidebar_li[j].querySelector("label");
                // console.log(side_label.querySelector("input").checked);
                if(side_label.querySelector("input").checked==true){
                tags_list2.push(side_label.querySelector("div").innerHTML.toLowerCase());
                // console.log(j);
                // console.log(tags_list2);
                }
            }
            
            result=[];
            console.log(tags_list2);
            result= GetSortedData(minRating,maxRating,tags_list2);
            
            
});

}

document.querySelector("#side").querySelector("#side-rating").querySelector(".t0").addEventListener("mouseup",function(){
            var minRating= (document.querySelector("#side-rating").querySelector("#out0").querySelectorAll("p")[0].innerHTML)
            var maxRating=(document.querySelector("#side-rating").querySelector("#out1").querySelectorAll("p")[0].innerHTML)
            let tags_list2=[]
            sidebar_li=document.querySelector("#side").querySelector("#side-topics").querySelector("ul").querySelectorAll("li");
            //var sidebar_li=[] //document.querySelector("#side").querySelector("#side-topics").querySelector("ul").querySelectorAll("li");
            for(let j=0;j<sidebar_li.length;j+=1){
                side_label=sidebar_li[j].querySelector("label");
                // console.log(side_label.querySelector("input").checked);
                if(side_label.querySelector("input").checked==true){
                tags_list2.push(side_label.querySelector("div").innerHTML.toLowerCase());
                // console.log(j);
                // console.log(tags_list2);
                }
            }
            
            result=[];
            console.log(tags_list2);
            result= GetSortedData(minRating,maxRating,tags_list2);
})

document.querySelector("#side").querySelector("#side-rating").querySelector(".t1").addEventListener("mouseup",function(){
    var minRating= (document.querySelector("#side-rating").querySelector("#out0").querySelectorAll("p")[0].innerHTML)
    var maxRating=(document.querySelector("#side-rating").querySelector("#out1").querySelectorAll("p")[0].innerHTML)
    let tags_list2=[]
    sidebar_li=document.querySelector("#side").querySelector("#side-topics").querySelector("ul").querySelectorAll("li");
    //var sidebar_li=[] //document.querySelector("#side").querySelector("#side-topics").querySelector("ul").querySelectorAll("li");
    for(let j=0;j<sidebar_li.length;j+=1){
        side_label=sidebar_li[j].querySelector("label");
        // console.log(side_label.querySelector("input").checked);
        if(side_label.querySelector("input").checked==true){
        tags_list2.push(side_label.querySelector("div").innerHTML.toLowerCase());
        // console.log(j);
        // console.log(tags_list2);
        }
    }
    
    result=[];
    console.log(tags_list2);
    result= GetSortedData(minRating,maxRating,tags_list2);
})

