function SortingClp(){
    this.SetDefaultColors();
}

// SET
SortingClp.prototype.SetDefaultColors = function(){ this.colors = ['#FCF8F8', '#FBEFEF', '#F9DFDF', '#F5AFAF', '#FEEAC9', '#FD7979' ] }
// SET
SortingClp.prototype.SetRandomColors = function(){ this.colors = colors; }
// SET
SortingClp.prototype.SetColors = function(colors){ this.colors = colors; }

// PRIVATE
SortingClp.prototype.LowerCount = function(){
    if(!this.data) return;
    const nKeys = Object.keys(this.data);
    const narr = [];
    for(let i = 0; i < nKeys.length; i++){ narr.push({ key : nKeys[i], ...this.data[nKeys[i]]}); };
    const cpArr = narr.sort(function(a, b){ return a.count < b.count ? -1 : 0; });
    return cpArr[0];
}
// PRIVATE
SortingClp.prototype.GetRandomColor = function(){
    if(!this.data) return;
    const nKeys = Object.keys(this.data);
    
    let notUsedColor = ``;
    for(let k = 0; k < this.colors.length; k++){
        let isUsed = false;
        for(let i = 0; i < nKeys.length; i++){
            const usedColor = this.data[nKeys[i]];
            if(this.colors[k] === usedColor.color){
                isUsed = true;
                break;
            }
        }
        if(isUsed) continue;
        notUsedColor = this.colors[k];
        break;
    }

    if(notUsedColor === ''){
        // LowerCount
        const lwc = this.LowerCount();
        this.data[lwc.key]['count']++;
        notUsedColor = lwc.color;
    }

    return { color : notUsedColor, count : 1};

}

// FUNC
SortingClp.prototype.GetColor = function(key){
    if(!this.data) this.data = {};
    if(!this.data[key]) this.data[key] = this.GetRandomColor();
    return this.data[key].color;
}
