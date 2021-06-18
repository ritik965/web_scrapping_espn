const request=require("request");
const cheerio=require("cheerio");
const url=("https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard");

request(url,cb);

function cb(error,response,html){

    if(error){
        console.log(error);
    }else{
        extractContent(html);
    }

}
let wteam;
//we can scrap initial data only
function extractContent(html){

    //$ search in full page
    let $=cheerio.load(html);
    let team=$(".match-info.match-info-MATCH .team");

    for(let i=0;i<team.length;i++){
        let has=$(team[i]).hasClass("team-gray");
        if(has==false){
            //then this will be winning team
            wteam=$(team[i]).find(".name");
            wteam=wteam.text();
        }

    }

    let teams=$(".card.content-block.match-scorecard-table .Collapsible");
    //let htmlstr="";
    for(let i=0;i<teams.length;i++){
        // let thisHtml=$(teams[i]).html();
        // htmlstr+=thisHtml;

        //team names
        let teamEle=$(teams[i]).find(".header-title.label");
        let teamName=teamEle.text();
        teamName=teamName.split("INNINGS")[0];
        teamName=teamName.trim();


        //print the innings of winning team
        if(wteam==teamName){
            console.log(teamName);

            let table=$(teams[i]).find(".table.bowler");
            let allBowlers=$(table).find("tr");
            for(let i=0;i<allBowlers.length;i++){
                let column=$(allBowlers[i]).find("td");
                let name=$(column[0]).text();
                let wicket=$(column[4]).text();
                console.log(`Winning team ${wteam} player name: ${name} --- wicket: ${wicket}`)
            }

        }


    }
    //console.log(htmlstr);
}






