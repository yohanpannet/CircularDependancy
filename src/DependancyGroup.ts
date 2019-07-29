import DependanceCirculaire, { TSFileStat } from "./dependance";

export default class DependancyGroup {

    public dependancies: DependanceCirculaire[] = [];
    constructor(lines: String[]) {
        lines.forEach( line => {
            let dc = new DependanceCirculaire(line);
            if (this.dependancies.every(dependancy => !dependancy.equals(dc))) {
                this.dependancies.push(dc);
            }
        })
        this.dependancies.sort((a, b) => {
            return a.length - b.length;
        })
    }

    getLengthDistribution(): Map<number, number>{
        let lengthDistrib = new Map<number, number>();
        this.dependancies.forEach(cd => {
            lengthDistrib.set(cd.length, (lengthDistrib.get(cd.length) || 0) + 1);
        })
        return lengthDistrib;
    }
    
    getStatMap(): Map<DependanceCirculaire, TSFileStat> {
        let statMap = new Map<DependanceCirculaire, TSFileStat>();
        let remainingList = [...this.dependancies];
        while(remainingList.length > 0) {
            let currentDep = remainingList.shift();
            let counter = 0;
            remainingList.forEach(dependancy => {
                if (currentDep.isSubSequenceOf(dependancy)) {
                    counter++;
                }
            })
            statMap.set(currentDep, {numSubSequence: counter});
        }
        return statMap;
    }

    printStatMap(): void {
        let statMap = this.getStatMap();
        Array.from(statMap)
            .sort((a, b) => a[1].numSubSequence - b[1].numSubSequence)
            .forEach((entry) => {
                if (entry[1].numSubSequence>0) {
                    console.log(entry[1].numSubSequence + " : " + entry[0].shortDescription)
                }
            })
    }

    printDependancies(): void {
        this.dependancies.forEach(dependancy => console.log(dependancy.shortDescription));
    }
}