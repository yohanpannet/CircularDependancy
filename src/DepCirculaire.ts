import * as fs from 'fs';
import DependancyGroup from './DependancyGroup';
//import filter from 'rxjs/operators'

fs.readFile("./dc.txt", "utf8", (err, data) => {
    if (err) throw err;

    let lines = filterLines(data);
    
    let dependancyGroup = new DependancyGroup(lines);
    console.log("nb lnes: "+ lines.length + " / nb dependencies: "+dependancyGroup.dependancies.length);
    //dependancyGroup.printDependancies();
    //dependancyGroup.getLengthDistribution().forEach((val, key) => {
    //    console.log(key + " : "+val);
    //});

    dependancyGroup.printStatMap();
})

function filterLines(data: String): String[]{
    let lines = data.split('\n')
        .filter(line => line !='' && line != 'WARNING in Circular dependency detected:');
    return lines;
}
