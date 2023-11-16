
export default class DependanceCirculaire {
    
    get length(): number {
        return this.tsFiles.length;
    }

    get shortDescription(): string {
        return this.tsFiles.concat(this.tsFiles[0]).map(file => file.shortName).join(" -> ");
    }

    tsFiles: TSFile[] = [];
    constructor(private dpStr: String){
        let previousFile: TSFile;
        dpStr.split(" -> ").forEach((name) => {
            let file = this.getTSFile(name);
            if (!file) {
                file = new TSFile(name);
                this.tsFiles.push(file);
            }
            if (previousFile){
                previousFile.dependsOn = file;
            }
            previousFile = file;
        })
    }

    getTSFile(fileName: string): TSFile | undefined{
        return this.tsFiles.find((file) => file.name == fileName);
    }

    equals (other: DependanceCirculaire): boolean {
        // console.log("does " + this.shortDescription);
        // console.log("equals " + other.shortDescription);
        let firstFile =  this.tsFiles[0];
        let currentFile = firstFile;
        let otherCurrentFile = other.getTSFile(currentFile.name);
        if (!otherCurrentFile) return false;
        
        if (currentFile.name != otherCurrentFile.name) return false;
        currentFile = currentFile.dependsOn;
        otherCurrentFile = otherCurrentFile.dependsOn;
        while (currentFile != firstFile){
            // console.log(currentFile.name +  " =? " +otherCurrentFile.name);
            if (currentFile.name != otherCurrentFile.name) return false;
            currentFile = currentFile.dependsOn;
            otherCurrentFile = otherCurrentFile.dependsOn;
        }
        if (currentFile.name != otherCurrentFile.name) return false;
        return true;
    }

    isSubSequenceOf(other: DependanceCirculaire): boolean {
        let isSubSequence = this.tsFiles.some((file) => {
            let currentFile = file;
            let otherCurrentFile = other.getTSFile(currentFile.name);
            if (!otherCurrentFile) return false;
            //console.log(currentFile.shortName +  " - dependsOn " +currentFile.dependsOn.name);
            while (currentFile.dependsOn.name != file.name) {
                if (currentFile.name != otherCurrentFile.name) return false;
                currentFile = currentFile.dependsOn;
                otherCurrentFile = otherCurrentFile.dependsOn;
                //console.log("  " + currentFile.shortName +  " - dependsOn " +currentFile.dependsOn.name);
            }
            if (currentFile.name != otherCurrentFile.name) return false;
            return true;
        })
        return isSubSequence;
    }

    toString(): String {
        return this.dpStr;
    }
}

export class TSFile {
    dependsOn!: TSFile;
    get shortName(): string {
        return this.name.split("/").pop() || "nope";
    }
    constructor(public name: string) {}
}

export interface TSFileStat{
    numSubSequence: number
}